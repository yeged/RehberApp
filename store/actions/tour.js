export const CREATE_TOUR = "CREATE_TOUR"
export const DELETE_TOUR = "DELETE_TOUR"
export const UPDATE_TOUR = "UPDATE_TOUR"

export const createTour = (tCityId, tCategoryId, ownerId, profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize, userComment, personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {
    return{
        type: CREATE_TOUR,
        tourData:{
            tCityId, tCategoryId, ownerId,profileImg, Image, tourImage, tourName, time, language:[], city, category, price, tourPlan, groupSize, userComment, personalDetail, isNatural, isCultural, isPhotography, isNightlife
        }

    }
}

export const deleteTour = (tourId) => {
    return{
        type: DELETE_TOUR,
        tid:tourId
    }
}

export const updateTour = () => {
    return{
        type: UPDATE_TOUR,
        
    }
}