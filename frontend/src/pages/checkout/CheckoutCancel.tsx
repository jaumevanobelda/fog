import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmOrder } from '@/services/orderService';
import { useEffect, useState } from 'react';
import { useCancelOrder } from '@/mutations/order/useOrder';

export default function CheckoutCancel() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const sessionId = searchParams.get('session_id');
    const { mutateAsync: cancelOrder } = useCancelOrder();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        if (!sessionId) {
            navigate('/');
            return;
        }

        const cancel = async () => {
            try {
                const res = await cancelOrder(sessionId);
                console.log("Res ", res);
                setStatus('success');
            } catch (error: any) {
                console.error('Error cancelando la orden:', error);
                setStatus('error');
            }
        };
        cancel();
    }, [sessionId]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center  text-white">
                <Loader2 className="w-16 h-16 animate-spin text-purple-500 mb-4" />
                <h1 className="text-2xl font-bold">Cancelando la compra...</h1>
                <p className="text-gray-400 mt-2">Por favor, no cierres esta página</p>
            </div>
        );
    }
    if (status === 'error') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center  text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Error al cancelar la compra</h1>
                    <p className="text-gray-400 mb-6">Ha ocurrido un error</p>
                    <Button asChild>
                        <Link to="/">Volver a la tienda</Link>
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
            <div className="text-center">
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Compra cancelada</h1>
                <p className="text-gray-400 mb-6">
                    Has cancelado el proceso de pago.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button asChild>
                        <Link to="/">Volver a la tienda</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
