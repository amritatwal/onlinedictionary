let subHeading;
let mainList;
let container = document.querySelector("ol");
let phoneticElement = document.querySelector(".results--phonetic");

// making the text entry box listen for the enter key, which puts entered work into targetWord variable
// variable to target the word entry box
const inputBox = document.getElementById("userInput");

async function getWord() {
    // The target word is appended to the URL in order to recieve data for the specific word inputted by the user 
    const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_GB/${targetWord}`);
    // Handle the error if there is an incorrect word or response !== 200
    if (!data.ok) {
        document.querySelector(".main").style.visibility = "visible";
        handleWordError()
    }
    const response = await data.json();
    document.querySelector(".main").style.visibility = "visible";
    const phonetic = response[0].phonetic;
    const definitions = findDefinitions(response);
    console.log(definitions)
    populateContent(phonetic, definitions);
};

// Locate and store the word's definitions into an initialised empty array
function findDefinitions(data) {
    let listOfdefinitions = [];
    for (let index = 0; index < data.length; index++) {
        listOfdefinitions.push(data[0].meanings[0].definitions[index].definition);
    }
    return listOfdefinitions;
};


// Select the necessary elements whose inner text will be updated with the inputted word
const h3 = document.querySelector("h3");
const p = document.querySelector(".word");


// Amend the inner text of h3 and p to our inputted word oncen the enter key pressed (TODO: or search icon is clicked)
// Once the word is retrieved invoke getWord() 
// The async function will only be invoked if there is a word to fetch data for
inputBox.addEventListener("keyup", handleEnterKey);

function handleEnterKey(e) {
    let word = e.target.value;
    if (e.keyCode === 13) {
        h3.innerText = word;
        p.innerText = word;
        targetWord = e.target.value
        getWord();
    }
};

// Pull through definition info
// The definitions variable contains an array of definitions for the word retrieved
// Take the definitions from this array, and place them into individual list items
function populateContent(word, definitions) {
    clearContents()
    addPhonetic(word);
    for (let i = 0; i < definitions.length; i++) {
        let listItem = document.createElement("li");
        let list = document.querySelector("ol");
        list.appendChild(listItem);    // append list items
        listItem.innerText = definitions[i]  //add information to the items
    }
};

// Retrieve phonetic from data and add to inner text of a p tag
function addPhonetic(phonetic) {
    if (phonetic === undefined) {
        phoneticElement.innerText = "Apologies, no phonetic found.";
    } else {
        phoneticElement.innerText = phonetic;
    }
}

// Clear the currently displayed list of its text, list items, header and phonetic
function clearContents() {
    let oldList = document.querySelectorAll("ol > p, li, h2");
    for (let index = 0; index < oldList.length; index++) {
        oldList[index].remove();
    }
    phoneticElement.innerText = "";
};

// Clear the contents of the data retrieved from the previous fetch request and display a error message to the user 
function handleWordError() {
    clearContents()
    h3.innerText = `I don't think the word exists!`;
    let microphoneIcon = document.querySelector(".material-icons");
    microphoneIcon.display = "hide";
}
