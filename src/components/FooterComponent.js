import React from "react";
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import {connect} from "react-redux";

function FooterComponent(props)
{
    const {strings, currentLanguageCode} = props;

    return (
        <div id="footer" className="js-ussr-component">
            <div id="desktop_layout-footer" className="section__footer">
                <div className="box__footer">
                    <div className="box__footer-utility">
                        <ul className="list__footer-utility">
                            <li className="list-item__footer-utility"><a href="#" target="_blank" className="link__footer-utility">{strings["footer_about"]}</a></li>
                            <li className="list-item__footer-utility"><a href="#" target="_blank" className="link__footer-utility">{strings["footer_user_agreement"]}</a></li>
                            <li className="list-item__footer-utility"><a href="#" target="" className="link__footer-utility">{strings["footer_privacy"]}</a></li>
                            <li className="list-item__footer-utility"><a href="#" target="" className="link__footer-utility">{strings["footer_site_map"]}</a></li>
                            <li className="list-item__footer-utility"><a href="#" target="" className="link__footer-utility">{strings["footer_customer_service"]}</a></li>
                        </ul>
                    </div>
                    <div className="box__company-info">
                        <div className="box__company-detail-info"><span className="text__company-title sprite__common--after">{strings["footer_company_name"]}</span>
                            <p className="text__content">{strings["footer_company_address"]}
                            <br/>{strings["footer_business_code"]}: 0109427008</p>
                        </div>
                        <div className="box__cscenter-info">
                            <a href="#" className="link__company-title" data-montelena-acode="200003456">{strings["footer_service_center"]}</a>
                            <p className="text__content">{strings["tel"]}: <em className="text__emphasis">0933 333 333 / 0988 888 888</em> ({strings["footer_working_time"]}) <br/>Fax : 02-589-8842 &nbsp; Mail :
                                <a href="#" className="link__mail" data-montelena-acode="200003457">market@youngsante.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect()(multilanguage(FooterComponent));