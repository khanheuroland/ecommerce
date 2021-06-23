const initialUserState={
    profile: {
        username: "GUESS",
        firstname: "",
        lastname: "",
        token: null
    }
}

const UserReducer = (state=initialUserState, action)=>{
    switch(action.type)
    {
        case "UPDATE":
        {
            const newProfile = action.payload;
            return {
                ...state,
                profile: newProfile
            }
        }
        default:
            return state;
    }
}

export default UserReducer