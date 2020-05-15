
import { CREATE_TOUR, DELETE_TOUR, UPDATE_TOUR, SET_TOUR, CREATE_CAT, SET_CAT, SET_CITY, SET_FILTER, CREATE_CITY } from "../actions/tour"
import Tour from "../../models/tours"
import Category from "../../models/Category"
import Province from "../../models/City"

const initialState = {
    tours: [],
    userTour: [],
    categorizedTour: [],
    cityTour: [],
    category: [],
    city: [],
    findCity: [],
    findCat: []
}

const tourReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_FILTER:
            const appliedFilters = actions.filters
            const updatedFilteredTours = state.cityTour.filter(tour => {
                if (appliedFilters.natural && !tour.isNatural) {
                    return false
                }
                if (appliedFilters.cultural && !tour.isCultural) {
                    return false
                }
                if (appliedFilters.photography && !tour.isPhotography) {
                    return false
                }
                if (appliedFilters.night && !tour.isNightlife) {
                    return false
                }
                return true;
            })
            return { ...state, cityTour: updatedFilteredTours }
        case SET_TOUR:
            return {
                tours: actions.availableTours,
                userTour: actions.userTour,
                categorizedTour: actions.categorizedTour,
                cityTour: actions.cityTour
            }
        case CREATE_TOUR:
            const newTour = new Tour(
                actions.tourData.id,
                actions.tourData.tCityId,
                actions.tourData.tCategoryId,
                actions.tourData.ownerId,
                actions.tourData.fname,
                actions.tourData.phone,
                actions.tourData.profileImg,
                actions.tourData.tourImage,
                actions.tourData.tourName,
                actions.tourData.time,
                actions.tourData.language,
                actions.tourData.city,
                actions.tourData.category,
                actions.tourData.price,
                actions.tourData.tourPlan,
                actions.tourData.groupSize,
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
                state.userTour[tourIndex].fname,
                state.userTour[tourIndex].phone,
                actions.tourData.profileImg,
                actions.tourData.tourImage,
                actions.tourData.tourName,
                actions.tourData.time,
                actions.tourData.language,
                state.userTour[tourIndex].city,
                state.userTour[tourIndex].category,
                actions.tourData.price,
                actions.tourData.tourPlan,
                actions.tourData.groupSize,
                actions.tourData.personalDetail,
                state.userTour[tourIndex].isNatural,
                state.userTour[tourIndex].isCultural,
                state.userTour[tourIndex].isPhotography,
                state.userTour[tourIndex].isNightLife
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
                category: actions.availableCat,
                findCat: actions.findCat
            }
        case CREATE_CAT:
            const newCat = new Category(
                actions.id,
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
            return {
                city: actions.availableCity,
                findCity: actions.findCity
            }
        case CREATE_CITY:
            
            const newCity = new Province(
                actions.id,
                actions.tourData.cityId,
                actions.tourData.cityLabel,
                actions.tourData.cityPhoto

            )
            return {
                ...state,
                city: actions.city.concat(newCity)
            }

        default:
            return state;
    }
}

export default tourReducer;