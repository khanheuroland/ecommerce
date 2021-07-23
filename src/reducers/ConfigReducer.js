const initialConfigState={
    currencyRate: {
        wonusd: 0.00088,
        wonvnd: 20.29,
        wonwon: 1,
        vndvnd:1,
        vndwon: 0.04928,
        vndusd: 0.0000426
    },
    intenationalShipFee: {
        weightUnit: 12500,
        volumeUnit: 12500
    },
    shipServices: {
        ghtk: {
            service: 'https://services.giaohangtietkiem.vn/services/shipment/fee',
            token: '72f862d1997f81f12e6f15Aa96194B9A9f15B4Eb'
        }
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