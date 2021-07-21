import callApi from '../utils/callApi'

const initialUserState={
    authFormOpen: false,
    authForm: "",
    profile: {
        Email: "",
        FullName: "",
        Token: null
    },
    shoppingCart: {
        Total: 0,
        ShipFee: 0,
        Qty: 0,
        Items: []
    },
    viewedItems: [
    ]
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
export const addViewItems=(item)=>async(dispatch)=>{
    dispatch({type: "ADD_VIEW_ITEM", payload: item});
}
export const addToShoppingCart=(item)=>async(dispatch)=>{
    dispatch({type: "ADD_TO_CART", payload: item});
}

export const adjustQtyShoppingCart=(item)=>async(dispatch)=>{
    dispatch({type: "CHANGE_QTY", payload: item});
}

export const removeFromShoppingCart=(item)=>async(dispatch)=>{
    dispatch({type: "REMOVE_FROM_CART", payload: item});
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
        case "ADD_VIEW_ITEM":
        {
            const viewItem = action.payload;
            let lstItems = state.viewedItems;
            lstItems.push(viewItem);
            return {
                ...state,
                viewedItems: lstItems
            }
            
        }
        case "ADD_TO_CART":
        {
            const addedItem = action.payload;
            let cartItems = state.shoppingCart.Items;
            if(!cartItems)
                cartItems = [];
                
            let isUpdated=false;
            cartItems.forEach(item => {
                if(item.ID === addedItem.ID)
                {
                    isUpdated=true;
                    item.Qty += addedItem.Qty;
                    item.Total += addedItem.Total;
                }
            });

            if(isUpdated===false)
            {
                cartItems.push(addedItem);
            }

            return{
                ...state,
                shoppingCart: {
                    Total: state.shoppingCart.Total + addedItem.Total,
                    ShipFee: 0,
                    Qty: state.shoppingCart.Qty + addedItem.Qty,
                    Items: cartItems
                }
            }
        }
        case "REMOVE_FROM_CART":
        {
            const removeItem = action.payload;
            let cartItems = state.shoppingCart.Items;
            let removeIndex=-1;
            cartItems.forEach((item, index) => {
                if(item.ID === removeItem.ID)
                {
                    removeIndex = index;
                    return;
                }
            });
            cartItems.splice(removeIndex,1);
            if(removeIndex>=0)
            {
                return {
                    ...state,
                    shoppingCart: {
                        Total: state.shoppingCart.Total - removeItem.Total,
                        ShipFee: 0,
                        Qty: state.shoppingCart.Qty - removeItem.Qty,
                        Items: cartItems
                    }
                }
            }
            return state;
        }
        case "CHANGE_QTY":
        {
            const changedItem = action.payload;
            let cartItems = state.shoppingCart.Items;
            let total = state.shoppingCart.Total;
            let qty = state.shoppingCart.Qty;
            cartItems.forEach(item => {
                if(item.ID === changedItem.ID)
                {
                    item.Qty = changedItem.Qty;
                    item.Total = changedItem.Total;
                }
            });
            
            return {
                ...state,
                shoppingCart: {
                    Total: cartItems.reduce((a, b)=>{return {Total: a.Total + b.Total}}).Total,
                    ShipFee: 0,
                    Qty: cartItems.reduce((a, b)=>{return {Qty: a.Qty + b.Qty}}).Qty,
                    Items: cartItems
                }
            }
        }
        default:
            return state;
    }
}

export default UserReducer