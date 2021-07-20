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
        Items: [
            /*{
            "ID": 1,
            "CatID": 1,
            "Name": {
                "KO": "로션 피지오겔로션 200ml",
                "EN": "Lotion Physiogel Lotion 200ml",
                "VI": "Lotion Physiogel Lotion 200ml"
            },
            "Image": "https://gdimg.gmarket.co.kr/1878140710/still/280?ver=1606457884",
            "LargeImage": "http://gdimg.gmarket.co.kr/1878140710/still/600?ver=1606457884",
            "Price": 34300,
            "Discount": 30,
            "Currency": "won",
            "Qty": 1,
            "ShipFee": 10000,
            "Total": 34300
        }, {
            "ID": 2,
            "CatID": 1,
            "Name": {
                "KO": "클라리피끄 브라이트닝 에멀젼 75ml 세트",
                "EN": "Clarifique Brightening Emulsion 75ml Set",
                "VI": "Clarifique Brightening Emulsion 75ml Set"
            },
            "Image": "https://gdimg.gmarket.co.kr/1984818057/still/280?ver=1612917268",
            "LargeImage": "http://gdimg.gmarket.co.kr/1984818057/still/600?ver=1612917268",
            "Price": 89250,
            "Discount": 15,
            "Currency": "won",
            "Qty": 1,
            "ShipFee": 10000,
            "Total": 89250
        }, {
            "ID": 3,
            "CatID": 1,
            "Name": {
                "KO": "에센셜 파워 에멀젼(모이스춰) 120ml/건성 스킨로션",
                "EN": "Essential Power Emulsion (Moisture) 120ml/Dry Skin Lotion",
                "VI": "Essential Power Emulsion (Moisture) 120ml/Sữa dưỡng da khô"
            },
            "Image": "https://gdimg.gmarket.co.kr/1887689290/still/280?ver=1600145530",
            "LargeImage": "http://gdimg.gmarket.co.kr/1887689290/still/600?ver=1600145530",
            "Price": 27900,
            "Discount": 0,
            "Qty": 1,
            "ShipFee": 10000,
            "Total": 27900
        }*/]
    }
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