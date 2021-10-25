import callApi from '../utils/callApi'
import store from "../store";
import {updateCategory, updateBestProduct, updatePopularProduct, updateFreeShipProduct, updateFlashSaleProduct} from '../reducers/configReducer'

async function getCategoryList(){
    let lstCat = await callApi('product/GetCategory');
    store.dispatch(updateCategory(lstCat.data));
}

async function getProductListByTagName(tagName){
    let lstProduct = await callApi('product/GetProductsByTag?tag='+ tagName);
    switch(tagName.toUpperCase())
    {
        case "BEST":
            store.dispatch(updateBestProduct(lstProduct.data));
            break;
        case "POPULAR":
            store.dispatch(updatePopularProduct(lstProduct.data));
            break;
        case "FREESHIP":
            store.dispatch(updateFreeShipProduct(lstProduct.data));
            break;
        case "SALE":
            store.dispatch(updateFlashSaleProduct(lstProduct.data));
            break;

    }
}

export default {getCategoryList, getProductListByTagName}