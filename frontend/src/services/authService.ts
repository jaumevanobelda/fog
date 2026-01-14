import { apiAuth } from './api'

export async function test() {
    const res = await apiAuth.get("");
    console.log("REs ", res);
    return await res.data;
}

export async function login(req: any) {
    const res = await apiAuth.post(`auth/${req.tipo}`, req.user);
    console.log("REs ", res);
    return await res.data;  
}


export async function getCurrent() {
    const res = await apiAuth.get("");
    console.log("REs ", res);
    return await res.data;
}