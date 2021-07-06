import React, { useRef, useEffect } from "react";
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import {connect, useSelector} from "react-redux";
import store from "../store";
import {loginSuccess, openAuthForm, closeAuthForm} from '../reducers/userReducer'
import CircularProgress from '@material-ui/core/CircularProgress';
import userservice from "../services/user.service";
import Alert from '@material-ui/lab/Alert';

function SignInComponent(props)
{
    const useFocus=()=>{
        const htmlElRef=useRef(null);
        const setFocus=()=>{htmlElRef.current && htmlElRef.current.focus()}
        return [htmlElRef, setFocus];
    }
    const strings = props.translation;
    const langcode = props.langcode;

    const [emailvalidate, setEmailValidate] = React.useState(null);
    const [passwordvalidate, setPasswordValidate] = React.useState(null);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginstatus, setLoginStatus] = React.useState(null);
    const [isProcessing, setProcessing] = React.useState(false);
    const [emailRef, setEmailFocus] = useFocus();
    const [passwordRef, setPasswordFocus] = useFocus();
    const updateEmailValue = (event)=>{
        setEmail(event.target.value);
        setEmailValidate(null)
        setLoginStatus(null)
    }
    const updatePasswordValue=(event)=>{
        setPassword(event.target.value);
        setPasswordValidate(null)
        setLoginStatus(null)
    }
    const openSignUp=(event)=>{
        store.dispatch(openAuthForm("signup"));
    }

    const loginStatus = useSelector((state)=>{
        return state.userReducer.loginStatus
    })

    async function signIn(event){
        
        let isValidate = true;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const rePhone= /^[0-9]{10}$/
        if(re.test(String(email).toLowerCase())==false && rePhone.test(email)==false)
        {
            setEmailValidate(false)
            isValidate=false;
            setEmailFocus();
        }
        
        if(password=="")
        {
            setPasswordValidate(false);
            if(isValidate) setPasswordFocus();
            isValidate=false;
        }
        
        if(isValidate)
        {
            setProcessing(true);
            let user = await userservice.login(email, password);
                
            if(user)
            {
                if(user.Token)
                {
                    store.dispatch(loginSuccess(user))
                    store.dispatch(changeLanguage(user.Language))
                }
                else{
                    setLoginStatus(user.Message)
                }
            }
            setProcessing(false);
        }
    }
    

    return (
        <div className="modal-form">
            <div className="heading">{strings["signin_title"]}</div>
            {
                loginstatus=="CREDENTIAL_INVALID" &&
                    <Alert severity="error">{strings["login_invalid_message"]}</Alert>
            }

            {
                loginstatus=="ACCOUNT_IS_INACTIVE"&&
                    <Alert severity="error">{strings["login_account_inactive"].replace("{0}", email)}</Alert>
            }

            {
                loginstatus=="ACCOUNT_IS_NOT_ENABLED"&&
                    <Alert severity="error">{strings["login_account_locked"].replace("{0}", email)}</Alert>
            }
            
            <form id="auth-block__login-form" className="auth-block__form" method="post">
                <div className="mz-form-group">
                    <div className="mz-form-group__label-col">
                        <div className="mz-form-label">{strings["signin_email"]}</div>
                    </div>

                    <div className="mz-form-group__control-col">
                        <div className="mz-form-control mz-form-control-md">
                            <input type="email" id="auth-block__form-group__email" className={emailvalidate==false? "my-form-control error": "my-form-control"} 
                                name="email" placeholder={strings["signin_email_placeholder"]} autoFocus="true" onChange={updateEmailValue} ref={emailRef}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                      signIn();
                                    }
                                  }}
                                />
                            {
                                emailvalidate==false &&
                                <label className="mz-form-error-label" for="auth-block__form-group__email">{strings["signin_validate_email"]}</label>
                            }
                        </div>
                    </div>
                </div>

                <div className="mz-form-group">
                    <div className="mz-form-group__label-col">
                        <div className="mz-form-label">{strings["signin_password"]}</div>
                    </div>

                    <div className="mz-form-group__control-col">
                        <div className="mz-form-control mz-form-control-md">
                            <input type="password" className={passwordvalidate==false? "my-form-control error": "my-form-control"} name="password" 
                            placeholder={strings["signin_password_placeholder"]} onChange={updatePasswordValue} ref={passwordRef} onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                  signIn();
                                }
                              }}
                            />
                            {
                                passwordvalidate==false &&
                                <label className="mz-form-error-label" for="auth-block__form-group__email">{strings["signin_validate_password"]}</label>
                            }
                        </div>
                    </div>
                </div>

                <div className="mz-text-right mz-mt-2">
                    <a href="#" data-toggle="modal" data-test-login-href data-test-forgot-password-link data-target="#request-password-modal">{strings["signin_forgot_password"]}</a>
                </div>

                <div className="auth-block__btn-group">
                    <button type="button" className="my-btn -btn-pill auth-block__login-btn mz-btn-primary" onClick={signIn}>
                        {
                            isProcessing&&
                            <CircularProgress color="white" size={20}/>
                        }
                        <span style={{marginLeft:"10px", marginRight: "10px"}}>{strings["signin_login"]}</span>
                    </button>
                </div>
            </form>

            <div className="auth-block__login-with-segment">
                <div className="auth-block__login-with-segment__title">
                    <span className="auth-block__login-with-segment__title-inner">{strings["signin_login_via"]}</span>
                </div>

                <div className="mz-flex mz-flex-wrap mz--mx-2">
                    <div className="mz-min-w-0 mz-w-1/2 mz-px-2">
                        <a className="auth-block__social-btn -fb" href="javascript:;" onclick="Social.openSocialLogin('https://www.facebook.com/v3.2/dialog/oauth?client_id=379542705504383&amp;state=379145587464e372906d78c7bda309ea&amp;response_type=code&amp;sdk=php-sdk-5.7.0&amp;redirect_uri=https%3A%2F%2Ffado.vn%2Fdang-nhap-bang-mang-xa-hoi-facebook&amp;scope=email%2Cpublic_profile')">
                        <i className="fab fa-facebook-square"></i> Facebook
                        </a>
                    </div>
                    <div className="mz-min-w-0 mz-w-1/2 mz-px-2">
                        <a className="auth-block__social-btn -gp" href="javascript:;" onclick="Social.openSocialLogin('https://accounts.google.com/o/oauth2/auth?response_type=code&amp;access_type=online&amp;client_id=701745402520-dg85nkn87it0untk25e7moq233jauc0p.apps.googleusercontent.com&amp;redirect_uri=https%3A%2F%2Ffado.vn%2Fdang-nhap-bang-mang-xa-hoi-google&amp;state&amp;scope=email%20profile&amp;approval_prompt=auto')">
                        <i className="fab fa-google-plus-square"></i> Google Plus
                        </a>
                    </div>
                </div>
                <div className="clear"/>
                <div className="auth-block__alert-register-field">
                        {strings["signin_dont_have_account"]} <a href="javascript:;" onClick={openSignUp}>{strings["signin_register_now"]}</a>              
                </div>
            </div>
        </div>
    )
}

export default connect()(multilanguage(SignInComponent));