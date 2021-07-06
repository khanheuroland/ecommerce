import React from "react";
import { HashRouter as Router, Route, Switch} from "react-router-dom";
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import {connect} from "react-redux";
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import DetailPage from './pages/DetailPage'
import FreeshipPage from './pages/FreeshipPage';
import DiscountPage from './pages/DiscountPage';
import NewProducts from "./pages/NewProducts";


class App extends React.Component {
  componentDidMount(){
    this.loadLanguages();
    //store.dispatch(fetchUser())
  }
  loadLanguages(){
    this.props.dispatch(
      loadLanguages({
        languages: {
          vi: require("./translations/vi.json"),
          en: require("./translations/en.json"),
          ko: require("./translations/ko.json")
        }
      })
    )
  }

  render(){
    const {strings, currentLanguageCode} = this.props;
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/category/:catId/:catName" children={<CategoryPage/>}/>
            <Route exact path="/freeship" component={FreeshipPage}/>
            <Route exact path="/discount" component={DiscountPage}/>
            <Route path="/new-products" component={NewProducts}/>
            <Route path="/best-products" component={NewProducts}/>
            <Route path="/product/:id" children={<DetailPage/>}/>
          </Switch>
        </Router>
      </>
    )
  }
}

export default connect()(multilanguage(App));
