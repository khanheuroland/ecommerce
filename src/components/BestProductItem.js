
import React from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BestProductItem(props)
{
    const langcode = props.langcode;
    const data = props.data;
    const index = props.index;
    const strings = props.translation;

    const currencyRate = useSelector((state)=>{
        return state.configReducer.currencyRate
    })

    const getCurrency = (price, fromCurrency="won")=>{
        let val;
        if(langcode==="vi")
        {
            val = (Math.round(price*currencyRate[fromCurrency+strings["currencycode"]]/100))*100;
        }
        else if(langcode==="en")
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
                if(i%3===0 && i!==reverted.length)
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
        <Link to={"/product/"+ data.ID} className="link__item">
            <span className="text__rank">{index}</span>
            <div className="box__image">
                <img src={data.Image} className="image" alt={data.Name[langcode.toUpperCase()]}/>
            </div>
            <div className="box__information">
                <div className="text__name">{data.Name[langcode.toUpperCase()]}</div>
                <div className="box__price"><span className="text__price">{getCurrency(data.Price, "won")}</span><span className="text__unit">{strings["currency"]}</span></div>
            </div>
        </Link>
    )
}

export default BestProductItem