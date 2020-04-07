import {CATEGORIES, CITIES, TOURS} from "../../data/dummy-data"


const initialState = {
    tours: TOURS,
    favorites:[],
    category: CATEGORIES,
    city: CITIES
    //Profile:
}

const tourReducer = (state = initialState, actions) => {
    return state;
}

export default tourReducer;