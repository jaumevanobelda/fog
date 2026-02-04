import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useAdminGames } from "@/queries/games/useAdminGames"
import { Loader2Icon, GamepadIcon } from "lucide-react"
import { GameDialog } from "@/components/game/GameDialog"
import { GameCardDasboard } from "@/components/game/GameCardDasboard"

export default function DashboardGames() {
	const { data: games, isLoading, error } = useAdminGames()
	console.log("games ",games);
	
	const [isCreateOpen, setIsCreateOpen] = useState(false)

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<Loader2Icon className="h-8 w-8 animate-spin text-blue-500" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<p className="text-red-400">Error al cargar los juegos</p>
			</div>
		)
	}

	return (
		<div className="container mx-auto py-8 px-4 mt-16">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-white">Administrar Juegos</h1>
					<p className="text-gray-400 mt-1">Gestiona los juegos de la plataforma</p>
				</div>

				<GameDialog
					mode="create"
					isOpen={isCreateOpen}
					setIsOpen={setIsCreateOpen}
				/>
			</div>

			{games && games.length === 0 ? (
				<Card className="border-dashed">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<GamepadIcon className="h-12 w-12 text-gray-500 mb-4" />
						<h3 className="text-lg font-medium text-gray-300">No hay juegos</h3>
						<p className="text-gray-500 mt-1">Crea tu primer juego para empezar</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{games?.map((game) => (
						<GameCardDasboard
							key={game.slug}
							game={game}
						/>
					))}
				</div>
			)}
		</div>
	)
}

