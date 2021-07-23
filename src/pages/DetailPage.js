import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useSelector, connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";

import PageHeaderComponent from '../components/PageHeaderComponent';
import FooterComponent from '../components/FooterComponent';
import Alert from '@material-ui/lab/Alert';
import shipService from "../services/ship.service";
import Snackbar from '@material-ui/core/Snackbar';
import store from "../store";
import {addToShoppingCart} from '../reducers/userReducer'
import {openAuthForm} from "../reducers/userReducer";

var data = require('../assets/dumpdata.json');

function DetailPage(props)
{
    let {id} = useParams();
    const {strings, currentLanguageCode} = props;
    const product = useSelector((state)=>{
        return data.Products.filter(c=>c.ID==id)[0];//state.configReducer.popularProducts
    })
    const history = useHistory();

    const [qty, setQty] = React.useState(1);
    const [addedToCart, setAddedToCart] = React.useState(false);
    const increase=()=>{
        if(qty<100)
            setQty(qty+1);
    }

    const decrease=()=>{
        if(qty>1)
            setQty(qty-1);
    }

    const addToCart=()=>{
        if(userContext.profile.Token!=null)
        {
            product.Qty = qty;
            product.ShipFee = (domesticFee + getPrice(getShipFee(), "won", strings["currencycode"], false));
            store.dispatch(addToShoppingCart(product));
            setAddedToCart(true);

            history.push("/shoppingcart");
        }
        else
        {
            store.dispatch(openAuthForm("signin"));
        }
    }

    const closeAddedCartMessage=(event, reason)=>{
        if(reason === 'clickaway')
        {
            return;
        }
        setAddedToCart(false);
    }

    const intenationalShipFee  =useSelector((state)=>{
        return state.configReducer.intenationalShipFee
    })

    const [domesticFee, setDomesticFee] = useState(null);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        async function getDomesticFee() {
            if(userContext.profile.Address && userContext.profile.Address.length>0)
            {
                let result = await shipService('ghtk', 
                userContext.profile.Address[0].Address, 
                userContext.profile.Address[0].Province, 
                userContext.profile.Address[0].District, product.Weight?product.Weight*1000:1000, getPrice(product.Price, "won", "vnd", false));
                setTotal(result.Fee*qty+getPrice(getShipFee(), "won", "vnd", false)*qty + getPrice(product.Price, "won", "vnd", false)*qty)
                return setDomesticFee(
                    getPrice(result.Fee, "vnd", strings["currencycode"], false)
                );
            }
            else
            {
                setTotal(getPrice(product.Price, "won", "vnd", false)*qty + getPrice(getShipFee(), "won", "vnd", false)*qty)
            }
        }
        getDomesticFee();
    });

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
        if(product.Weight && product.Size)
        {
            let weight = Math.ceil(product.Weight);
            let size = Math.ceil(product.Size);

            let fee = weight*intenationalShipFee.weightUnit> size*intenationalShipFee.volumeUnit?weight*intenationalShipFee.weightUnit:size*intenationalShipFee.volumeUnit;
            return fee;
        }
        return 0;
    }

    const getPrice = (price, fromCurrency="won", toCurrency = strings["currencycode"],isFormat=true)=>{
        let val;
        let convertedPrice = price*currencyRate[fromCurrency+toCurrency];

        if(toCurrency=="vnd" || toCurrency=="won")
        {
            val = (Math.round(convertedPrice/100))*100;
        }
        else if(toCurrency=="usd")
        {
            val = convertedPrice.toFixed(2);
        }
        else
        {
            val = price;
        }
        if(val>999 && isFormat)
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
                                                    <div className="box__others-title" style={{display: "block"}}>{strings["delivery_address"]}</div>
                                                    <div className="delivery-box" style={{padding:"5px"}}>
                                                        <Alert severity="info">
                                                            {userContext.profile.Address[0].Address} <br/> {strings["wards"]}: {userContext.profile.Address[0].Ward} - {strings["district"]}: {userContext.profile.Address[0].District} - {strings["province"]}: {userContext.profile.Address[0].Province}
                                                        </Alert>
                                                    </div>
                                                </div>
                                            }
                                            <div className="box__others-item">
                                                <span className="detail_item_icon weight_icon"></span>
                                                <div className="box__others-title">{strings["estimated_weight"]}</div>
                                                <div className="box__others-content"><span className="text__letter-s">{product.Weight} kg</span></div>
                                            </div>
                                            <div className="box__others-item">
                                                <span className="detail_item_icon package_icon"></span>
                                                <div className="box__others-title">{strings["estimated_package"]}</div>
                                                <div className="box__others-content"><span className="text__letter-s">{product.Size} liter</span></div>
                                            </div>
                                            <div className="box__others-item box__others-item--full ">
                                                <span className="detail_item_icon ship_fee"></span>
                                                <div className="box__others-title">{strings["international_shipping_fee"]}</div>
                                                <div className="box__others-content"><p className="text__delivery-price">{getPrice(getShipFee())}<span className="text__others--point"> {strings["currency"]}</span></p></div>
                                            </div>
                                            {
                                                domesticFee!=null &&
                                                <div className="box__others-item box__others-item--full ">
                                                    <span className="detail_item_icon ship_fee"></span>
                                                    <div className="box__others-title">{strings["domestic_shipping_fee"]}</div>
                                                    <div className="box__others-content">
                                                        <p className="text__delivery-price">
                                                            <div className="box__others-title" style={{display: "table-cell"}}>{domesticFee} {strings["currency"]}</div>
                                                            <div className="domestic-transporter" style={{display: "table-cell", textAlign: "right", paddingRight: "40px", fontWeight: "normal"}}>
                                                                <img src="http://giaohangtietkiem.vn/wp-content/uploads/2015/10/logo.png" style={{width:"24px"}}/> {strings["shipping_by"]}: GHTK
                                                                <button type="button" className="button__accordion"><i className="sprite__img-accopen">open</i></button>
                                                            </div>
                                                        </p>
                                                    </div>
                                                </div>
                                            }
                                            
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
                                                                <button className="button__plus" type="button" onClick={increase}><i className="sprite__img-plus">수량증가</i></button>
                                                                <button className="button__minus" type="button" onClick={decrease}><i className="sprite__img-minus">수량감소</i></button>
                                                                <input className="form__ctrl-num" type="text" maxLength="3" title="수량" value={qty}/>
                                                            </div>
                                                        </div>
                                                        <div className="box__choice--col box__choice-total">
                                                            <span className="text__choice-foreign">{getPrice(total, "vnd", strings["currencycode"])} {strings["currency"]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box__button-buy">
                                            <div className="box__button--col">
                                                <button type="button" className="button__basic-default" id="_cartAction" onClick={addToCart}>
                                                    {strings["add_to_cart"]}
                                                </button>
                                            </div>
                                            <div className="box__button--col">
                                                <button type="button" className="button__basic-primary" id="_buyAction" onClick={addToCart}>
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
            <Snackbar open={addedToCart} autoHideDuration={3000} onClose={closeAddedCartMessage}>
                <Alert severity="success">
                    {strings["add_to_cart_success"] &&
                        <div dangerouslySetInnerHTML={{__html:strings["add_to_cart_success"].replace("{0}", qty).replace("{1}", product.Name[currentLanguageCode.toUpperCase()])}}>
                        </div>
                    }
                </Alert>
            </Snackbar>
            <FooterComponent/>
        </>
    )
}

export default connect()(multilanguage(DetailPage));