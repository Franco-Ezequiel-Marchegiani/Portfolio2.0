import os
import json
from datetime import datetime
from time import sleep
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from deep_translator import GoogleTranslator

# ===========================
# CONFIG
# ===========================
load_dotenv()
LINKEDIN_EMAIL = os.getenv("LINKEDIN_EMAIL")
LINKEDIN_PASSWORD = os.getenv("LINKEDIN_PASSWORD")
PROFILE_URL = os.getenv("PROFILE_URL")
print(f"Info necesaria: {LINKEDIN_EMAIL} y {LINKEDIN_PASSWORD} con perfil {PROFILE_URL}")

traductor = GoogleTranslator(source="es", target="en")

if not LINKEDIN_EMAIL or not LINKEDIN_PASSWORD:
    raise SystemExit("Falta LINKEDIN_EMAIL o LINKEDIN_PASSWORD en el .env")

# ===========================
# FUNCIONES AUXILIARES
# ===========================
def save_cookies(driver, path: str = "cookies.json") -> None:
    """
    - Params:
        driver (webdriver.Chrome): Sesión de Selenium activa.
        path (str): Ruta donde guardar las cookies.
    - Logic: Obtiene las cookies actuales del navegador y las guarda en un archivo JSON.
    - Return: None
    """
    with open(path, "w") as f:
        json.dump(driver.get_cookies(), f)


def load_cookies(driver, path: str = "cookies.json") -> bool:
    """
    - Params:
        driver (webdriver.Chrome): Sesión de Selenium activa.
        path (str): Ruta del archivo de cookies previamente guardado.
    - Logic: Carga cookies desde un archivo y las inyecta en el navegador.
            Ajusta valores inválidos de "sameSite" para evitar errores.
    - Return: (bool) -> True si se cargaron cookies, False si no.
    """
    if os.path.exists(path):
        with open(path, "r") as f:
            cookies = json.load(f)
            for cookie in cookies:
                if "sameSite" in cookie and cookie["sameSite"] not in ["Strict", "Lax", "None"]:
                    cookie["sameSite"] = "Lax"
                try:
                    driver.add_cookie(cookie)
                except Exception as e:
                    print(f"⚠️ No se pudo agregar cookie: {e}")
        return True
    return False


def start_driver(headless: bool = False) -> webdriver.Chrome:
    """
    - Params:
        headless (bool): Indica si el navegador debe ejecutarse en modo oculto.
    - Logic: Configura opciones de ChromeDriver y crea la instancia del navegador.
    - Return: (webdriver.Chrome) -> Driver configurado.
    """
    options = webdriver.ChromeOptions()
    if headless:
        options.add_argument("--headless=new")
        options.add_argument("--window-size=1280,800")
    options.add_argument("--disable-blink-features=AutomationControlled")
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    driver.set_window_size(1200, 900)
    return driver


def login_linkedin(driver, email: str, password: str, timeout: int = 20) -> None:
    """
    - Params:
        driver (webdriver.Chrome): Sesión de Selenium activa.
        email (str): Usuario/correo de LinkedIn.
        password (str): Contraseña de LinkedIn.
        timeout (int): Tiempo máximo de espera en segundos.
    - Logic: Intenta loguearse en LinkedIn con cookies guardadas. 
            Si no existen cookies válidas, realiza login con usuario y contraseña.
    - Return: None
    """
    driver.get("https://www.linkedin.com")
    sleep(2)

    if load_cookies(driver):
        driver.refresh()
        sleep(2)
        if "/feed" in driver.current_url:
            print("Login con cookies exitoso ✅")
            return

    print("No había cookies válidas, intentando login con usuario/contraseña...")
    driver.get("https://www.linkedin.com/login")
    wait = WebDriverWait(driver, timeout)

    username_input = wait.until(EC.presence_of_element_located((By.ID, "username")))
    password_input = wait.until(EC.presence_of_element_located((By.ID, "password")))

    username_input.clear()
    username_input.send_keys(email)
    sleep(1)
    password_input.clear()
    password_input.send_keys(password)
    sleep(1)

    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))
    submit_btn.click()

    try:
        wait.until(EC.url_contains("/feed"))
        print("Login con usuario/contraseña OK ✅")
        save_cookies(driver)
    except Exception:
        print("⚠️ No se pudo loguear automático. Logueate manualmente en la ventana...")
        WebDriverWait(driver, 300).until(lambda d: "/feed" in d.current_url)
        save_cookies(driver)
        print("✅ Detectada nueva sesión manual. Cookies guardadas.")


def go_to_profile_and_wait_main(driver, profile_url: str, timeout: int = 15) -> None:
    """
    - Params:
        driver (webdriver.Chrome): Sesión de Selenium activa.
        profile_url (str): URL del perfil objetivo de LinkedIn.
        timeout (int): Tiempo máximo de espera en segundos.
    - Logic: Accede al perfil de LinkedIn y espera a que cargue la sección <main>.
    - Return: None
    """
    driver.get(profile_url)
    wait = WebDriverWait(driver, timeout)
    wait.until(EC.presence_of_element_located((By.TAG_NAME, "main")))
    sleep(2)
    print("Perfil cargado:", driver.current_url)

