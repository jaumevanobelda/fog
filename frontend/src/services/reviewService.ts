import type { Review } from "@/types/review";
import { apiClientServer} from "./api";

export async function createReview(review:Review) {
    const res = await apiClientServer.post(`review/${review.game_slug}`,{text:review.text,positive:review.positive});
    return await res.data;
}       
export async function removeReview(slug:string) {
    const res = await apiClientServer.delete(`review/${slug}`);
    return await res.data;
}       

export async function getReviews(slug:string) {
    const res = await apiClientServer.get(`review/${slug}`);    
    return await res.data;
}       