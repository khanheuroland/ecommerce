import callApi from '../utils/callApi'

async function getShipFee(service, address, province, district, weight, value){
    let endpoint="";
    if(service=="ghtk")
        endpoint = "Order/getGHTKFee"
    let response = await callApi(endpoint +"/?address="+ address + "&province="+ province + "&district="+district + "&weight="+weight+"&value="+value) ;
    return response;
}

export default getShipFee