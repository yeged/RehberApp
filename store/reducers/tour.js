import {CATEGORIES, CITIES, TOURS} from "../../data/dummy-data"
import {TOGGLE_FAV } from "../actions/tour"


const initialState = {
    tours: TOURS,
    favorites:[],
    category: CATEGORIES,
    city: CITIES
    //Profile:
}

const tourReducer = (state = initialState, actions) => {
    switch(actions.type){
        case TOGGLE_FAV:
            const existingItem = state.favorites.findIndex(tour => tour.id === actions.tourId)
            if(existingItem >= 0){
                const updateItem = [...state.favorites]
                updateItem.splice(existingItem, 1)
                return{...state, favorites:updateItem}
            }
            else{
                const tour = state.tours.find(tour => tour.id === tourId)
                return{...state, favorites:state.favorites.concat(tour)}
            }
        default:
            return state;
    }
}

export default tourReducer;