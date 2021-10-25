import React from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import store from "../store";
import { addViewItems} from '../reducers/userReducer'
function PopularProductItem(props)
{
    const langcode = props.langcode;
    const data = props.data;
    const strings = props.translation;
    
    const currencyRate = useSelector((state)=>{
        return state.configReducer.currencyRate
    })

    const getCurrency = (price, fromCurrency)=>{
        let val;
        if(langcode=="vi")
        {
            val = (Math.round(price*currencyRate[fromCurrency+strings["currencycode"]]/100))*100;
        }
        else if(langcode=="en")
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

    const viewItem=()=>{
        store.dispatch(addViewItems(data));
    }

    return (
        <Link to={"/product/"+ data.ID} className="link__item" onClick={viewItem}>
            <div className="box__image">
                <img src={data.Image} alt={data.Name[langcode.toUpperCase()]} className="image"/>
            </div>
            <div className="box__information">
                {
                    data.Tags.indexOf('best')!=-1 &&
                        <span class="text__tag" style={{backgroundColor:"#2d8ce6"}}>{strings["best"]}</span>
                }
                {
                    data.Tags.indexOf('sale')!=-1 &&
                        <span class="text__tag" style={{backgroundColor:"#FF8C05"}}>{strings["flashsale"]}</span>
                }
                {
                    data.Tags.indexOf('freeship')!=-1 &&
                        <span class="text__tag" style={{backgroundColor:"#3452B8"}}>{strings["freeship"]}</span>
                }
                <div className="text__name">{data.Name[langcode.toUpperCase()]}</div>
                <div className="box__price">
                    <span className="text__price">{getCurrency(data.Price, data.Currency)}</span>
                <span className="text__unit">{strings["currency"]}</span></div>
            </div>
        </Link>
    )
}

export default PopularProductItem