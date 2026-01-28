import { useUser } from '@/context/userContext'
import './WriteReview.css'
import UserCard from '../user/UserCard';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateReview } from '@/mutations/reviews/useReview';

export default function WriteReview({ slug }: { slug: string }) {
    const { userLogged, user, } = useUser();
    const [text, setText] = useState("");
    const [valoracion, setValoracion] = useState("");
    const { mutateAsync: createReview } = useCreateReview();
    if (!userLogged) {
        return <p>Inicia sesión para poder escribir reseñas</p>
    }
    if(user == undefined){
        return <p>Cargando</p>
    }
    return (
        <>
            <div>
                <UserCard user={user} />
                <Textarea id="textarea-message" placeholder="Escribe tu reseña aqui" value={text} onChange={(e) => setText(e.target.value)} />
                <Button onClick={sendReview}>Enviar</Button>
                <h4>Te ha gustado el juego?</h4>
                <ToggleGroup variant="outline" type="single" defaultValue="all" value={valoracion} onValueChange={(value) => setValoracion(value)} >
                    <ToggleGroupItem value="positive" aria-label="Toggle all">
                        <ThumbsUpIcon /> <span>Si</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="negative" aria-label="Toggle missed">
                        <ThumbsDownIcon /><span>No</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

        </>
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