import {CATEGORIES, CITIES, TOURS} from "../../data/dummy-data"
import {SET_FILTER } from "../actions/tour"



const initialState = {
    tours: TOURS,
    userTour: TOURS.filter(tour => tour.ownerId === "u1"),
    category: CATEGORIES,
    city: CITIES,
    filters:TOURS
    //Profile:
}

const tourReducer = (state = initialState, actions) => {
    switch(actions.type){
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