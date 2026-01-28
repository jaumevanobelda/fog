import type { Review } from "@/types/review";
import { apiAuth, apiClientServer } from "./api";

export async function createReview(review:Review) {
    const res = await apiAuth.post(`review/${review.game_slug}`,{text:review.text,positive:review.positive});
    return await res.data;
}       
export async function removeReview(slug:string) {
    const res = await apiAuth.delete(`review/${slug}`);
    return await res.data;
}       

export async function getReviews(slug:string) {
    const res = await apiAuth.get(`review/${slug}`);
    console.log("RES ",res.data);
    
    return await res.data.reviews;
}       