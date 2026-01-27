export interface Filter  {
    // developer: string,
    minPrecio: number,
    maxPrecio: number | undefined,
    categorias:Array<string>,
    search: string,
    sort:{field:string,asc:boolean}
}
