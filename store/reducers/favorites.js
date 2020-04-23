import {TOURS} from "../../data/dummy-data"
import {TOGGLE_FAV} from "../actions/favorites"



const initialState = {
    tours: TOURS,
    favorites:[],
    filters:TOURS
}

const favoritesReducer = (state = initialState, actions) => {
    switch(actions.type){
        case TOGGLE_FAV:
            const existingItem = state.favorites.findIndex(tour => tour.id === actions.tourId)
            if(existingItem >= 0){
                const updateItem = [...state.favorites]
                updateItem.splice(existingItem, 1)
                return{...state, favorites:updateItem}
            } 
            else{
                const tours = state.tours.find(tour => tour.id === actions.tourId)
                return{...state, favorites:state.favorites.concat(tours)}
            }
        default:
            return state;
    }
}

export default favoritesReducer;