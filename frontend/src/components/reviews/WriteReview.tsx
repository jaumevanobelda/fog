import { useUser } from '@/context/userContext'
import UserCard from '../user/UserCard';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { ThumbsDownIcon, ThumbsUpIcon, SendIcon, LogInIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateReview } from '@/mutations/reviews/useReview';

export default function WriteReview({ slug }: { slug: string }) {
    const { userLogged, user, } = useUser();
    const [text, setText] = useState("");
    const [valoracion, setValoracion] = useState("");
    const { mutateAsync: createReview } = useCreateReview();
    
    if (!userLogged) {
        return (
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 text-center">
                <LogInIcon className="h-10 w-10 mx-auto text-gray-500 mb-3" />
                <p className="text-gray-400">Inicia sesión para poder escribir reseñas</p>
            </div>
        )
    }
    if(user == undefined){
        return (
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 text-center">
                <div className="animate-pulse flex items-center justify-center gap-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 space-y-4">
            <UserCard user={user}/>
            
            <Textarea 
                id="textarea-message" 
                placeholder="Escribe tu reseña aquí..." 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                className="bg-gray-900/50 border-gray-700 focus:border-blue-500 min-h-[100px] resize-none"
            />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-400">¿Te ha gustado el juego?</h4>
                    <ToggleGroup 
                        variant="outline" 
                        type="single" 
                        value={valoracion} 
                        onValueChange={(value) => setValoracion(value)}
                        className="gap-2"
                    >
                        <ToggleGroupItem 
                            value="positive" 
                            aria-label="Me gustó"
                            className="data-[state=on]:bg-blue-500/20 data-[state=on]:border-blue-500 data-[state=on]:text-blue-400 px-4"
                        >
                            <ThumbsUpIcon className="h-4 w-4 mr-2" />
                            <span>Sí</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                            value="negative" 
                            aria-label="No me gustó"
                            className="data-[state=on]:bg-red-500/20 data-[state=on]:border-red-500 data-[state=on]:text-red-400 px-4"
                        >
                            <ThumbsDownIcon className="h-4 w-4 mr-2" />
                            <span>No</span>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                
                <Button 
                    onClick={sendReview}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                    <SendIcon className="h-4 w-4 mr-2" />
                    Enviar reseña
                </Button>
            </div>
        </div>
    )
    async function sendReview() {
        if (text == "") {
            toast.error("La reseña esta vacia!");
            return;
        }
        if (valoracion == "") {
            toast.error("Debes selecionar si te ha gustado el juego o no");
            return;
        }
        console.log((valoracion === "positive"));
        try {
            let data = await createReview({ game_slug: slug, text, positive: (valoracion === "positive") });
            console.log("DATA ", data);
        } catch (error:any) {
            console.log("Error ",error);
            toast.error(error.response.data.error);
            
        }




    }
}