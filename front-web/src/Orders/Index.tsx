import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fecthProducts, saveOrder } from '../api';
import Footer from '../Footer/Index';
import { OrderLocationData, Product } from '../types';
import { checkIsSelected } from './helpers';
import OrderLocation from './OrderLocation';
import OrderSummary from './OrderSummary';
import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import './styles.css';


function Orders() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    useEffect(() => {
        fecthProducts()
            .then(response => setProducts(response.data))
            .catch(() => {
                toast.warning('Erro ao listar produtos');
            });
    }, []);


    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product);

        if (isAlreadySelected) {
            const selected = selectedProducts.filter(item => item.id !== product.id);
            setSelectedProducts(selected);
        } else {
            setSelectedProducts(previous => [...previous, product]);
        }
    }

    const validationFields = (numProducts: number) => {
        let result = false;
        if (numProducts === 0 ) {
            toast.warning('Selecione ao menos um produto.');
            result = true;
        } else if (orderLocation === undefined) {
            toast.warning('Informe o endereço para entrega');
            result = true;
        }
        return result;
    }

    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));

        if (!validationFields(productsIds.length)) {
            const payload = {
                ...orderLocation!,
                products: productsIds
            }
    
            saveOrder(payload).then( response => {
                toast.error(`Pedido enviado com sucesso! Nº do pedido: ${response.data.id}`);
                setSelectedProducts([]);
            })
            .catch(() => {
                toast.warning('Erro ao enviar pedido');
            })
        }
    }

    return (
        <>
            <div className="orders-container">
                <StepsHeader />
                <ProductsList
                    products={products}
                    onSelectProduct={handleSelectProduct}
                    selectedProducts={selectedProducts}
                />
                <OrderLocation
                    onChangeLocation={location => setOrderLocation(location)} />
                <OrderSummary
                    amount={selectedProducts.length}
                    totalPrice={totalPrice}
                    onSubmit={handleSubmit}
                />
            </div>
            <Footer />
        </>
    )
}

export default Orders;