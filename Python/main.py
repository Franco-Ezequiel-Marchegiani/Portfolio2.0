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

#Cargamos las variables de entorno
load_dotenv()  
LINKEDIN_EMAIL = os.getenv("LINKEDIN_EMAIL")
LINKEDIN_PASSWORD = os.getenv("LINKEDIN_PASSWORD")
PROFILE_URL = os.getenv("PROFILE_URL")
print(f"Info necesaria: {LINKEDIN_EMAIL} y {LINKEDIN_PASSWORD} con perfil {PROFILE_URL}")

#Validación de contar con los valores en el archivo .env
if not LINKEDIN_EMAIL or not LINKEDIN_PASSWORD:
    raise SystemExit("Falta LINKEDIN_EMAIL o LINKEDIN_PASSWORD en el .env")


def start_driver(headless=False):
    options = webdriver.ChromeOptions()
    #Configuramos tamaño de pantalla
    if headless:
        options.add_argument("--headless=new")
        options.add_argument("--window-size=1280,800")
    # mitigar detección básica
    options.add_argument("--disable-blink-features=AutomationControlled")
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    driver.set_window_size(1200, 900)
    return driver

def login_linkedin(driver, email, password, timeout=20):
    driver.get("https://www.linkedin.com/login")
    wait = WebDriverWait(driver, timeout)
    sleep(1)
    # Esperar y obtener los campos por ID (LinkedIn usa id="username" y id="password")
    username_input = wait.until(EC.presence_of_element_located((By.ID, "username")))
    password_input = wait.until(EC.presence_of_element_located((By.ID, "password")))

    # Clear por las dudas y enviar texto
    username_input.clear()
    username_input.send_keys(email)
    sleep(1)
    password_input.clear()
    password_input.send_keys(password)
    sleep(1)
    # Botón submit: suele ser button[type='submit'] dentro del form
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))
    submit_btn.click()
    try:
        wait.until(EC.url_contains("/feed"))
        print("Login OK: redirigido a feed.")
    except Exception:
        current_url = driver.current_url
        print("Después del submit, la URL es:", current_url)
        print("Si no estás logueado automáticamente, logueate manualmente en la ventana del navegador.")
        WebDriverWait(driver, 300).until(lambda d: "/feed" in d.current_url)
        print("Detectada nueva sesión manual. Continuando...")

def go_to_profile_and_wait_main(driver, profile_url, timeout=15):
    driver.get(profile_url)
    wait = WebDriverWait(driver, timeout)
    wait.until(EC.presence_of_element_located((By.TAG_NAME, "main")))
    # dar tiempo extra para que carguen secciones dinámicas
    sleep(2)
    print("Perfil cargado:", driver.current_url)

def get_recommendations(driver, timeout=15):
    wait = WebDriverWait(driver, timeout)

    # Scroll hasta el div con id="recommendations"
    anchor = wait.until(EC.presence_of_element_located((By.ID, "recommendations")))
    ActionChains(driver).move_to_element(anchor).perform()

    # Esperar a que aparezca el tabpanel de "Recibidas"
    tabpanel = wait.until(
        EC.presence_of_element_located((By.XPATH, "//div[@role='tabpanel' and contains(@class, 'active')]"))
    )

    # Dentro del tabpanel buscar todos los <li> de recomendaciones recibidas
    items = tabpanel.find_elements(By.CSS_SELECTOR, "li.artdeco-list__item")

    recommendations = []
    for item in items:
        try:
            name = item.find_element(By.CSS_SELECTOR, "div.t-bold span[aria-hidden='true']").text.strip()
        except:
            name = ""

        try:
            role = item.find_element(By.CSS_SELECTOR, "span.t-14.t-normal span[aria-hidden='true']").text.strip()
        except:
            role = ""

        try:
            relation = item.find_element(By.CSS_SELECTOR, "span.pvs-entity__caption-wrapper[aria-hidden='true']").text.strip()
        except:
            relation = ""

        try:
            text = item.find_element(By.CSS_SELECTOR, "div.inline-show-more-text--is-collapsed span[aria-hidden='true']").text.strip()
        except:
            text = ""
        
        try:
            img_url = item.find_element(By.CSS_SELECTOR, "img.ivm-view-attr__img--centered").get_attribute("src")
        except:
            img_url = ""

        recommendations.append({
            "name": name,
            "role": role,
            "relation": relation,
            "text": text,
            "image_url": img_url
        })
    return recommendations

#Función para guardar la info recolectada en un JSON
def save_recommendations_to_json(recommendations, filename="recommendations.json"):
    data = {
        "extraction_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "recommendations": recommendations
    }
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Archivo guardado en {filename}")

if __name__ == "__main__":
    driver = start_driver(headless=False)  
    try:
        login_linkedin(driver, LINKEDIN_EMAIL, LINKEDIN_PASSWORD)
        go_to_profile_and_wait_main(driver, PROFILE_URL)

        recommendations = get_recommendations(driver)
        save_recommendations_to_json(recommendations)
        try:
            header = driver.find_element(By.XPATH, "//*[contains(text(),'Recommendations') or contains(text(),'Recomendaciones')]")
            print("Sección de recomendaciones encontrada:", header.text[:120])
        except Exception as e:
            print("No se encontró un header de recomendaciones por texto. Podés hacer scroll y luego reintentar.")
    finally:
        sleep(5)  # opcional para ver resultados antes de cerrar
        driver.quit()