import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import type { Review } from '@/types/review'
import UserCard from '../user/UserCard'


export default function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 space-y-4">

            <div className="flex items-center justify-between gap-3 flex-wrap">
                <UserCard user={review.user!} />
                {rating()}
            </div>


            <p className="text-gray-300 text-sm leading-relaxed pl-1">
                {review.text}
            </p>
        </div>
    )

    function rating() {
        if (review.positive) {
            return (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 shrink-0">
                    <ThumbsUpIcon className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-medium text-blue-400">Positiva</span>
                </div>
            )
        } else {
            return (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 shrink-0">
                    <ThumbsDownIcon className="h-4 w-4 text-red-400" />
                    <span className="text-xs font-medium text-red-400">Negativa</span>
                </div>
            )
        }
    }
}