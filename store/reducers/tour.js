import { CATEGORIES, CITIES, TOURS } from "../../data/dummy-data"
import { CREATE_TOUR, DELETE_TOUR, UPDATE_TOUR, SET_TOUR, CREATE_CAT, SET_CAT, SET_CITY } from "../actions/tour"
import Tour from "../../models/tours"
import Category from "../../models/Category"

const initialState = {
    tours: TOURS,
    userTour: TOURS.filter(tour => tour.ownerId === "u1"),
    category: [],
    city: [],
}

const tourReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_TOUR:
            return {
                tours: actions.availableTours,
                userTour: actions.availableTours.filter(tour => tour.ownerId === "u1")
            }
        case CREATE_TOUR:
            const newTour = new Tour(
                actions.tourData.id,
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
                actions.tourData.isNightlife
            )
            return {
                ...state,
                tours: state.tours.concat(newTour),
                userTour: state.userTour.concat(newTour)
            }
        case UPDATE_TOUR:
            const tourIndex = state.userTour.findIndex(tour => tour.id === actions.tid)
            const updatedTour = new Tour(
                actions.tid,
                state.userTour[tourIndex].tCityId,
                state.userTour[tourIndex].tCategoryId,
                state.userTour[tourIndex].ownerId,
                actions.tourData.profileImg,
                actions.tourData.Image,
                actions.tourData.tourImage,
                actions.tourData.tourName,
                actions.tourData.time,
                actions.tourData.language,
                state.userTour[tourIndex].city,
                state.userTour[tourIndex].category,
                actions.tourData.price,
                actions.tourData.tourPlan,
                actions.tourData.groupSize,
                actions.tourData.userComment,
                actions.tourData.personalDetail,
                actions.tourData.isNatural,
                actions.tourData.isCultural,
                actions.tourData.isPhotography,
                actions.tourData.isNightLife
            )
            const updatedUserTour = [...state.userTour]
            updatedUserTour[tourIndex] = updatedTour

            const updatedTourIndex = state.tours.findIndex(tour => tour.id === actions.tid)
            const updatedGeneralTour = [...state.tours]
            updatedGeneralTour[updatedTourIndex] = updatedTour

            return {
                ...state,
                tours: updatedGeneralTour,
                userTour: updatedUserTour
            }

        case DELETE_TOUR:
            return {
                ...state,
                tours: state.tours.filter(tour => tour.id !== actions.tid),
                userTour: state.userTour.filter(tour => tour.id !== actions.tid)
            }
        case SET_CAT:
            return {
                category: actions.availableCat
            }
        case CREATE_CAT:
            const newCat = new Category(
                actions.tourData.categoryId,
                actions.tourData.categoryLabel,
                actions.tourData.categoryPhoto,
                actions.tourData.categoryText,
                actions.tourData.isNatural,
                actions.tourData.isCultural,
                actions.tourData.isPhotography,
                actions.tourData.isNightLife
            )
            return {
                ...state,
                category: actions.category.concat(newCat)
            }
            case SET_CITY:
                return{
                    city: actions.availableCity
                }

        default:
            return state;
    }
}

export default tourReducer;