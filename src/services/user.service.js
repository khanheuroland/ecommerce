import callApi from '../utils/callApi'

async function login(username, password){
    let user = await callApi("token/?username="+ username + "&password="+ password) ;
    return user;
}

async function register(fullname, email, phone, password, lang){
    let result = await callApi("user", 'POST', {
        FullName: fullname,
        Email: email,
        Phone: phone,
        Password: password, 
        Language: lang
    })
    return result;
}

export default {login, register}