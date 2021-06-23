import React from "react";

function SignInComponent(props)
{
    const strings = props.translation;
    const langcode = props.langcode;

    const [emailvalidate, setEmailValidate] = React.useState(null);
    const [passwordvalidate, setPasswordValidate] = React.useState(null);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const updateEmailValue = (event)=>{
        setEmail(event.target.value);
        setEmailValidate(null)
    }
    const updatePasswordValue=(event)=>{
        setPassword(event.target.value);
        setPasswordValidate(null)
    }
    const signIn = (event)=>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmailValidate(re.test(String(email).toLowerCase()));
        
        if(password=="")
        {
            setPasswordValidate(false);
        }
    }

    return (
        <div className="modal-form">
            <div className="heading">{strings["signin_title"]}</div>
            <form id="auth-block__login-form" className="auth-block__form" method="post">
                <div className="mz-form-group">
                    <div className="mz-form-group__label-col">
                        <div className="mz-form-label">{strings["signin_email"]}</div>
                    </div>

                    <div className="mz-form-group__control-col">
                        <div className="mz-form-control mz-form-control-md">
                            <input type="email" id="auth-block__form-group__email" className={emailvalidate==false? "my-form-control error": "my-form-control"} 
                                name="email" placeholder={strings["signin_email_placeholder"]} autoFocus="true" onChange={updateEmailValue}/>
                            {
                                emailvalidate==false &&
                                <label class="mz-form-error-label" for="auth-block__form-group__email">{strings["signin_validate_email"]}</label>
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
                            placeholder={strings["signin_password_placeholder"]} onChange={updatePasswordValue}/>
                            {
                                passwordvalidate==false &&
                                <label class="mz-form-error-label" for="auth-block__form-group__email">{strings["signin_validate_password"]}</label>
                            }
                        </div>
                    </div>
                </div>

                <div className="mz-text-right mz-mt-2">
                    <a href="#" data-toggle="modal" data-test-login-href data-test-forgot-password-link data-target="#request-password-modal">{strings["signin_forgot_password"]}</a>
                </div>

                <div className="auth-block__btn-group">
                    <button type="button" className="my-btn -btn-pill auth-block__login-btn mz-btn-primary" onClick={signIn}>{strings["signin_login"]}</button>
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
                        {strings["signin_dont_have_account"]} <a data-test-register-link="" href="/dang-ky-thanh-vien?redirect=https%3A%2F%2Ffado.vn%2F">{strings["signin_register_now"]}</a>              
                </div>
            </div>
        </div>
    )
}

export default SignInComponent