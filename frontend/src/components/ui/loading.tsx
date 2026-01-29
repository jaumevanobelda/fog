import { Spinner } from "./spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Spinner className="h-10 w-10 text-blue-500" />
      <p className="text-gray-400 text-sm font-medium animate-pulse">Cargando...</p>
    </div>
  )
}