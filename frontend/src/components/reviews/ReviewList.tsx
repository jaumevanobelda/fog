import type { Review } from "@/types/review"
import ReviewCard from "./ReviewCard";



export default function ReviewList ({reviews}:{reviews: Review[]}){
    console.log("reviews ",reviews);    
    return (
        <div className="space-y-4">
            {reviews.map((review: Review) => (
                <ReviewCard review={review} key={review.user!.username!}/>
            ))}
        </div>
    )
}