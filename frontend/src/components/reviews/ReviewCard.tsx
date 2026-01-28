import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import UserCard from '../user/UserCard'
import './ReviewCard.css'
import type { Review } from '@/types/review'


export default function ReviewCard({ review }: { review: Review }) {
    return (
        <>
            <UserCard user={review.user!} />
            <div>
                {rating()}
                <div>
                    <h3>{review.text}</h3>
                </div>
            </div>
        </>
    )

    function rating() {
        if (review.positive) {
            return (
                <div >
                    <ThumbsUpIcon className='positiva' /> <span>Reseña positiva</span>
                </div>
            )
        } else {
            return (
                <div>
                    <ThumbsDownIcon className='negativa' /> <span>Reseña negativa</span>
                </div>
            )
        }
    }





}