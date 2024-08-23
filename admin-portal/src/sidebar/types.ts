export type SitemapElement = {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
} & (
    | {
        type: 'page';
        path: string;
    }
    | {
        type: 'sitemap';
        children: SitemapElement[];
        path?: string;
    }
)

export type Sitemap = SitemapElement[]