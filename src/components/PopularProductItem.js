import React from "react";
import { useSelector } from 'react-redux';

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

    return (
        <a href={"/product/"+ data.id} className="link__item">
            <div className="box__image">
                <img src={data.image} alt={data.name[langcode.toUpperCase()]} className="image"/>
            </div>
            <div className="box__information">
                <span className="text__tag" style={{backgroundColor:'#00B8A4'}}>{strings[data.tag]}</span>
                <div className="text__name">{data.name[langcode.toUpperCase()]}</div>
                <div className="box__price">
                    <span className="text__price">{getCurrency(data.price, data.currency)}</span>
                <span className="text__unit">{strings["currency"]}</span></div>
            </div>
        </a>
    )
}

export default PopularProductItem