export interface Project {
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    category: string;
    github?: string;
    demo?: string;
    features: string[];
    image: string;
    link: string;
}
export type Category = {
    id: string; 
    label: string; 
    icon?: string };
