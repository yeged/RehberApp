export const CREATE_TOUR = "CREATE_TOUR"
export const DELETE_TOUR = "DELETE_TOUR"
export const UPDATE_TOUR = "UPDATE_TOUR"

export const createTour = (tCityId, tCategoryId,  profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize,  personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {
    return{
        type: CREATE_TOUR,
        tourData:{
            tCityId, tCategoryId, profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize,  personalDetail, isNatural, isCultural, isPhotography, isNightlife
        }

    }
}

export const deleteTour = (tourId) => {
    return{
        type: DELETE_TOUR,
        tid:tourId
    }
}

export const updateTour = (id, profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {
    return{
        type: UPDATE_TOUR,
        tid: id,
        tourData:{
           profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife
        }
        
    }
}