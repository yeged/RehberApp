import { CREATE_PROFILE, SET_PROFILE, UPDATE_PROFILE , SET_SELECTED_PROFILE} from "../actions/profile"
import Profile from "../../models/Profile"




const initialState = {
    profile: [],
    selectedProfile: [],
}

const profileReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_SELECTED_PROFILE:
            return{
                profile: actions.selectedProfile
            }
        case CREATE_PROFILE:
            const newProfile = new Profile(
                actions.id,
                actions.fname,
                actions.lname,
                actions.gender,
                actions.email,
                actions.phone,
                actions.photo
            )
            return {
                ...state,
                profile: state.profile.concat(newProfile)
            }
        case SET_PROFILE:
            return {
                profile: actions.profile
            }
        case UPDATE_PROFILE:
            const profileIndex = state.profile.findIndex(value => value.id === actions.pid)
            
            const updatedProfile = new Profile(
                actions.tid,
                actions.fname,
                actions.lname,
                actions.gender,
                actions.email,
                actions.phone,
                actions.photo
            )
            const updatedUserProfile = [...state.profile]
            updatedUserProfile[profileIndex] = updatedProfile



            return {
                ...state,
                profile: updatedUserProfile,
                   
            }
        default:
            return state;
    }
}

export default profileReducer;