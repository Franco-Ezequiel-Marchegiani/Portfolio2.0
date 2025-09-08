export interface SkillCategory {
    title: string;
    icon: React.ReactNode;
    color: string;
    skills: Array<{
        name: string;
        years: number;
        description?: string;
    }>;
}