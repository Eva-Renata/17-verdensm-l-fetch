import {myFetch} from "./helper.js";//importing myFetch

const Auth = async () => {
    const username = document.querySelector('#username').value;  //value is what we write in the formular
    const password = document.querySelector('#password').value;
    console.log(username, password);

    //du pakker ind informationerne fra formData i en "ren" data , som er new FormData
    const formData = new FormData();
    formData.append('username', username); 
    formData.append('password', password);
    //we want to save the information that is coming from the formular
    //we want to save it like key and value.
    // where we write in username, is going to be saved in sessionStorage, like 'username'

    //we want to be a POST funktion, that's why method:post
    const options = {
        method: 'POST',
        body: formData //we want to have a body in our post, 
        //and that is the informstion from the form that we sre sending
    }
    // console.log(options);

    const data = await myFetch('https://api.mediehuset.net/token', options);
     console.log(data); //we are seeing our data in the console , also token

     if(data.response.ok) {
        sessionStorage.setItem('authInfo', JSON.stringify(data)); //or 'token'
        location.reload();
     } else {
        form.insertAdjacentHTML('afterend', '<p>Kunne ikke logge ind.</p>')
     }
     
    
    //sessionStorage - information that we save in the browser. it dissapears when we close the window
    //localStorage - info that is saved in local storage (laptop). remains after window close. (until deleted from storage)
}

//eventlistener, når vi klikker på button, så kalder vi funktionen Auth
document.querySelector('#button').addEventListener('click',() => {
    Auth();

    
})
const loginData = JSON.parse(sessionStorage.getItem('token'));

//if we are logged in it appears in console, if not, it appears 'du skal logge ind'
if(loginData && loginData.username) {
    console.log(`Du er logget ind som ${loginData.username}`);
} else {
    console.log('du skal logge ind');
}
