export interface Collection {
    slug: string;
    collection: string;
    games: {slug: string,nom: string}[];
}