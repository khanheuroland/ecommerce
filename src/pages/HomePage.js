import React, {useEffect} from "react"
import PageHeaderComponent from '../components/PageHeaderComponent';
import MenuSliderComponent from '../components/MenuSliderComponent';
import BestProductComponent from '../components/BestProductComponent';
import PopularProductComponent from "../components/PopularProductComponent";
import FreeShipProductComponent from "../components/FreeShipProductComponent";
import FlashSaleProductCoponent from '../components/FlashSaleProductCoponent';
import FooterComponent from '../components/FooterComponent';
import LoadingOverlay from "react-loading-overlay";
import productsvc from "../services/product.service";

function HomePage(props)
{
    const [loaddata, setLoadData] = React.useState(false);

    useEffect(() => {
       productsvc.getCategoryList();
       productsvc.getProductListByTagName('best');
       productsvc.getProductListByTagName('popular');
       productsvc.getProductListByTagName('freeship');
    });

    return(
        <>
        <LoadingOverlay active={loaddata} spinner text="Loading...">
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
        </LoadingOverlay>
        </>
        
    )
}

export default HomePage