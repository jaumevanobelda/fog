import { useConfirmOrder } from '@/mutations/order/useOrder';
import { useClearCart } from '@/mutations/cart/useCart';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const sessionId = searchParams.get('session_id');
    const { mutateAsync: confirmOrder } = useConfirmOrder();
    const { mutateAsync: clearCart } = useClearCart();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [order, setOrder] = useState<any>(null);
    console.log("searchParams ",searchParams);

    
    
    useEffect(() => {
        if (!sessionId) {
            navigate('/');
            return;
        }

        const confirm = async () => {
            try {
                const res = await confirmOrder(sessionId);
                console.log("Res ",res);
                
                setOrder(res.order);
                setStatus('success');
                await clearCart();
                toast.success('¡Compra realizada con éxito!');
            } catch (error: any) {
                console.error('Error confirmando orden:', error);
                setStatus('error');
                toast.error('Error al confirmar la compra', {
                    description: error.response?.data?.error || 'Error desconocido'
                });
            }
        };

        confirm();
    }, [sessionId]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center  text-white">
                <Loader2 className="w-16 h-16 animate-spin text-purple-500 mb-4" />
                <h1 className="text-2xl font-bold">Procesando tu compra...</h1>
                <p className="text-gray-400 mt-2">Por favor, no cierres esta página</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center  text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Error al procesar la compra</h1>
                    <p className="text-gray-400 mb-6">Ha ocurrido un error al confirmar tu pedido</p>
                    <Button asChild>
                        <Link to="/">Volver a la tienda</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center  text-white">
            <div className="text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">¡Compra realizada con éxito!</h1>
                <p className="text-gray-400 mb-2">Tu pedido ha sido procesado correctamente</p>
                {order && (
                    <p className="text-lg text-purple-400 mb-6">
                        Total: {order.totalPrice?.toFixed(2)}€
                    </p>
                )}
                <div className="flex gap-4 justify-center">
                    <Button asChild>
                        <Link to="/">Volver a la tienda</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link to="/library">Ver mi biblioteca</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
