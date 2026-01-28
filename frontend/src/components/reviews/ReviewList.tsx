import type { Review } from "@/types/review"
import ReviewCard from "./ReviewCard";



export default function ReviewList ({reviews}:{reviews: Review[]}){
    console.log("reviews ",reviews);    
    return (
        <>
            <div >
                {
                    reviews.map((review: Review) => {
                        return <ReviewCard review={review} key={review.user!.username!}/>
                        // return <GameCard game={game} key={game.id}></GameCard>
                    })
                }
            </div>
        </>
    )
}