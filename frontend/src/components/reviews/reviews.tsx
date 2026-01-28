import { useUser } from '@/context/userContext'
import './Reviews.css'
import WriteReview from './WriteReview'
import { useReviews } from '@/queries/reviews/useReviews'
import ReviewList from './ReviewList';
import type { Review } from '@/types/review';
import ReviewCard from './ReviewCard';
import { useRemoveReview } from '@/mutations/reviews/useReview';
import { Button } from '../ui/button';

export default function Reviews({ slug }: { slug: string }) {
    console.log("SLUG ", slug,);
    const {  user } = useUser();
    console.log(user?.username || "niggres");
    
    const { data: reviews, isLoading, error } = useReviews(slug);
    console.log("USER ",user);
    
    const { mutate: removeReview } = useRemoveReview();
    const userReview = reviews?.find((review: Review) => review.user?.username === user?.username || "");
    console.log("userReview ", userReview);

    return (<>
        <h1>Reseñas</h1>
        {userReview
            ?
            <div>
                <h2>Tu reseña</h2>
                <ReviewCard review={userReview} />
                <Button onClick={() => removeReview(slug)}>Eliminar</Button>
            </div>
            :
            <WriteReview slug={slug} />
        }
        {allReviews()}
    </>
    )
    function allReviews() {
        if (isLoading) return <p>Cargando</p>
        if (error) {
            console.log("Error ", error);
            return <p>No se han podido cargar las reseñas</p>
        }

        return (<>
            {(reviews == undefined || reviews?.length == 0)
                ? <p>Este producto no tiene reseñas</p>
                : <ReviewList reviews={reviews} />
            }
        </>
        )
    }
}