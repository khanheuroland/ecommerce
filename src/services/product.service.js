import callApi from '../utils/callApi'
async function getCategoryList(){
    let lstCat = await callApi('product/GetCategory');
    alert(lstCat.data.length);
}

export default {getCategoryList}