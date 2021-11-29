import { CommentList } from "./comments.js";
import {myFetch} from "./helper.js";//importing myFetch


//creating the html that will appear if you have to log in 
const loginHtml =` <fieldset>
                    <form method="post">
                        <label for="name">Username</label>
                        <input type="text" placeholder="Username" name="username" id="username"  value="evrb" required>

                        <label for="password">Password</label>
                        <input type="password" placeholder="Password" name="password" id="password" value="eva" required>

                        <button type="button" id="button">Send</button>
                    </form>
                    </fieldset>`;
//creating the html that will appear if you are logged in
const logoutHtml =`<div>
                    <p>Du er logget på som brugernavn</p>
                    <button id="logout">Log out</button>
                </div>`;

const Auth = async () => {
    //henter authInfo from sessionStorage
    const loginData = JSON.parse(sessionStorage.getItem('authInfo'));

    //henter html element
    const root = document.querySelector('#root');

    //hvis login data er ikke udfyldt, altså vi er ikke logget ind, så html viser loginHtml
    if(!loginData) {
        root.innerHTML = (loginHtml);

        const form = root.querySelector('form');
        // console.log(form.button);

        //adding eventlistener on button on the login form
        form.button.addEventListener('click', async () => {
            const username = form.username.value;
            const password = form.password.value;
            //console.log(username, password) //så vi kan se username,password

            //vi tjekker om username er udfyldt, hvis ikke, kommer alert
            if(!username) {
                alert('Du skal udfylde dit brugernavn');
                form.username.focus();
                return false;
            }
            //vi tjekker om password er udfyldt, hvis ikke, kommer alert
            if(!password) {
                alert('Du skal udfylde password');
                form.password.focus();
                return false;
            }

            const formData = new FormData(); //pakker ind informationerne vi har fået fra at taste ind
            formData.append('username', username);
            formData.append('password', password);

            //deklarerer option objekt
            const options = {
                method: 'POST',
                body: formData
            }

            //fetcher api endpoint med url og options
            const data = await myFetch('https://api.mediehuset.net/token', options);
            //console.log(data); // here we can see the bruger with token and all info

            //hvis der ikke er fejlmeddelse
            if(data.response.ok) {
                //gemmer json object som string i session storage
                sessionStorage.setItem('authInfo', JSON.stringify(data));
                //reloader site
                location.reload();
                //we reload the page so we see the result of logged in/out.
                // otherwise html would not change and we don´t see clearly if we are logged in
            } else {
                //promter fejl besked
                form.insertAdjacentHTML('afterend', '<p>Kunne ikke logge ind.</p>')
            }
            

        })

    } else {
        //hvis vi er logget ind, så får vilogout informationerne
        root.innerHTML = (logoutHtml);
        const button = root.querySelector('button');
        //eventlistener on the button, to log out. (after you pressed ok for confirm)
       button.addEventListener('click', () => {
           
            if(confirm('Vil du logge ud?')) {
                sessionStorage.removeItem('authInfo');
                //location.reload(); //clearing the location, so it is logging out
                //reload funktion can also be "Auth();"
                Auth();
                CommentList();
            }
       })
    }
    // console.log(loginData);

}
Auth();
CommentList(); //hente kommentarer