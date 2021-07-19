import callApi from '../utils/callApi'

const initialUserState={
    authFormOpen: false,
    authForm: "",
    profile: {
        Email: "",
        FullName: "",
        Token: null
    },
    shoppingCart: []
}

export const openAuthForm = (form)=> async(dispatch)=>{
    dispatch({type: 'OPEN_AUTH', payload: form})
}
export const closeAuthForm=()=>async(dispatch)=>{
    dispatch({type: 'CLOSE_AUTH'})
}
export const loginSuccess=(profile)=>async(dispatch)=>{
    dispatch({type: 'UPDATE', payload: profile});
    dispatch({type: 'CLOSE_AUTH'})
}
export const logout=()=>async(dispatch)=>{
    dispatch({type: 'UPDATE', payload: {
        Email: "",
        FullName: "",
        Token: null
    }})
}

export const addToShoppingCart=(item)=>async(dispatch)=>{
    dispatch({type: "ADD_TO_CART", payload: item});
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
        case "OPEN_AUTH": 
        {
            const authForm = action.payload;
            return {
                ...state,
                authFormOpen: true,
                authForm: authForm
            }
        }
        case "CLOSE_AUTH":
        {
            return {
                ...state,
                authFormOpen: false
            }
        }
        default:
            return state;
    }
}

export default UserReducer