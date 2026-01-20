import { Link, useSearchParams } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmOrder } from '@/services/orderService';
import { useEffect } from 'react';

export default function CheckoutCancel() {

    
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
