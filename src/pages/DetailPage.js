import React from "react"
import { useParams } from "react-router"
import { useSelector, connect } from 'react-redux';
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";

import PageHeaderComponent from '../components/PageHeaderComponent';
import FooterComponent from '../components/FooterComponent';
import Alert from '@material-ui/lab/Alert';
import shipService from "../services/ship.service";

var data = require('../assets/dumpdata.json');

function DetailPage(props)
{
    let {id} = useParams();
    const {strings, currentLanguageCode} = props;
    const product = useSelector((state)=>{
        return data.Products.filter(c=>c.ID==id)[0];//state.configReducer.popularProducts
    })

    const intenationalShipFee  =useSelector((state)=>{
        return state.configReducer.intenationalShipFee
    })

    const domesticShip=()=>{
        let shipInfo = shipService('ghtk', "Quận 1 TP Hồ Chí Minh", "TP Hồ Chí Minh", "Quận 1", 950, 1125000);
        return shipInfo.fee;
    }

    const currencyRate = useSelector((state)=>{
        return state.configReducer.currencyRate
    })

    const userContext = useSelector((state)=>{
        return state.userReducer
    })

    const getDeliveryStartDate=()=>{
        const formatter = new Intl.DateTimeFormat(currentLanguageCode, { month: 'long' });
        let dateObj = new Date();
        dateObj = new Date(dateObj.setDate(dateObj.getDate() + 10));
        const month = formatter.format(dateObj);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        if(currentLanguageCode.toUpperCase()==="KO")
            return year + "년 " + month+" " +day +"일"
        return day +" "+ month +", "+year;
    }

    const getShipFee=()=>{
        let weight = Math.ceil(product.Weight);
        let size = Math.ceil(product.Size);

        let fee = weight*intenationalShipFee.weightUnit> size*intenationalShipFee.volumeUnit?weight*intenationalShipFee.weightUnit:size*intenationalShipFee.volumeUnit;
        return getPrice(fee);
    }

    const getPrice = (price, fromCurrency="won")=>{
        let val;
        if(currentLanguageCode=="vi")
        {
            val = (Math.round(price*currencyRate[fromCurrency+strings["currencycode"]]/100))*100;
        }
        else if(currentLanguageCode=="en")
        {
            val = (price*currencyRate[fromCurrency+strings["currencycode"]]).toFixed(2);
        }
        else
        {
            val = price;
        }
        if(val>999)
        {
            let reverted = val.toString().split('').reverse();
            let formatted=[]
            for(let i=1; i<=reverted.length; i++)
            {
                formatted.push(reverted[i-1]);
                if(i%3==0 && i!=reverted.length)
                {
                    formatted.push(strings["currency_group"]);
                }
            }
            return formatted.reverse().join('');
        }
        else
            return val;
    }

    return(
        <>
            <PageHeaderComponent/>
            <div className="section__main section__main-category">
                    <div className="section__main-inner">
                        <div className="box__superdeal">
                            <h2 className="text__title">
                                {strings["product_info"]}
                            </h2>
                            <div className="box__item">
                                <div className="box__article-top">
                                    <div className="box__viewer-img">
                                        <div className="box__thumb--gallery">
                                            <img style={{width:"500px", height:"500px", display:"block"}} src={product.LargeImage} alt={product.Name[currentLanguageCode.toUpperCase()]}/>
                                        </div>
                                        <div className="box__slide">
                                            <div className="box__list-thumb">
                                                <ul className="list__thumb">
                                                    <li className="list-item list-item--active">
                                                        <button type="button" className="button__thumb-list">
                                                            <img className="image__slide" style={{width:"60px", height:"60px"}} src={product.Image} alt={product.Name[currentLanguageCode.toUpperCase()]}/>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <section className="section__item--info">
                                        <div className="box__item-info">
                                            <div className="box__item--col box__item-summary">
                                                <p className="text__item-title">{product.Name[currentLanguageCode.toUpperCase()]}</p>
                                                <div className="shipping-type">
                                                    <i className="icon-overseas-shipping"></i>
                                                </div>
                                                <div className="box__price">
                                                    { product.Discount>0 &&
                                                        <p className="text__price-percent"><span className="text__price-discount">{product.Discount}</span><span className="text__price-mark">%</span></p>
                                                    }
                                                    <p className="text__price-tag">
                                                        <span className="text__price-selling">{getPrice(product.Price*(1+product.Discount/100), "won")} {strings["currency"]}</span>
                                                        <strong className="text__price-decide">
                                                            <span className="text__price-foreign">{getPrice(product.Price, "won")} {strings["currency"]}</span>
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box__others-info">
                                            <div className="box__others-item">
                                                <span className="detail_item_icon ship_icon"></span>
                                                <div className="box__others-title">{strings["ship_from"]}
                                                    <button type="button" className="button__small sprite_after-arrow"><i className="flag kr">national flag</i><span className="button__name">South Korean</span></button>
                                                    <span> {strings["to"]} </span>
                                                    <button type="button" className="button__small sprite_after-arrow"><i className="flag vn">national flag</i><span className="button__name">Viet Nam</span></button>
                                                </div>
                                                <button type="button" className="button__accordion"><i className="sprite__img-accopen">open</i></button>
                                            </div>
                                            {
                                                userContext.profile.Address && userContext.profile.Address.length>0 &&
                                                <div className="box__others-item">
                                                    <div className="box__others-title" style={{display: "block"}}>Delivery address</div>
                                                    <div className="delivery-box" style={{padding:"5px"}}>
                                                        <Alert severity="info">
                                                            {userContext.profile.Address[0].Address} <br/> Xã/Phường: {userContext.profile.Address[0].Ward} - Quận/Huyện: {userContext.profile.Address[0].District} - Thành phố/Tỉnh: {userContext.profile.Address[0].Province}
                                                        </Alert>
                                                    </div>
                                                </div>
                                            }
                                            <div className="box__others-item">
                                                <span className="detail_item_icon weight_icon"></span>
                                                <div className="box__others-title">{strings["estimated_weight"]}</div>
                                                <div className="box__others-content"><span className="text__letter-s">0.94 kg</span></div>
                                            </div>
                                            <div className="box__others-item">
                                                <span className="detail_item_icon package_icon"></span>
                                                <div className="box__others-title">{strings["estimated_package"]}</div>
                                                <div className="box__others-content"><span className="text__letter-s">0.5 liter</span></div>
                                            </div>
                                            <div className="box__others-item box__others-item--full ">
                                                <span className="detail_item_icon ship_fee"></span>
                                                <div className="box__others-title">{strings["international_shipping_fee"]}</div>
                                                <div className="box__others-content"><p className="text__delivery-price">{getShipFee()} {strings["currency"]}<span className="text__others--point"></span></p></div>
                                            </div>
                                            <div className="box__others-item box__others-item--full ">
                                                <span className="detail_item_icon ship_fee"></span>
                                                <div className="box__others-title">{strings["domestic_shipping_fee"]}</div>
                                                <div className="box__others-content">
                                                    <p className="text__delivery-price">
                                                        <div className="box__others-title" style={{display: "table-cell"}}>{domesticShip()}</div>
                                                        <div className="domestic-transporter" style={{display: "table-cell", textAlign: "right", paddingRight: "40px", fontWeight: "normal"}}>
                                                            <img src="http://giaohangtietkiem.vn/wp-content/uploads/2015/10/logo.png" style={{width:"24px"}}/> GHTK
                                                            <button type="button" className="button__accordion"><i className="sprite__img-accopen">open</i></button>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="box__others-item js-accordion-item">
                                                <div className="box__others-title"><i className="sprite__img-air">aviation</i>{strings["ship_start_on"]}</div>
                                                <div className="box__others-content"><span className="text__others--point text__letter-s">{getDeliveryStartDate()}</span></div>
                                            </div>
                                        </div>
                                        <div className="box__choice-list">
                                            <div className="box__choice-item">
                                                <div className="box__choice-header">
                                                    <div className="box__choice-info">
                                                        <div className="box__choice-ctrl  box__choice--col">
                                                            <div className="box__choice-ctrlbox">
                                                                <button className="button__plus" type="button"><i className="sprite__img-plus">수량증가</i></button>
                                                                <button className="button__minus" type="button"><i className="sprite__img-minus">수량감소</i></button>
                                                                <input className="form__ctrl-num" type="text" maxlength="3" title="수량" value="1"/>
                                                            </div>
                                                        </div>
                                                        <div className="box__choice--col box__choice-total">
                                                            <span className="text__choice-foreign">{getPrice(product.Price, "won")} {strings["currency"]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box__button-buy">
                                            <div className="box__button--col">
                                                <button type="button" className="button__basic-default" id="_cartAction">
                                                    {strings["add_to_cart"]}
                                                </button>
                                            </div>
                                            <div className="box__button--col">
                                                <button type="button" className="button__basic-primary" id="_buyAction">
                                                    {strings["buy_now"]}
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>        
                        </div>
                    </div>
            </div>
            <FooterComponent/>
        </>
    )
}

export default connect()(multilanguage(DetailPage));