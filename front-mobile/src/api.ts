import axios from "axios";
const API_URL = 'https://hts-sds2.herokuapp.com';

export function fecthOrders() {
    return axios(`${API_URL}/orders`);
}

export function confirmDelivery(orderId: number) {
    return axios.put(`${API_URL}/orders/${orderId}/delivered`);
}