import React from "react";
import {multilanguage, changeLanguage} from "redux-multilanguage";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect, useSelector} from "react-redux";
import { Link, useHistory } from 'react-router-dom';
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
import UpdateAddressComponent from "./UpdateAddressComponent";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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
    const history = useHistory();
    const {strings, currentLanguageCode} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [profileEl, setProfileEl] = React.useState(null);
    const [showMenu, setShowMenu] = React.useState(null);
    const [openTrackingOrder, setOpenTrackingOrder] = React.useState(false);

    const [isEmpty, setEmptyStatus] = React.useState(false);

    const closeCartEmptyMessage=(event, reason)=>{
        if(reason === 'clickaway')
        {
            return;
        }
        setEmptyStatus(false);
    }

    const handleClickOpenTrackingOrder = () => {
        setOpenTrackingOrder(true);
    };
  
    const handleCloseTrackingOrder = () => {
        setOpenTrackingOrder(false);
    };

    const classes = useStyles();

    const handleOpen = (module) => {
        props.dispatch(openAuthForm(module));
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowMenu(false);
        setProfileEl(null);
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

    const viewHistoryProduct=(event)=>{
        if(userContext.viewedItems.length>0)
        {
            history.push("/viewed");
        }
    }

    const openShoppingCart=(event)=>{
        if(!userContext.profile.Token)
        {
            props.dispatch(openAuthForm("signin"));
        }
        else
        {
            if(userContext.shoppingCart.Items.length==0)
            {
                setEmptyStatus(true);
            }
            else
            {
                history.push("/shoppingcart");
            }
        }
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

    const viewedItems = userContext.viewedItems;

    const categories = useSelector((state)=>{
        return state.configReducer.categories;
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
                                            <input name="keyword" title="????????? ??????" type="text" autoCapitalize="off" spellCheck="false" autoComplete="off" className="form__input" placeholder={strings["searchPlaceHolder"]} autoCorrect="off"/>
                                            <button type="submit" className="button__search">
                                                <img src="/images/image__header-search.png" alt="??????" className="image"/>
                                            </button>
                                        </span>
                                    </fieldset>
                                </form>
                            </div>

                            <div className="box__head-mytools">
                                <ul className="list__mytools">
                                    <li className="list-item list-item--mypage">
                                        <a href="/profile" className="link" title="?????? ????????????">
                                            <img src="//pics.gmarket.co.kr/pc/single/kr/common/image__header-mypage.svg" className="image"/>
                                        </a>
                                    </li>
                                    <li className="list-item list-item--recent">
                                        <button type="button" id="button__recent-layer" className="button" aria-haspopup="listbox" aria-controls="box__recent-layer" title="???????????????" 
                                            onClick={viewHistoryProduct}
                                            >
                                            <img src="//pics.gmarket.co.kr/pc/single/kr/common/image__header-recent.svg" alt="" className="image"/>
                                            {
                                                viewedItems.length>0 &&
                                                <span className="recent-viewed-item">
                                                    <img src={viewedItems.length>0? viewedItems[viewedItems.length-1].Image: ""} alt=""/>
                                                </span>
                                            }
                                            
                                            {
                                                viewedItems.length>0 &&
                                                <span className="box__recent-item">{viewedItems.length}</span>
                                            }
                                        </button>
                                    </li>
                                    <li className="list-item list-item--recent">
                                            <button type="button" id="button__recent-layer" className="button" aria-haspopup="listbox" aria-controls="box__recent-layer" title="???????????? ??????"
                                                onClick={openShoppingCart}>
                                                <img src="//pics.gmarket.co.kr/pc/single/kr/common/image__header-cart.svg" alt="" className="image"/>
                                                <span className="box__recent-item">{userContext.shoppingCart.Items.length}</span>
                                            </button>
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
                                                {
                                                    categories.map((item, index)=>(
                                                        <li className="list-item__1depth">
                                                            <Link to={"/category/"+item.id} onClick={openCategoryMenu}>
                                                                <span className="link__1depth-item">{item.Name[currentLanguageCode.toUpperCase()]}</span>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
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
                                                open={Boolean(profileEl)==true}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={logOut} id="logout">Logout</MenuItem>
                                            </Menu>
                                        </li>
                                    }
                                    <li className="list-item">
                                        <a href="#" className="link__usermenu" onClick={handleClickOpenTrackingOrder}>{strings["trackingorder"]}</a>
                                    </li>
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
                                                <span>Ti???ng Vi???t</span></MenuItem>
                                            <MenuItem onClick={handleChangeLanguage} id="ko">
                                                <CheckIcon fontSize="small" style={{ color: currentLanguageCode=="ko"? "#FF8C0B": "transparent", marginRight:"10px",  visibility: false}}/>
                                                <span>?????????</span></MenuItem>
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
                disablePortal
                disableEnforceFocus
                disableAutoFocus
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
                        {
                            userContext.authForm == "update_address"&&
                                <UpdateAddressComponent translation={strings} langcode={currentLanguageCode}/>
                        }

                    </div>
                </Fade>
            </Modal>

            <Dialog open={openTrackingOrder} onClose={handleCloseTrackingOrder} aria-labelledby="form-dialog-title" maxWidth="xs">
                <DialogTitle id="form-dialog-title">{strings["trackingorder"]}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {strings["strackingorderdes"]}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={strings["signin_email"]}
                        type="email"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="ordercode"
                        label={strings["ordercode"]}
                        type="text"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTrackingOrder} color="primary">
                        {strings["tracking"]}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={isEmpty} anchorOrigin={{vertical:'top', horizontal:'center'}} autoHideDuration={3000} onClose={closeCartEmptyMessage}>
                <Alert severity="info">
                    {strings["cart_empty"]}
                </Alert>
            </Snackbar>
        </header>
    );
}

export default connect()(multilanguage(PageHeaderComponent));