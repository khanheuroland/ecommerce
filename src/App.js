import React from "react";
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import {connect} from "react-redux";
import HomePage from './pages/HomePage'

class App extends React.Component {
  componentDidMount(){
    this.loadLanguages();
    //this.props.dispatch(changeLanguage("vi"))
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
      <HomePage/>
    )
  }
}

export default connect()(multilanguage(App));
