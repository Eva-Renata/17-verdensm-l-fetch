//specifikke funktioner

//vi importerer funktionen
import {myFetch} from './helper.js';

const getGoalList = async () => {
    const data = await myFetch('https://api.mediehuset.net/sdg/goals');
     //console.log(data); //her vi kan se resultaten(array)

    // data && data.items.map(function() = hvis data er sandt og data items er sandt og det kan lade sig gøre at mappe
    data.items.map((item,key) => {

        //console.log(data); //vi kan se resultaten i consolen så det er nemmere at se og arbejde med.
        const wrapper = document.createElement('div'); //creating wrapper for the goal
        wrapper.classList.add('goal'); //adding class
        wrapper.style.backgroundColor = `#${item.color}`

        const h2 = document.createElement('h2'); //creating the title
        h2.innerText = item.title;
        wrapper.append(h2); //appending to wrapper
        document.querySelector('.goalcontainer').append(wrapper); //div for all  goals

        const image = document.createElement('div'); //creating div for the svg, to put icons
        image.classList.add('image');
        image.innerHTML = item.icon;
        wrapper.append(image); //appending to wrapper

        const a = document.createElement('a');
        a.innerText = 'Detaljer';
        wrapper.append(a);
        a.addEventListener('click',() => {
            getDetails(item.id);
            //when we click on details and open it, the body can not be scrolled anymore
            document.body.classList.add('noScoll');
        })
    }) 
}
getGoalList();


//getting the details and showing them in a new wrapper that takes 100% of the page
//can be closed with x button
const getDetails = async goal_id => {
    //console.log(goal_id);
    const data = await myFetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);
    console.log(data); //it will console what we click on

    //creating all elements first
    //wrapper of details
    const wrapper = document.getElementById('details');
    wrapper.style.backgroundColor =  `#${data.item.color}`;
    wrapper.innerHTML = '';

    //container in the wrapper
    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    //title
    const title = document.createElement('h2');
    title.innerHTML = data.item.title;

    //icon
    const image = document.createElement('div'); //creating div for the svg, to put icons
    image.innerHTML = data.item.icon;
    container.append(image); //appending to wrapper
   
    //byline
    const byline = document.createElement('h3');
    byline.innerHTML = data.item.byline;

    //image
    const picture = document.createElement('img');
    picture.setAttribute('src',data.item.image)
    
    //description
    const description = document.createElement('p');
    description.innerHTML = data.item.description;

    //close button
    const button = document.createElement('button');
    button.innerText = 'X';
    
    //putting the details in the wrapper
    details.append(container);
    
    //creating targets wrapper
    const targets = document.createElement('div');
    targets.classList.add('targets');

    //displaying the targets
    data.item.targets.forEach( target => {
        const p = document.createElement('p');
        p.innerText = `${target.title}  ${target.description}`;
        targets.append(p);
    })

    //clicking on button we close the details, and body can be scrolled again
    button.addEventListener('click',() => {
        document.body.classList.remove('noScoll');
        wrapper.classList.toggle('active');
    });

    //append them all together in the same time,to wrapper. we append them in same order we want to display
    container.append(title, button, image, byline, description, picture, targets);
    wrapper.classList.toggle('active');
}



