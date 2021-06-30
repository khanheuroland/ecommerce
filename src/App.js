import React from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import {connect} from "react-redux";
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import DetailPage from './pages/DetailPage'


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
        <BrowserRouter>
          <Route exact path="/" component={HomePage}/>
          <Route path="/category/:catId/:catName" children={<CategoryPage/>}/>
          <Route path="/product/:id" children={<DetailPage/>}/>
        </BrowserRouter>
      </>
    )
  }
}

export default connect()(multilanguage(App));
