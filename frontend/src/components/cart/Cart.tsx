
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import './Cart.css'
import { useGetCart } from '@/queries/cart/useCart'
import GameCartCard from './GameCartCard';
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useCreateCheckoutSession } from '@/mutations/order/useOrder';
import { toast } from 'sonner';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty';
import { Link } from 'react-router-dom';
import Loading from '../ui/loading';


export default function Cart() {

    let { data, isLoading } = useGetCart();
    let { mutateAsync: createCheckout, isPending } = useCreateCheckoutSession();
    const [open, setOpen] = useState(false);
    // console.log("DATA Cart", data);


    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                    <ShoppingCart className="w-5 h-5" />
                </PopoverTrigger>
                <PopoverContent className="bg-gray-900 text-white p-3 rounded-md w-80 shadow-lg z-10">
                    {(data == null || data.cart.length == 0) ? Vacio() : desplegable()}
                </PopoverContent>
            </Popover>
        </>
    )


    function desplegable() {
        if (isLoading) return <Loading/>
        
        if (data == null) {
            return <></>
        }
        return (
            <>
                {data.cart?.map((id: number) => {
                    return <GameCartCard id={id} key={id}></GameCartCard>
                })}
                <Button onClick={comprar} disabled={isPending}>
                    {isPending ? 'Procesando...' : 'Comprar'}
                </Button>
            </>
        )
    }

    function Vacio() {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <ShoppingCart  />
                    </EmptyMedia>
                    <EmptyTitle>Carrito vacio</EmptyTitle>
                    <EmptyDescription>
                        Explora la tienda y añade un juego al carrito
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button variant="outline" size="sm" onClick={()=>{setOpen(false)}}>
                        <Link to="/">
                        Explorar la tienda
                        </Link>
                    </Button>
                </EmptyContent>
            </Empty>
        )
    }


    async function comprar() {
        try {
            const res = await createCheckout(data.cart);
            console.log("Checkout session:", res);
            if (res.url) {
                window.location.href = res.url;
            }
        } catch (error: any) {
            console.log("Error ", error);
            toast.error("Ha ocurrido un error al procesar el pago", { 
                description: error.response?.data?.error || 'Error desconocido' 
            });
        }
    }

}