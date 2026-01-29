import './Filters.css'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { FilterIcon, ArrowUpIcon, ArrowDownIcon, Trash2Icon } from 'lucide-react'
import { useFilters } from '@/context/filterContext'
import { useGameCategorias, useMaxPrecioGame } from '@/queries/games/useGame'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Checkbox } from '../ui/checkbox'
import { Slider } from '../ui/slider'
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ScrollArea } from '../ui/scroll-area'
import Loading from '../ui/loading'

export default function Filters() {

    const { filters, setPrecio, setCategorias, setSort, resetFilters } = useFilters();
    const { data: categorias } = useGameCategorias();
    const { data: maxPrecio, isLoading: MaxPrecioIsLoading } = useMaxPrecioGame();
    const [open,setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (filters.maxPrecio == undefined) {
            console.log("maxPrecio ", maxPrecio);

            setPrecio([filters.minPrecio, maxPrecio]);
        }
    }, [maxPrecio]);

    const activeFiltersCount =
        (filters.categorias.length > 0 ? 1 : 0) +
        (filters.minPrecio > 0 || (filters.maxPrecio && filters.maxPrecio < (maxPrecio || 100)) ? 1 : 0) +
        (filters.sort.field && filters.sort.field.trim() !== '' ? 1 : 0);


    function menu() {
        return (
            <div className="space-y-6">
                {menuPrecio()}
                {menuCategorias()}
                {menuOrdenar()}

                <Button
                    variant="destructive"
                    className="w-full gap-2"
                    onClick={() =>{ resetFilters() ; setOpen(false)}}
                    disabled={activeFiltersCount === 0}
                >
                    <Trash2Icon className="h-4 w-4" />
                    Borrar filtros
                </Button>
            </div>
        )
    }

    function menuPrecio() {
        if (MaxPrecioIsLoading) return <p className="text-gray-400 text-sm"><Loading/></p>
        return (
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Rango de Precio</h3>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{filters.minPrecio}€</span>
                    <span className="text-gray-400">{filters.maxPrecio || maxPrecio}€</span>
                </div>
                <Slider
                    defaultValue={[filters.minPrecio, filters.maxPrecio || 100]}
                    onValueChange={(te) => setPrecio(te)}
                    max={maxPrecio || 100}
                    min={0}
                    step={1}
                    className="w-full"
                />
            </div>
        )
    }

    function menuCategorias() {
        return (
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Categorías</h3>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700 h-9">
                            <span className="text-sm">Seleccionar categorías</span>
                            <span className="text-xs text-gray-400">
                                {filters.categorias.length > 0 ? `${filters.categorias.length}` : '0'}
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0 bg-gray-800 border-gray-700">
                        <ScrollArea className="h-64">
                            <div className="grid grid-cols-2 gap-1 p-3">
                                {categorias?.map((categoria) => (
                                    <label
                                        key={categoria.slug}
                                        className={`
                                            flex items-center gap-2 p-2 rounded cursor-pointer transition-colors text-sm
                                            ${filters.categorias.includes(categoria.slug)
                                                ? 'font-semibold'
                                                : 'hover:bg-gray-700/50 border border-transparent'
                                            }`}>
                                        <Checkbox
                                            checked={filters.categorias.includes(categoria.slug)}
                                            onCheckedChange={() => setCategorias(categoria.slug)}
                                            className="h-4 w-4"
                                        />
                                        <span className="text-gray-200 truncate">{categoria.nom}</span>
                                    </label>
                                ))}
                            </div>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }

    function menuOrdenar() {
        return (
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Ordenar por</h3>
                <div className="flex items-center gap-2">
                    <Select onValueChange={(value) => setSort(value, filters.sort.asc)} value={filters.sort.field}>
                        <SelectTrigger className="flex-1 h-9 bg-gray-800 border-gray-700 text-sm">
                            <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value=" ">Sin ordenar</SelectItem>
                            <SelectItem value="precio">Precio</SelectItem>
                            <SelectItem value="nom">Nombre</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 bg-gray-800 border-gray-700 hover:bg-gray-700"
                        onClick={() => setSort(filters.sort.field, !filters.sort.asc)}
                        disabled={!filters.sort.field || filters.sort.field.trim() === ''}
                    >
                        {filters.sort.asc
                            ? <ArrowUpIcon className="h-4 w-4" />
                            : <ArrowDownIcon className="h-4 w-4" />
                        }
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white h-10">
                    <FilterIcon className="h-4 w-4" />
                    <span>Filtros</span>
                    {activeFiltersCount > 0 && (
                        <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full min-w-[1.25rem] text-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-900 border-gray-800 w-80" aria-describedby={undefined}> 
                <SheetHeader className="border-b border-gray-800 pb-4">
                    <SheetTitle className="text-white text-lg">Filtros de búsqueda</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                    {menu()}
                </div>
            </SheetContent>
        </Sheet>
    )
}