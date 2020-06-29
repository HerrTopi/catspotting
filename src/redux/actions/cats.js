import {
    SET_CATS,
} from './actionTypes'
import { get, post } from '../utils'


export const getCats = (searchTerm = "") => {
    return async (dispatch) => {
        const data = await get(`cat?search=${searchTerm}`);
        dispatch(setCats(data))
    };
}

export const saveCat = (cat) => {
    return async (dispatch) => {
        await post('cat', cat);
        dispatch(getCats())
    };
}

export const setCats = (cats) => {
    return {
        type: SET_CATS,
        cats
    }
}