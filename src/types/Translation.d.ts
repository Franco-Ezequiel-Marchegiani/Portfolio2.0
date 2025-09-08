export type Lang = "es" | "en";

// JSON recursivo (string | object | array)
export type TranslationValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | TranslationObject
    | TranslationValue[];

export interface TranslationObject {
    [key: string]: TranslationValue;
}