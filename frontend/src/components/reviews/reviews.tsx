import { useUser } from '@/context/userContext'
import WriteReview from './WriteReview'
import { useReviews } from '@/queries/reviews/useReviews'
import ReviewList from './ReviewList';
import type { Review } from '@/types/review';
import ReviewCard from './ReviewCard';
import { useRemoveReview } from '@/mutations/reviews/useReview';
import { Button } from '../ui/button';
import { MessageSquareIcon, Trash2Icon, Loader2Icon } from 'lucide-react';

export default function Reviews({ slug }: { slug: string }) {
    console.log("SLUG ", slug,);
    const {  user } = useUser();
    console.log(user?.username || "niggres");
    
    const { data: reviews, isLoading, error } = useReviews(slug);
    console.log("USER ",user);
    
    const { mutate: removeReview } = useRemoveReview();
    const userReview = reviews?.find((review: Review) => review.user?.username === user?.username || "");
    console.log("userReview ", userReview);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <MessageSquareIcon className="h-7 w-7 text-blue-500" />
                <h1 className="text-2xl font-bold text-white">Reseñas</h1>
            </div>
            
            <div className="mb-8">
                {userReview ? (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-300">Tu reseña</h2>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeReview(slug)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                                <Trash2Icon className="h-4 w-4 mr-2" />
                                Eliminar
                            </Button>
                        </div>
                        <ReviewCard review={userReview} />
                    </div>
                ) : (
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-300">Escribe tu reseña</h2>
                        <WriteReview slug={slug} />
                    </div>
                )}
            </div>
            
            <div className="border-t border-gray-700/50 my-6"></div>
            
            <div>
                <h2 className="text-lg font-semibold text-gray-300 mb-4">Todas las reseñas</h2>
                {allReviews()}
            </div>
        </div>
    )
    
    function allReviews() {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-12">
                    <Loader2Icon className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
            )
        }
        if (error) {
            console.log("Error ", error);
            return (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                    <p className="text-red-400">No se han podido cargar las reseñas</p>
                </div>
            )
        }

        return (
            <>
                {(reviews == undefined || reviews?.length == 0)
                    ? (
                        <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50 text-center">
                            <MessageSquareIcon className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                            <p className="text-gray-500">Este producto aún no tiene reseñas</p>
                            <p className="text-gray-600 text-sm mt-1">¡Sé el primero en opinar!</p>
                        </div>
                    )
                    : <ReviewList reviews={reviews} />
                }
            </>
        )
    }
}