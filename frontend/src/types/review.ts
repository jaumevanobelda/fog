import type { User } from "./user";

export interface Review {
    user?:User,
	game_slug?:string,
    text:string,
	positive:boolean,
	
}

