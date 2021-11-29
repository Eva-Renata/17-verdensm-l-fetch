//globale funktioner som kan bruges overalt

//opretter h1 på siden
const h1 = document.createElement('h1');
    h1.innerText = 'De 17 verdensmål';
    document.querySelector('.header').append(h1);


// export function myFetch () {} =
export const myFetch = async (url) => {
    //vi førsøger
    try {
        const response = await fetch(url); //den venter på svar før den gør noget andet
        const result = await response.json(); //vi parser vores data som var hentet. vi parser den
        return result;
    }
    //hvis den ikke lykkedes, så får vi fejl
    catch(err) {
        console.error(`myFetch Error: ${err}`); // det er en god ide at specifikere, hvor vores error kommer fra
    }

}


//opretter footer på siden
const h3 = document.createElement('h3');
h3.innerText = 'FN´s 17 verdensmål for bæredygtig udvikling';
document.querySelector('.footer').append(h3);