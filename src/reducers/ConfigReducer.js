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
    },
    categories: [
        {
            ID: 1, Name: { VI: 'Chăm sóc da', EN: 'Skin Care', KO: '스킨케어'}
        },
        {
            ID: 2, Name: {VI: 'Nước hoa', EN: 'Perfume', KO: '향수'}
        },
        {
            ID: 3, Name: { VI: 'Phụ kiện làm đẹp', EN: 'Beauty Accessories', KO: '이미용소품' }
        },
        {
            ID: 4, Name: {VI: 'Chăm sóc móng', EN: 'Nail Care', KO: '네일케어'}
        },
        {
            ID: 5, Name: {VI: 'Màu trang điểm', EN: 'Color Makeup', KO: '색조메이크업'}
        },
        {
            ID: 6, Name: {VI: 'Làm sạch / Lột da', EN: 'Cleansing/Peeling', KO: '클렌징/필링'}
        },
        {
            ID: 7, Name: {VI: 'Mạt nạ', EN: 'Mask', KO: '마스크'}
        },
        {
            ID: 8, Name: {VI: 'Mỹ phẩm Nam', EN: 'Men\'s Cosmetics', KO: '남성화장품'}
        },
        {
            ID: 9, Name: {VI: 'Kem chống nắng', EN: 'Sun Care', KO: '선케어'}
        }
    ],
    bestProducts: [],
    popularProducts: [],
    freeShipProducts: [],
    flashSaleProducts: []
}

const ConfigReducer = (state=initialConfigState, action)=>{
    switch(action.type)
    {
        case "UPDATE_CATEGORY":
        {
            const lstCat = action.payload;
            var cats = []
            lstCat.forEach((item)=>{
                var vi = item.Name.filter((n)=>{return n.LangCode=="VI"})[0].Name;
                var en = item.Name.filter((n)=>{return n.LangCode=="EN"})[0].Name;
                var ko = item.Name.filter((n)=>{return n.LangCode=="KO"})[0].Name;
                cats.push({ID: item.ID, Name: {VI: vi, EN: en, KO: ko}});
            })
            return {
                ...state,
                categories: cats
            }
        }
        case "UPDATE_BEST_PRODUCT":
        {
            const lstBestProduct = action.payload;
            return {
                ...state,
                bestProducts: lstBestProduct
            }
        }
        case "UPDATE_POPULAR_PRODUCT":
        {
            const lstPopularProduct = action.payload;
            return {
                ...state,
                popularProducts: lstPopularProduct
            }
        }
        case "UPDATE_FREESHIP_PRODUCT":
        {
            const lstFreeshipProduct = action.payload;
            return {
                ...state,
                freeShipProducts: lstFreeshipProduct
            }
        }
        case "UPDATE_FLASH_SALE_PRODUCT":
        {
            const lstFlashSaleProduct = action.payload;
            return {
                ...state,
                flashSaleProducts: lstFlashSaleProduct
            }   
        }
        default:
            return state;
    }
}

export const updateCategory = (lstCat)=> async(dispatch)=>{
    dispatch({type: 'UPDATE_CATEGORY', payload: lstCat})
}

export const updateBestProduct = (lstbestProduct) =>async(dispatch) =>{
    let products = [];
    lstbestProduct.forEach((item)=>{
        var vi = item.Name.filter((n)=>{return n.Language=="VI"})[0].Name;
        var en = item.Name.filter((n)=>{return n.Language=="EN"})[0].Name;
        var ko = item.Name.filter((n)=>{return n.Language=="KO"})[0].Name;

        let tags = [];
        item.Tags.forEach((tag)=>{
            tags.push(tag.Tags)
        })

        products.push(
            {
                ID: item.ID,
                CatID: item.CatID,
                Image: item.Image,
                LargeImage: item.LargeImage,
                Price: item.Price.Price,
                Discount: item.Price.Discount,
                Currency: item.Price.Currency,
                Weight: item.Weight,
                Size: item.Size,
                Name: {VI: vi, EN: en, KO: ko},
                Tags: tags
            });
    })

    dispatch({type: 'UPDATE_BEST_PRODUCT', payload: products})
}

export const updatePopularProduct = (lstPopularProduct)=>async(dispatch)=>{
    let products = [];
    lstPopularProduct.forEach((item)=>{
        var vi = item.Name.filter((n)=>{return n.Language=="VI"})[0].Name;
        var en = item.Name.filter((n)=>{return n.Language=="EN"})[0].Name;
        var ko = item.Name.filter((n)=>{return n.Language=="KO"})[0].Name;

        let tags = "";
        item.Tags.forEach((tag)=>{
            if(tag.Tags!='popular')
                tags+=tag.Tags+" "
        })
        console.log(item.ID + ":"+ tags.length);
        products.push(
            {
                ID: item.ID,
                CatID: item.CatID,
                Image: item.Image,
                LargeImage: item.LargeImage,
                Price: item.Price.Price,
                Discount: item.Price.Discount,
                Currency: item.Price.Currency,
                Weight: item.Weight,
                Size: item.Size,
                Name: {VI: vi, EN: en, KO: ko},
                Tags: tags
            });
    })

    dispatch({type: 'UPDATE_POPULAR_PRODUCT', payload: products})
}

export const updateFreeShipProduct = (lstFreeshipProduct) => async(dispatch)=>{
    let products = [];
    lstFreeshipProduct.forEach((item)=>{
        var vi = item.Name.filter((n)=>{return n.Language=="VI"})[0].Name;
        var en = item.Name.filter((n)=>{return n.Language=="EN"})[0].Name;
        var ko = item.Name.filter((n)=>{return n.Language=="KO"})[0].Name;

        let tags = "";
        item.Tags.forEach((tag)=>{
            if(tag.Tags!='freeship')
                tags+=tag.Tags+" "
        })

        products.push(
            {
                ID: item.ID,
                CatID: item.CatID,
                Image: item.Image,
                LargeImage: item.LargeImage,
                Price: item.Price.Price,
                Discount: item.Price.Discount,
                Currency: item.Price.Currency,
                Weight: item.Weight,
                Size: item.Size,
                Name: {VI: vi, EN: en, KO: ko},
                Tags: tags
            });
    })

    dispatch({type: 'UPDATE_FREESHIP_PRODUCT', payload: products})
}

export const updateFlashSaleProduct = (lstFlashSaleProduct)=>async(dispatch)=>{
    let products = [];
    lstFlashSaleProduct.forEach((item)=>{
        var vi = item.Name.filter((n)=>{return n.Language=="VI"})[0].Name;
        var en = item.Name.filter((n)=>{return n.Language=="EN"})[0].Name;
        var ko = item.Name.filter((n)=>{return n.Language=="KO"})[0].Name;

        let tags = [];
        item.Tags.forEach((tag)=>{
            if(tag.Tags!='sale')
                tags+=tag.Tags+" "
        })

        products.push(
            {
                ID: item.ID,
                CatID: item.CatID,
                Image: item.Image,
                LargeImage: item.LargeImage,
                Price: item.Price.Price,
                Discount: item.Price.Discount,
                Currency: item.Price.Currency,
                Weight: item.Weight,
                Size: item.Size,
                Name: {VI: vi, EN: en, KO: ko},
                Tags: tags
            });
    })

    dispatch({type: 'UPDATE_FREESHIP_PRODUCT', payload: lstFlashSaleProduct})
}
export default ConfigReducer