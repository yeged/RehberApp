import {TOURS} from "../../data/dummy-data"
import {SET_FILTER } from "../actions/filter"



const initialState = {
    filters:TOURS
}

const filterReducer = (state = initialState, actions) => {
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

export default filterReducer;