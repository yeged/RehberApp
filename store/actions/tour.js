export const TOGGLE_FAV = "TOGGLE_FAV"

export const toggleFav = (id) => {
    return {
        type: TOGGLE_FAV,
        tourId: id
    }
}


export const SET_FILTER = "SET_FILTER"

export const toggleFilter = (filterSettings) => {
    return{
        type: SET_FILTER,
        filters: filterSettings
    }
}