import { useEffect, useState } from 'react';
import { fecthProducts } from '../api';
import { Product } from '../types';
import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import './styles.css';


function Orders() {

    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        fecthProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.log(error));
    }, []);

    return (
        <div className="orders-container">
            <StepsHeader />
            <ProductsList products={products}/>
        </div>
    )
}

export default Orders;