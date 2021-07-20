import React from 'react';
import { useSelector, connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import PageHeaderComponent from '../components/PageHeaderComponent';
import ShoppingCartItem from "../components/ShoppingCartItem";
import Button from '@material-ui/core/Button';
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
var data = require('../assets/dumpdata.json');

const ShoppingCartPage = (props) => {
    const products = useSelector((state)=>{
        return data.Products.filter(c=>c.tag=='new') ;
    })
    const {strings, currentLanguageCode} = props;
    return (
        <>
            <PageHeaderComponent/>
            <div className="section__main section__main-category">
                <div className="section__main-inner">
                    <div className="warning" style={{paddingTop: "10px", paddingBottom: "10px"}}>
                        <Alert severity="info">Do ảnh hưởng của dịch Covid-19, một số khu vực có thể nhận hàng chậm hơn dự kiến. Chúng tôi đang nỗ lực giao các đơn hàng trong thời gian sớm nhất. Cám ơn sự thông cảm của quý khách.</Alert>
                    </div>
                    <h3 className="shopping-cart-title">GIỎ HÀNG ({products.length} sản phẩm)</h3>
                    <div className="cart-container">
                        <div className="cart-item-box">
                            <ul className="list__item">
                                {
                                    products.map((item, index)=>(
                                        <li key={item.id} className="list-item">
                                            <ShoppingCartItem data={item} index={1+ index} langcode = {currentLanguageCode} translation={strings}></ShoppingCartItem>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="cart-summary-box">
                            <h4>Thông tin thanh toán</h4>
                            <p style={{marginTop: "10px"}}>
                                <div className="col-left">Tạm tính:</div>
                                <div className="col-right">78.178.000 ₫</div>
                                <div className="clear"/>
                            </p>
                            <p>
                                <div className="col-left">Phí giao hàng:</div>
                                <div className="col-right">125.400 ₫</div>
                                <div className="clear"/>
                            </p>
                            <p style={{borderTop: "solid 1px #CCC"}}>
                                <div className="col-left"><b>Tổng cộng</b></div>
                                <div className="col-right"><b style={{fontSize: "18px", color: "#f57224"}}>78.178.000 ₫</b></div>
                                <div className="clear"/>
                            </p>

                            <h4 style={{marginTop: "30px"}}>Thông tin nhận hàng</h4>

                            <div style={{marginTop: "20px"}}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Mua hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default connect()(multilanguage(ShoppingCartPage));