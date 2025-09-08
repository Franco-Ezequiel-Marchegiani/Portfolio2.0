export interface AboutHighlight {
    icon: string;
    title: string;
    description: string;
}
export interface AboutContent {
    title: string;
    summary: string[];
    buttons: {
        showMore: string;
        showLess: string;
    };
    highlights: AboutHighlight[];
}
