const initialConfigState={
    currencyRate: {
        wonusd: 0.00088,
        wonvnd: 20.29,
        wonwon: 1
    },
    authStatus:{
        module: ''
    }
}

const ConfigReducer = (state=initialConfigState, action)=>{
    switch(action.type)
    {
        case "UPDATE_BEST_PRODUCT":
        {
            const newBestProduct = action.payload;
            return {
                ...state,
                bestProducts: newBestProduct
            }
        }
        default:
            return state;
    }
}

export default ConfigReducer