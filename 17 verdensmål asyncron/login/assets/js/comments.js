import { myFetch } from "./helper.js";

const root = document.querySelector('#root');
const loginData = JSON.parse(sessionStorage.getItem('authInfo'));


export const CommentList = async () => {
    
    if(loginData && loginData.access_token) {
        //console.log('skulle meget gerne hente liste')
        // console.log('Henter liste af kommentarer');

        const options = {
            method: 'GET',
            headers : {
                'Authorization' : `Bearer ${loginData.access_token}`
            }
        }
        // console.log(options);

        const url = 'https://api.mediehuset.net/sdg/comments'
        const data = await myFetch(url, options);
        // console.log(data);

        const button = document.createElement('button');
        button.innerText = 'Opret ny kommentar';
        button.addEventListener('click', () => {
            commentForm();
        })
        root.append(button);

        const table = document.createElement('table');

        const row_head = document.createElement('tr');

        const th1 = document.createElement('th');
        th1.innerText = 'Title';

        const th2 = document.createElement('th');
        th2.innerText = 'Brødtext';

        const th3 = document.createElement('th');
        th3.innerText = 'Bruger';

        const th4 = document.createElement('th');
        th4.innerText = 'Mål';

        row_head.append(th1, th2, th3, th4);
        table.append(row_head);

        //indexes værdi = item ?
        data && data.items.map((item) => {
            //console.log(item); //THE LIST
            const tr = document.createElement('tr'); //vi laver table row

            const td1 = document.createElement('td');
            td1.innerText = item.title;

            const td2 = document.createElement('td');
            td2.innerText = item.comment;

            const td3 = document.createElement('td');
            td3.innerText = `${item.user.firstname} ${item.user.lastname}`;

            const td4 = document.createElement('td');
            td4.innerText = item.goal_title;

            const td5 = document.createElement('td');
            const del_btn = document.createElement('button'); //laver button til at slette kommentar
            del_btn.innerText = '??';
            del_btn.addEventListener ('click', () => {
                CommentDelete(item.id);
            })
            td5.append(del_btn);
            td5.innerText = 'Slet';

            tr.append(td1, td2, td3, td4, td5);
            table.append(tr);
        })

        //document.querySelector('#root').append(table);  = 
        root.append(table);

    } else {
        console.log('Kan ikke hente liste');
    }
}


//the form where we cab add comments
function commentForm() {
    const formHtml = `<form method="post">
            <input type="hidden" name="goal_id" value="7">
            <input type="hidden" name="active" value="1">

            <label for="title">Title</label>
            <input type="text"  name="title" id="title">

            <label for="comment">comment</label>
            <textarea name="comment" id="comment"></textarea>

            <button type="button" id="send">Gem</button>
        </form>`;

    root.innerHTML = formHtml;
    const form = root.querySelector('form');
    
    //when we press the "gem" button, this will happen
    form.send.addEventListener('click', async () => {
        const title = form.title.value;
        const comment = form.comment.value;
        const goal_id = form.goal_id.value;
        const active = form.active.value; //if i put FormData(form ), then I can delete all these 4 lines

        //pakker ind 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('comment', comment);
        formData.append('goal_id', goal_id);
        formData.append('active', active);  

        const options = {
            method: 'POST',
            body:  formData ,
            headers: {
                Authorization: `Bearer ${loginData.access_token}`
            }
        }
        //console.log(title.comment); //to check if our form fpr adding comments, works

        const url = 'https://api.mediehuset.net/sdg/comments'
        const data = await myFetch(url, options);
        console.log(data);
    })
}

async function CommentDelete(comment_id) {
    const url = `https://api.mediehuset.net/sdg/comments/${comment_id}`;

    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${loginData.access_token}`
        }
    }
    // const data = await myFetch(url, options);
}