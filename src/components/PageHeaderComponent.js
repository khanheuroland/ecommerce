import React from "react";
import {multilanguage, changeLanguage} from "redux-multilanguage";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import {openAuthForm, closeAuthForm, logout} from "../reducers/userReducer";
import userservice from "../services/user.service";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #FF8C0B',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius:10
    },
  }));

function PageHeaderComponent(props) {
    const {strings, currentLanguageCode} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [profileEl, setProfileEl] = React.useState(null);
    const [showMenu, setShowMenu] = React.useState(null);

    const classes = useStyles();

    const handleOpen = (module) => {
        props.dispatch(openAuthForm(module));
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowMenu(false);
        setProfileEl(false);
        props.dispatch(closeAuthForm());
    };

    const openChangeLanguage=(event)=>{
        setAnchorEl(event.currentTarget);
    }

    const openProfile = (event)=>{
        setProfileEl(event.currentTarget);
    }

    const openCategoryMenu=(event)=>{
        setShowMenu(!showMenu);
    }

    const logOut = (event)=>{
        props.dispatch(logout());
    }
    const handleChangeLanguage=(event)=>{
        let selectedItem = event.currentTarget;
        props.dispatch(changeLanguage(selectedItem.id));
        setAnchorEl(null);
        if(userContext.profile.Token!=null)
        {
            userservice.saveSelectedLanguage(selectedItem.id, userContext.profile.Token)
        }
    }

    const userContext = useSelector((state)=>{
        return state.userReducer
    })

    const handleClickAway = () => {
        setShowMenu(false);
    };
    

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
                                <ClickAwayListener onClickAway={handleClickAway}>
                                    <div>
                                <button type="button" id="button__category-all" className="button__category-all sprite__common--before"
                                    aria-controls="main-menu" aria-haspopup="true" onClick={openCategoryMenu}>{strings["allCategories"]}</button>
                                      {
                                        showMenu ?
                                          (
                                            <ul className="list__category-all">
                                                <li className="list-item__1depth">
                                                    <Link to="/category/1/skinCare" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_skinCare"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/2/perfume" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_perfume"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/3/beautyAccessories" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_beautyAccessories"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/4/nailCare" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_nailCare"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/5/colorMakeup" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_colorMakeup"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/6/cleansingPeeling" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_cleansingPeeling"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/7/mask" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_mask"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/8/menCosmetics" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_menCosmetics"]}</span>
                                                    </Link>
                                                </li>
                                                <li className="list-item__1depth">
                                                    <Link to="/category/9/sunCare" onClick={openCategoryMenu}>
                                                        <span className="link__1depth-item">{strings["menu_sunCare"]}</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                          ):null
                                      }
                                      </div>
                                </ClickAwayListener>
                            </div>

                            <div className="box__service-all">
                                <ul className="list__service-all">
                                    <li className="list-item"><Link to="/best-products" className="link__service" target="" rel="">{strings["best"]}</Link></li>
                                    <li className="list-item"><Link to="/freeship" className="link__service" target="" rel="">{strings["freeShip"]}</Link></li>
                                    <li className="list-item"><Link to="/discount" className="link__service" target="" rel="">{strings["discount"]}</Link></li>
                                    <li className="list-item"><Link to="/new-products" className="link__service" target="" rel="">{strings["newProduct"]}</Link></li>
                                </ul>
                            </div>
                            
                            <div className="box__usermenu">
                                <ul className="list__usermenu">
                                    {
                                        userContext.profile.Token==null&&
                                        <li className="list-item"><a href="#" className="link__usermenu" onClick={()=>{handleOpen("signin")}}>{strings["signIn"]}</a></li>
                                    }
                                    {
                                        userContext.profile.Token==null&&
                                        <li className="list-item"><a href="#" className="link__usermenu" onClick={()=>{handleOpen("signup")}}>{strings["signUp"]}</a></li>
                                    }
                                    {
                                        userContext.profile.Token &&
                                        <li className="list-item"><a href="#" className="link__usermenu" aria-controls="profile-menu" aria-haspopup="true" onClick={openProfile}>{strings["hello"]} <b>{userContext.profile.FullName}</b></a>
                                            <Menu
                                                id="profile-menu"
                                                anchorEl={profileEl}
                                                keepMounted
                                                open={Boolean(profileEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={logOut} id="logout">Logout</MenuItem>
                                            </Menu>
                                        </li>
                                    }
                                    <li className="list-item"><a href="#" className="link__usermenu">{strings["serviceSupport"]}</a></li>
                                    <li className="list-item list-item--global">
                                        <button type="button" id="button__usermenu--global" className="button__usermenu sprite__common--after"
                                        aria-controls="language-selection-menu" aria-haspopup="true" onClick={openChangeLanguage}>Global</button>
                                        <Menu
                                            id="language-selection-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleChangeLanguage} id="en">
                                                <CheckIcon fontSize="small" style={{ color: currentLanguageCode=="en"? "#FF8C0B": "transparent", marginRight:"10px"}}/>
                                                <span>English</span>
                                            </MenuItem>
                                            <MenuItem onClick={handleChangeLanguage} id="vi">
                                                <CheckIcon fontSize="small" style={{ color: currentLanguageCode=="vi"? "#FF8C0B": "transparent", marginRight:"10px", visibility: false}}/>
                                                <span>Tiếng Việt</span></MenuItem>
                                            <MenuItem onClick={handleChangeLanguage} id="ko">
                                                <CheckIcon fontSize="small" style={{ color: currentLanguageCode=="ko"? "#FF8C0B": "transparent", marginRight:"10px",  visibility: false}}/>
                                                <span>한국어</span></MenuItem>
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
                open={userContext.authFormOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                disableEnforceFocus
             >
                <Fade in={userContext.authFormOpen}>
                    <div className={classes.paper}>
                        {
                            userContext.authForm=="signin" &&
                                <SignInComponent translation={strings}/>
                        }
                        {
                            userContext.authForm=="signup" && 
                                <SignUpComponent translation={strings} langcode={currentLanguageCode}/>
                        }
                    </div>
                </Fade>
            </Modal>
        </header>
    );
}

export default connect()(multilanguage(PageHeaderComponent));