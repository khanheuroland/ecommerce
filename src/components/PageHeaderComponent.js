import React from "react";
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius:10
    },
  }));

function PageHeaderComponent(props) {
    const {strings, currentLanguageCode} = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showMenu, setShowMenu] = React.useState(null);

    const [authModule, setAuthModule] = React.useState("login");
    const classes = useStyles();

    const handleOpen = (module) => {
        setAuthModule(module);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
        setShowMenu(false);
    };

    const openChangeLanguage=(event)=>{
        setAnchorEl(event.currentTarget);
    }

    const openCategoryMenu=(event)=>{
        setShowMenu(!showMenu);
    }

    const handleChangeLanguage=(event)=>{
        let selectedItem = event.currentTarget;
        props.dispatch(changeLanguage(selectedItem.id));
        setAnchorEl(null);
    }

    return (
        <header id="header" className="js-ussr-component">
            <div id="desktop_layout-header" className="section__header">
                <div className="box__header">
                    <div className="box__header-inner">
                        <div className="box__header-content">
                            <h1 className="box__title-logo">
                                <a href="/" title="Youngsante" className="link__head">
                                    <img src="/images/image__logo.png" width="240" height="113" className="image__logo"/>
                                </a>
                            </h1>

                            <div className="box__head-search">
                                <form method="get" action="/search" className="form" acceptCharset="UTF-8">
                                    <fieldset id="skip-navigation-search" className="form__fieldset">
                                        <span className="box__search-input">
                                            <input name="keyword" title="검색어 입력" type="text" autoCapitalize="off" spellCheck="false" autoComplete="off" className="form__input" placeholder={strings["searchPlaceHolder"]} autoCorrect="off"/>
                                            <button type="submit" className="button__search">
                                                <img src="/images/image__header-search.png" alt="검색" className="image"/>
                                            </button>
                                        </span>
                                    </fieldset>
                                </form>
                            </div>

                            <div className="box__head-mytools">
                                <ul className="list__mytools">
                                    <li className="list-item list-item--mypage">
                                        <a href="/profile" className="link" title="나의 쇼핑정보">
                                            <img src="//pics.gmarket.co.kr/pc/single/kr/common/image__header-mypage.svg" className="image"/>
                                        </a>
                                    </li>
                                    <li className="list-item list-item--recent">
                                        <button type="button" id="button__recent-layer" className="button" aria-haspopup="listbox" aria-controls="box__recent-layer" title="최근본상품">
                                            <img src="//pics.gmarket.co.kr/pc/single/kr/common/image__header-recent.svg" alt="" className="image"/>
                                            <span className="box__recent-item"></span>
                                        </button>
                                    </li>
                                    <li className="list-item list-item--cart">
                                        <a href="/cart" className="link" title="장바구니 이동">
                                            <img src="//pics.gmarket.co.kr/pc/single/kr/common/image__header-cart.svg" alt="" className="image"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="box__navigation">
                            <div id="skip-navigation-category-all" className="box__category-all">
                                <button type="button" id="button__category-all" className="button__category-all sprite__common--before"
                                    aria-controls="main-menu" aria-haspopup="true" onClick={openCategoryMenu}>{strings["allCategories"]}</button>
                                      {
                                        showMenu &&
                                          <>
                                            <ul className="list__category-all">
                                                <li className="list-item__1depth">
                                                    <Link to="/category/1">
                                                        <span className="link__1depth-item">{strings["menu_skinCare"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/2">
                                                        <span className="link__1depth-item">{strings["menu_perfume"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/3">
                                                        <span className="link__1depth-item">{strings["menu_beautyAccessories"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/4">
                                                        <span className="link__1depth-item">{strings["menu_nailCare"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/5">
                                                        <span className="link__1depth-item">{strings["menu_colorMakeup"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/6">
                                                        <span className="link__1depth-item">{strings["menu_cleansingPeeling"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/7">
                                                        <span className="link__1depth-item">{strings["menu_mask"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/8">
                                                        <span className="link__1depth-item">{strings["menu_menCosmetics"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/9">
                                                        <span className="link__1depth-item">{strings["menu_sunCare"]}</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                          </>
                                      }  
                            </div>

                            <div className="box__service-all">
                                <ul className="list__service-all">
                                    <li className="list-item"><a href="#" className="link__service" target="" rel="">{strings["best"]}</a></li>
                                    <li className="list-item"><a href="#" className="link__service" target="" rel="">{strings["freeShip"]}</a></li>
                                    <li className="list-item"><a href="#" className="link__service" target="" rel="">{strings["discount"]}</a></li>
                                    <li className="list-item"><a href="#" className="link__service" target="" rel="">{strings["newProduct"]}</a></li>
                                </ul>
                            </div>
                            
                            <div className="box__usermenu">
                                <ul className="list__usermenu">
                                    <li className="list-item"><a href="#" className="link__usermenu" onClick={()=>{handleOpen("signin")}}>{strings["signIn"]}</a></li>
                                    <li className="list-item"><a href="#" className="link__usermenu" onClick={()=>{handleOpen("signup")}}>{strings["signUp"]}</a></li>
                                    <li className="list-item"><a href="#" className="link__usermenu">{strings["serviceSupport"]}</a></li>
                                    <li className="list-item list-item--global">
                                        <button type="button" id="button__usermenu--global" className="button__usermenu sprite__common--after"
                                        aria-controls="simple-menu" aria-haspopup="true" onClick={openChangeLanguage}>Global</button>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleChangeLanguage} id="en">English</MenuItem>
                                            <MenuItem onClick={handleChangeLanguage} id="vi">Tiếng Việt</MenuItem>
                                            <MenuItem onClick={handleChangeLanguage} id="ko">한국어</MenuItem>
                                        </Menu>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                disableEnforceFocus
             >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {
                            authModule=="signin"&&
                                <SignInComponent translation={strings}/>
                        }
                        {
                            authModule=="signup"&&
                                <SignUpComponent translation={strings}/>
                        }
                    </div>
                </Fade>
            </Modal>
        </header>
    );
}

export default connect()(multilanguage(PageHeaderComponent));