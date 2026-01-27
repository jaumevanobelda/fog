import type { Filter } from '@/types/filter';
import { createContext, useContext, useEffect, useMemo, useState } from 'react'



function defaultFilters() {
    return {
        // developer: "",
        minPrecio: 0,
        maxPrecio: undefined,
        categorias: [],
        search: "",
        sort: { field: "", asc: true }
    }
}

function initialFilters() {
    if (localStorage.getItem("filters")) {
        return JSON.parse(localStorage.getItem("filters")!)
    }
    return defaultFilters();
}

const FilterContext = createContext<{ filters: Filter, setPrecio: Function, setSearch: Function, setCategorias: Function, setSort: Function, resetFilters: Function }>(
    { filters: initialFilters(), setPrecio() { }, setCategorias() { console.log("WHAt") }, setSearch() { }, setSort() { }, resetFilters() { } }
)


export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState<Filter>(initialFilters());
    // console.log("FILTERS ", filters);

    // function setDeveloper(developer: string) {
    //     setFilters((value) => {
    //         return { ...value, developer }
    //     })
    // }
    function setPrecio(precios: Array<number>) {
        // console.log("SET PRECIO ", { filters, precios });
        setFilters((value) => {
            value.minPrecio = precios[0];
            value.maxPrecio = precios[1];
            return { ...value };
        })
    }
    function setSearch(search: string) {
        // console.log("SET search ", { filters, search });

        setFilters((value) => {
            value.search = search;
            return { ...value }
        })
    }
    function setCategorias(categoria: string) {
        // console.log("SET categorias ", { filters, categoria });

        setFilters((value) => {
            let index = value.categorias.findIndex((value) => value === categoria);
            console.log(index);
            if (index === -1) {
                value.categorias.push(categoria)
            } else {
                value.categorias.splice(index, 1);
            }

            return { ...value }
        })
    }
    function setSort(field: string, asc: boolean) {
        // console.log("SET sort ", { filters, sort: { field, asc } });

        if (field === " ") {
            field = "";
        }

        setFilters((value) => {
            value.sort = { field, asc }
            return { ...value }
        })
    }
    function resetFilters() {
        localStorage.removeItem("filters");
        setFilters(defaultFilters());
    }
    const value = useMemo(
        () => ({ filters, setPrecio, setCategorias, setSearch, setSort, resetFilters }),
        [filters]
    );

    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters));
    }, [filters]);

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}



export const useFilters = () => useContext(FilterContext);