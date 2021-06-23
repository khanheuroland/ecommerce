import React from "react";

function SignUpComponent(props)
{
    const strings = props.translation;
    const langcode = props.langcode;
    const [fullnameValidate, setFullnameValidate] = React.useState(null);
    const [emailValidate, setEmailValidate] = React.useState(null);
    const [phoneValidate, setPhoneValidate] = React.useState(null);
    const [passwordValidate, setPasswordValidate] = React.useState(null);
    const [confirmPasswordValidate, setConfirmPasswordValidate] = React.useState(null);
    const [fullname, setFullname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [password, setPassword]=React.useState("");
    const [confirmPassword, setConfirmPassword]= React.useState("");

    const signUp = (event)=>{
        const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmailValidate(reEmail.test(String(email).toLowerCase()));
        
        const reFullname = /^[a-zA-z\s]+$/
        setFullnameValidate(reFullname.test(String(fullname)));

        const rePhone= /^[0-9]{10}$/
        setPhoneValidate(rePhone.test(String(phone)));

        const rePassword=/^.{6,}$/
        setPasswordValidate(rePassword.test(String(password)));
    }

    return (
        <div className="modal-form">
            <div className="heading">{strings["signup_title"]}</div>
            <form id="auth-block__login-form" className="auth-block__form" method="post">
                <div className="mz-form-group">
                    <div className="mz-form-group__label-col">
                        <div className="mz-form-label">{strings["signup_fullname"]}</div>
                    </div>

                    <div className="mz-form-group__control-col">
                        <div className="mz-form-control mz-form-control-md">
                            <input type="text" className={fullnameValidate==false?"my-form-control error":"my-form-control"} name="fullname" 
                                placeholder={strings["signup_fullname_placeholder"]} autoFocus="true" onChange={(evt)=>{setFullname(evt.target.value);setFullnameValidate(null)}}/>
                            {   fullnameValidate==false &&
                                <label class="mz-form-error-label" for="fullname">{strings["signup_fullname_validate"]}</label>
                            }
                        </div>
                    </div>
                </div>

                <div className="mz-form-group">
                    <div className="mz-form-group__label-col">
                        <div className="mz-form-label">{strings["signup_email"]}</div>
                    </div>

                    <div className="mz-form-group__control-col">
                        <div className="mz-form-control mz-form-control-md">
                            <input type="email" className={emailValidate==false? "my-form-control error": "my-form-control"} name="email" 
                                placeholder={strings["signup_email_placeholder"]} onChange={(evt)=>{setEmail(evt.target.value); setEmailValidate(null)}}/>
                            {
                                emailValidate==false &&
                                <label class="mz-form-error-label" for="email">{strings["signup_email_validate"]}</label>
                            }
                        </div>
                    </div>
                </div>

                <div className="mz-form-group">
                    <div className="mz-form-group__label-col">
                        <div className="mz-form-label">{strings["signup_phone"]}</div>
                    </div>

                    <div className="mz-form-group__control-col">
                        <div className="mz-form-control mz-form-control-md">
                            <input type="text" className={phoneValidate==false?"my-form-control error": "my-form-control"} name="phone" placeholder={strings["signup_phone_placeholder"]} 
                            onChange={(evt)=>{setPhone(evt.target.value);setPhoneValidate(null)}}/>
                            {   
                                phoneValidate==false &&
                                <label class="mz-form-error-label" for="phone">{strings["signup_phone_validate"]}</label>
                            }
                        </div>
                    </div>
                </div>

                <div className="mz-form-group">
                    <div className="mz-form-group__label-col">
                    <div className="mz-flex mz-flex-wrap mz--mx-4">
                        <div className="mz-min-w-0 mz-w-1/2 mz-px-4 mz-form-label">{strings["signin_password"]}</div>
                        <div className="mz-min-w-0 mz-w-1/2 mz-px-4 mz-form-label">{strings["signin_confirm_password"]}</div>
                    </div>
                    </div>

                    <div className="mz-form-group__control-col">
                        <div className="mz-flex mz-flex-wrap mz--mx-4">
                            <div className="mz-min-w-0 mz-w-1/2 mz-px-4">
                            <div className="mz-form-control mz-form-control-md">
                                <input id="auth-block__register-form__password-input" type="password" name="password" className={passwordValidate==false?"my-form-control error":"my-form-control"} 
                                    placeholder={strings["signup_password_placeholder"]} onChange={(evt)=>{setPassword(evt.target.value); setPasswordValidate(null)}}/>
                            </div>
                            </div>

                            <div className="mz-min-w-0 mz-w-1/2 mz-px-4 mz-text-center ">
                            <div className="mz-form-control mz-form-control-md">
                                <input id="auth-block__register-form__confirm-password-input" type="password" className="my-form-control" placeholder={strings["signup_confirm_password_placeholder"]}/>
                            </div>
                            </div>
                            <div className="clear"/>
                        </div>
                        {
                            passwordValidate==false && 
                            <label class="mz-form-error-label" for="password">{strings["signup_password_validate"]}</label>
                        }
                        
                    </div>
                </div>

                <div className="auth-block__btn-group">
                    <button type="button" data-test-login-btn-submit className="my-btn -btn-pill auth-block__signup-btn mz-btn-primary" onClick={signUp}>{strings["signup_register"]}</button>
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
            </div>
        </div>
    )
}

export default SignUpComponent