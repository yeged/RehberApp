import {CATEGORIES, CITIES, TOURS} from "../../data/dummy-data"
import {CREATE_TOUR, DELETE_TOUR, UPDATE_TOUR} from "../actions/tour"
import Tour from "../../models/tours"

const initialState = {
    tours: TOURS,
    userTour: TOURS.filter(tour => tour.ownerId === "u1"),
    category: CATEGORIES,
    city: CITIES,
}

const tourReducer = (state = initialState, actions) => {
    switch(actions.type){
        case CREATE_TOUR:
            const newTour = new Tour(
                new Date().toString(),
                actions.tourData.tCityId,
                actions.tourData.tCategoryId,
                "u1",
                actions.tourData.profileImg,
                actions.tourData.Image,
                actions.tourData.tourImage,
                actions.tourData.tourName,
                actions.tourData.time,
                actions.tourData.language,
                actions.tourData.city,
                actions.tourData.category,
                actions.tourData.price,
                actions.tourData.tourPlan,
                actions.tourData.groupSize,
                "",
                actions.tourData.personalDetail,
                actions.tourData.isNatural,
                actions.tourData.isCultural,
                actions.tourData.isPhotography,
                actions.tourData.isNightLife        
            )
            return{
                ...state,
                tours: state.tours.concat(newTour),
                userTour:  state.userTour.concat(newTour)
            }


        default:
            return state;
    }
}

export default tourReducer;