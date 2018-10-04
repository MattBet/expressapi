import { GET_ITEMS, ADD_ITEM, DEL_ITEM, ITEMS_LOADING } from "./types";
import axios from 'axios';

export const getItems = () => dispatch => {
    dispatch(setItemLoading());
    axios
        .get('/products')
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
};

export const deleteItem = id => dispatch => {
    axios
        .delete(`/products/${id}`)
        .then(res =>
            dispatch({
                type: DEL_ITEM,
                payload: id
            })
        )
};

export const addItem = product => dispatch => {
    axios
        .post('/products', product)
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
};

export const setItemLoading = () => {
    return {
        type: ITEMS_LOADING,
    };
};