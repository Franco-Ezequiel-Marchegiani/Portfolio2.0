export interface Reference {
    name: string;
    role: string;
    relation: string;
    relation_eng: string;
    text: string;
    text_eng: string;
    image_url?: string;
}

export interface ReferencesData {
    extraction_date: string;
    recommendations: {
        received: Reference[];
        given: Reference[];
    };
}