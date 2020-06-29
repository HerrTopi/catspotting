import { SET_CATS } from '../actions/actionTypes'

const initialState = {
    cats: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATS:
            return setCats(state, action)
        default:
            return state
    }
}

const setCats = (state, { cats }) => ({ ...state, cats })

export default reducer