import React from "react"
import PageHeaderComponent from '../components/PageHeaderComponent';
import MenuSliderComponent from '../components/MenuSliderComponent';
import BestProductComponent from '../components/BestProductComponent';
import PopularProductComponent from "../components/PopularProductComponent";
import FreeShipProductComponent from "../components/FreeShipProductComponent";
import FlashSaleProductCoponent from '../components/FlashSaleProductCoponent';
import FooterComponent from '../components/FooterComponent';

function HomePage(props)
{
    return(
        <>
        <PageHeaderComponent/>
        <MenuSliderComponent/>
        <BestProductComponent/>
        <div className="section__main section__main-market">
            <div className="section__main-inner">
                <div className="box__expressshop">
                    <PopularProductComponent/>
                    
                </div>
                <div className="box__smiledelivery">
                    <FreeShipProductComponent/>
                </div>
            </div>
        </div>
        <FlashSaleProductCoponent/>
        <FooterComponent/>
        </>
    )
}

export default HomePage