# ===========================
# SCRAPER
# ===========================
def extract_recommendations_from_tab(driver) -> list[dict]:
    """
    - Params:
        driver (webdriver.Chrome): Sesión de Selenium activa en la pestaña de recomendaciones.
    - Logic: Recorre todos los elementos <li> de recomendaciones y extrae:
            nombre, rol, relación, traducción al inglés, texto, traducción al inglés, e imagen.
            Filtra elementos vacíos para evitar objetos sin datos.
    - Return: (list[dict]) -> Lista de recomendaciones extraídas.
    """
    items = driver.find_elements(By.CSS_SELECTOR, "li.pvs-list__paged-list-item")
    recs = []

    for item in items:
        try:
            name = item.find_element(By.CSS_SELECTOR, ".t-bold span[aria-hidden='true']").text.strip()
        except:
            name = ""
        try:
            role = item.find_element(By.CSS_SELECTOR, ".t-14.t-normal span[aria-hidden='true']").text.strip()
        except:
            role = ""
        try:
            relation = item.find_element(By.CSS_SELECTOR, ".pvs-entity__caption-wrapper").text.strip()
            relation_eng = traductor.translate(relation) if relation else ""
        except:
            relation = ""
            relation_eng = ""
        try:
            text = item.find_element(By.CSS_SELECTOR, ".t-14.t-normal.t-black span[aria-hidden='true']").text.strip()
            text_eng = traductor.translate(text) if text else ""
        except:
            text = ""
            text_eng = ""
        try:
            img_url = item.find_element(By.CSS_SELECTOR, "img.ivm-view-attr__img--centered").get_attribute("src")
        except:
            img_url = ""

        if name or text:  # Validación: no guardar items completamente vacíos
            recs.append({
                "name": name,
                "role": role,
                "relation": relation,
                "relation_eng": relation_eng,
                "text": text,
                "text_eng": text_eng,
                "image_url": img_url
            })
    return recs


def get_all_recommendations(driver, timeout: int = 15) -> dict:
    """
    - Params:
        driver (webdriver.Chrome): Sesión de Selenium activa.
        timeout (int): Tiempo máximo de espera en segundos.
    - Logic: 
        1. Se desplaza a la sección de recomendaciones.
        2. Intenta expandir con "Mostrar todas".
        3. Si no existe el botón, extrae solo las recomendaciones visibles.
        4. Navega entre las pestañas "Recibidas" y "Enviadas".
    - Return: (dict) -> Objeto con claves 'received' y 'given', cada una lista de dicts.
    """
    wait = WebDriverWait(driver, timeout)

    anchor = wait.until(EC.presence_of_element_located((By.ID, "recommendations")))
    ActionChains(driver).move_to_element(anchor).perform()
    sleep(2)

    try:
        see_all_button = driver.find_element(By.ID, "navigation-index-see-all-recommendations")
        see_all_button.click()
        wait.until(EC.presence_of_element_located((By.XPATH, "//h2[contains(., 'Recomendaciones')]")))
    except Exception:
        print("ℹ️ Ya estás en la vista completa de recomendaciones o no hay botón disponible.")
        return {"received": extract_recommendations_from_tab(driver), "given": []}

    # Recibidas
    recibidas_tab = driver.find_element(By.XPATH, "//button[.//span[text()='Recibidas']]")
    recibidas_tab.click()
    sleep(2)
    received = extract_recommendations_from_tab(driver)

    # Enviadas
    enviadas_tab = driver.find_element(By.XPATH, "//button[.//span[text()='Enviadas']]")
    enviadas_tab.click()
    sleep(2)
    given = extract_recommendations_from_tab(driver)

    return {"received": received, "given": given}

# ===========================
# GUARDADO JSON
# ===========================
def save_recommendations_to_json(data: dict, filename: str = "recommendations.json") -> None:
    """
    - Params:
        data (dict): Diccionario con recomendaciones recibidas y enviadas.
        filename (str): Nombre del archivo JSON de salida.
    - Logic: Genera un objeto con la fecha de extracción y los datos, 
            y lo guarda en formato JSON indentado.
    - Return: None
    """
    output = {
        "extraction_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "recommendations": data
    }
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=4, ensure_ascii=False)
    print(f"✅ Archivo guardado en {filename}")

# ===========================
# MAIN
# ===========================
if __name__ == "__main__":
    driver = start_driver(headless=False)
    try:
        login_linkedin(driver, LINKEDIN_EMAIL, LINKEDIN_PASSWORD)
        go_to_profile_and_wait_main(driver, PROFILE_URL)

        data = get_all_recommendations(driver)
        save_recommendations_to_json(data)

    finally:
        sleep(5)
        driver.quit()
