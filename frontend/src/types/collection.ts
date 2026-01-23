export interface Collection {
    id: string;
    collection: string;
    games: {id: number,nom: string}[];
}