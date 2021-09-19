import callApi from '../utils/callApi'

async function login(username, password){
    let user = await callApi("token", 'POST', {UserName : username, Password: password}) ;
    return user;
}

async function register(fullname, email, phone, password, lang){
    let result = await callApi("user/register", 'POST', {
        FullName: fullname,
        Email: email,
        Phone: phone,
        Password: password, 
        Language: lang
    })
    return result;
}

async function saveSelectedLanguage(lang, token){
    let result = await callApi("user/savelanguage", 'POST', {Language: lang}, token)
}

export default {login, register, saveSelectedLanguage}