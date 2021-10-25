import React, {useEffect} from "react"
import PageHeaderComponent from '../components/PageHeaderComponent';
import { useParams } from "react-router"
import { useSelector, connect } from 'react-redux';
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import FlashSaleItem from '../components/FlashSaleItem';
import FooterComponent from '../components/FooterComponent';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';

var data = require('../assets/dumpdata.json');

function CategoryPage(props)
{
    let {catId} = useParams();
    const {strings, currentLanguageCode} = props;
    const bestProducts = useSelector((state)=>{
        return data.Products.filter(c=>c.CatID==catId) ;//state.configReducer.popularProducts
    })
    
    const categories = useSelector((state)=>{
        return state.configReducer.categories;
    })

    const [catName, updateCatName] = React.useState('');
    
    useEffect(() => {
        var cat = categories.filter((item)=>{return item.ID==catId});
        updateCatName(cat[0].Name[currentLanguageCode.toUpperCase()]);
    });

    return(
        <>
            <PageHeaderComponent/>
            <div className="section__main section__main-category">
                    <div className="section__main-inner">
                        <div className="box__superdeal">
                            <h2 className="text__title">
                                {catName}
                                <span className="layout-change">
                                    <AppsOutlinedIcon className="active"/>
                                    <DnsOutlinedIcon/>
                                </span>
                            </h2>
                            <div className="box__item">
                                <ul className="list__item">
                                    {
                                        bestProducts.map((item, index)=>(
                                            <li key={item.id} className="list-item">
                                                <FlashSaleItem data={item} index={1+ index} langcode = {currentLanguageCode} translation={strings}></FlashSaleItem>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
            <FooterComponent/>
        </>
    )
}

export default connect()(multilanguage(CategoryPage));