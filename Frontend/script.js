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
