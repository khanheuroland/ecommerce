import callApi from '../utils/ghtkAPI'

async function getShipFee(service, address, province, district, weight, value){
    let endpoint="";
    if(service=="ghtk")
        endpoint = "https://services.giaohangtietkiem.vn/services/shipment/fee"
    let response = await callApi(endpoint +"/?address="+ encodeURIComponent(address) + "&province="+ encodeURIComponent(province) + "&district="+encodeURIComponent(district) + "&pick_province=H%C3%A0%20n%E1%BB%99i&pick_district=Qu%E1%BA%ADn%20H%C3%A0%20%C4%90%C3%B4ng&weight="+weight+"&value="+value) ;
    return response;
}

export default getShipFee