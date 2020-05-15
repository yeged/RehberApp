
import { ADD_FAV, SET_FAV, DELETE_FAV } from "../actions/favorites"
import Favorite from "../../models/Favorites"




const initialState = {
    favorites: [],
}

const favoritesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_FAV:
            const newFav = new Favorite(
                actions.id,
                actions.tourId,
                actions.tourName,
                actions.time,
                actions.price,
                actions.tourImage,
                actions.city
            )
            return {
                ...state,
                favorites: state.favorites.concat(newFav)
            }
        case SET_FAV:
            return {
                favorites: actions.favs
            }
        case DELETE_FAV:
            return {
                ...state,
                favorites: state.favorites.filter(fav => fav.id !== actions.fid),
            }
        // case TOGGLE_FAV:
        //     const existingItem = state.favorites.findIndex(tour => tour.id === actions.tourId)
        //     if(existingItem >= 0){
        //         const updateItem = [...state.favorites]
        //         updateItem.splice(existingItem, 1)
        //         return{...state, favorites:updateItem}
        //     } 
        //     else{
        //         const tours = state.tours.tours.find(tour => tour.id === actions.tourId)
        //         return{...state, favorites:state.favorites.concat(tours)}
        //     }
        default:
            return state;
    }
}

export default favoritesReducer;