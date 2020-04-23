export const SET_FILTER = "SET_FILTER"

export const toggleFilter = (filterSettings) => {
    return{
        type: SET_FILTER,
        filters: filterSettings
    }
}