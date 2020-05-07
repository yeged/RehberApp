export const TOGGLE_FAV = "TOGGLE_FAV"

export const toggleFav = (id) => {
    return async dispatch => {
        const response = await fetch("https://rehber-2e983.firebaseio.com/favorites/u1.json", {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                
            })
        })
        dispatch({
            type: TOGGLE_FAV,
            tourId: id
        })
    }
}
