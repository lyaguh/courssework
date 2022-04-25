// const { base } = require("../Backend/models/user");

const initiate_entrance = document.querySelector('.signup'),
        entrance_window = document.querySelector('.signup_window_hidden'),
        signin_switch = document.querySelector('.win_signin'),
        signup_switch = document.querySelector('.win_signup'),
        signin_form = document.querySelector('.signin_form'),
        signup_form = document.querySelector('.signup_form');
// document.getElementById('logout').addEventListener('click', document.cookie = 'token; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;');


initiate_entrance.addEventListener('click',() => {
    entrance_window.classList.toggle('signup_window_showed')
})

signup_switch.addEventListener('click', ()=> {
    signin_form.hidden = true;
    signup_form.hidden = false;
    signin_switch.style.color = "rgb(90, 90, 90)";
    signup_switch.style.color = "black";
})

signin_switch.addEventListener('click', ()=> {
    signup_form.hidden = true;
    signin_form.hidden = false;
    signup_switch.style.color = "rgb(90, 90, 90)";
    signin_switch.style.color = "black";
})

// const baseUrl = 'http://127.0.0.1:7000/'

// function getToken(ev){
//     fetch(baseUrl + 'auth/signin'
//     // , {
//     //             method:'POST',
//     //             credentials:'include',
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             },
//     //             body: JSON.stringify({
//     //                 login,
//     //                 password
//     //             })
//             // }
//             )
//     .then((res) => {res.json()})
//     .then((payload) => {
//         let token = payload.token
//         localStorage.setItem('token',token)
//     })
//     .catch((err) => console.error)
// }

// function putToken(ev){
//     let token = localStorage.getItem('token')
//     let head = new Headers()
//     head.append('Authorization',`Bearer ${token}`)
//     let url = baseUrl + 'writearticle'
//     let req = new Request(url, {
//         headers: head,
//         method: 'GET'
//     })
// }



// function saveToken(token) {
//     sessionStorage.setItem('tokenData', JSON.stringify(token))
// }

// function getTokenData(login,password) {
//     console.log(baseUrl)
//     return fetch(baseUrl + 'auth/signin', {
//         method:'POST',
//         credentials:'include',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             login,
//             password
//         })
//     }).then((res) => {
//         if (res.status === 200) {
//             const tokenData = res.json();
//             saveToken(JSON.stringify(tokenData));
//             return Promise.resolve()
//         }
        
//         return Promise.reject()
//     })
// }

// async function fetchWithAuth(url, options){
//     const loginUrl = '/'
//     let tokenData = null

//     if (sessionStorage.authToken){
//         tokenData = JSON.parse(localStorage.tokenData)
//     } else {
//         return window.location.replace(loginUrl)
//     }

//     if (!options.headers) {
//         options.headers = {}
//     }

//     if (tokenData) {
//         options.headers.Authorization = `Bearer ${tokenData.token}`
//     }

//     return fetch(url,options)
// }

// function getData(){
//     return fetchWithAuth('/writearticle', options)
// }

