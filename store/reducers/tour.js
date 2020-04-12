import {CATEGORIES, CITIES, TOURS} from "../../data/dummy-data"
import {TOGGLE_FAV, SET_FILTER } from "../actions/tour"



const initialState = {
    tours: TOURS,
    favorites:[],
    category: CATEGORIES,
    city: CITIES,
    filters:TOURS
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
                const tours = state.tours.find(tour => tour.id === actions.tourId)
                return{...state, favorites:state.favorites.concat(tours)}
            }
        case SET_FILTER:
            const appliedFilters = actions.filters
            const updatedFilteredTours = state.tours.filter(tour => {
                if(appliedFilters.natural && !tour.isNatural){
                    return false
                }
                if(appliedFilters.cultural && !tour.isCultural){
                    return false
                }
                if(appliedFilters.photography && !tour.isPhotography){
                    return false
                }
                if(appliedFilters.night && !tour.isNightlife){
                    return false
                }
                return true;
            })
            return {...state, filters:updatedFilteredTours}
        default:
            return state;
    }
}

export default tourReducer;