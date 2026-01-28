import { getReviews } from "@/services/reviewService";
import type { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

export function useReviews(slug: string) {
  return useQuery<Review[]>({
    queryKey: ['Reviews', slug],
    queryFn: () => getReviews(slug),

  })
}