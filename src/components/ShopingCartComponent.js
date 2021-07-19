import React from 'react';
import { useSelector, connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import FlashSaleItem from '../components/FlashSaleItem';
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

var data = require('../assets/dumpdata.json');
const ShopingCartComponent = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const handleClose = () => {
        setOpen(false);
    };

    const products = useSelector((state)=>{
        return data.Products.filter(c=>c.tag=='new') ;//state.configReducer.popularProducts
    })
    const {strings, currentLanguageCode} = props;
    return (
        <>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                        Quản lý giỏ hàng
                        </Typography>
                        <Button color="inherit" onClick={handleClose}>
                        Thanh toán
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={2} style={{height: "100%"}}>
                    <Grid item xs={9} style={{width: "80%", padding: "20px"}}>
                    <div className="section__main section__main-category">
                        <div className="section__main-inner">
                            <div className="box__superdeal">
                                <div className="box__item">
                                    <ul className="list__item">
                                        {
                                            products.map((item, index)=>(
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
                    </Grid>
                    <Grid item xs={3} style={{padding: "20px", borderLeft: "solid 1px #CCC"}}>
                        <p>Right panel</p>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};

export default connect()(multilanguage(ShopingCartComponent));