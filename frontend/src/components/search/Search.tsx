import { useFilters } from '@/context/filterContext';
import './Search.css'
import { Input } from '../ui/input';
import { XIcon, SearchIcon } from 'lucide-react';


export default function Search() {

    const { setSearch, filters } = useFilters();
    return (
    <div className="search-container flex-1 max-w-lg">
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    value={filters.search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    placeholder='Buscar juegos...'
                    className="pl-9 pr-9 h-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
                {filters.search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        <XIcon className="h-4 w-4 text-gray-400 hover:text-white" />
                    </button>
                )}
            </div>
        </div>
    )
}