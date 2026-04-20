import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useEditActiveUser } from '@/mutations/auth/useUser';
import { CheckCircle2Icon, XCircleIcon, Trash2Icon, Loader2Icon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

export default function DasboardUserCard({ user }: { user: any }) {
	const editActiveMutation = useEditActiveUser()
	return (
		<>
			<Card className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors ${!user.isActive ? 'opacity-60' : ''}`}>
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div>
								<div className="flex items-center gap-2">
										<Avatar className="h-11 w-11 border-2 border-gray-600 shrink-0">
											<AvatarImage src={user.image} alt={user.username} />
											<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
												{user.username?.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<h2 className="font-semibold text-white truncate">{user.username}</h2>
										</div>
									<div className="text-gray-500 text-sm">
										{user.role}
									</div>
									{user.isActive ? (
										<CheckCircle2Icon className="h-4 w-4 text-green-500" />
									) : (
										<XCircleIcon className="h-4 w-4 text-red-500" />
									)}
								</div>
								<CardDescription className="text-gray-500 text-sm text-left">
									{user.email}
								</CardDescription>
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2">
						{user.isActive ? (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="outline"
										size="sm"
										className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30"
									>
										<Trash2Icon className="h-4 w-4" />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>¿Desactivar Usuario?</AlertDialogTitle>
										<AlertDialogDescription>

										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancelar</AlertDialogCancel>
										<AlertDialogAction onClick={() => editActiveMutation.mutate({ username: user.username, isActive: false })} className="bg-red-600 hover:bg-red-700">
											{editActiveMutation.isPending && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
											Desactivar
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						) : (
								<Button variant="outline" size="sm" onClick={() => editActiveMutation.mutate({ username:user.username,isActive:true})} disabled={editActiveMutation.isPending}
								className="text-green-400 hover:text-green-300 hover:bg-green-500/10 border-green-500/30"
							>
								{editActiveMutation.isPending && <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />}
								<CheckCircle2Icon className="h-4 w-4" />
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</>
	)
}