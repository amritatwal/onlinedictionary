let targetWord;
let savedData;
let wordFromData;
let definitions = []
let subHeading;
let phonetic;
let mainList;
let phoneticText;
let container = document.querySelector("ol");

async function getWord() {
    const dictionaryAPI = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_GB/${targetWord}`)
    if (dictionaryAPI.ok) {
        const data = await dictionaryAPI.json();
        savedData = data;
        console.log(savedData)
        document.querySelector(".main").style.visibility = "visible";
        findDefinitions();
        populateList();
        addPhonetic()
        // createSubHeading();
    } else {
        // Catch the error for missing word 
        document.querySelector(".main").style.visibility = "visible";
        handleWordError()
    }
};


// Function to locate word's definitions 

function findDefinitions() {
    for (let index = 0; index < savedData.length; index++) {
        wordFromData = ((savedData[index]));
        definitions = (wordFromData["meanings"][0]["definitions"]);
    }
};


// making the text entry box listen for the enter key, which puts entered work into targetWord variable
// variable to target the word entry box
const inputBox = document.getElementById("userInput");


// Select 

const h3 = document.querySelector("h3");
// Select p tag with class "word" to update with word 
const p = document.querySelector(".word");

function handleHeader(e) {
    // Read the value from the value property
    let word = e.target.value;
    if (e.keyCode === 13) {
        h3.innerText = word;
        p.innerText = word;
    }
};

// Change h3 to targetWord
inputBox.addEventListener("keyup", handleHeader);


// function for event
function receiveUserWord(event) {
    // take inlineText from the text entry box, and put it in the variable targetWord
    if (event.keyCode === 13) {
        targetWord = event.target.value
        console.log(targetWord);
        getWord();
    }
};

inputBox.addEventListener("keyup", receiveUserWord);


// Pull through definition info from savedData

// definitions variable contains an array of definitions for the word retrieved
// take the definitions from this array, and place them into individual list items

function populateList() {
    clearContents()
    //first, create list items
    for (let i = 0; i < definitions.length; i++) {
        let listItem = document.createElement("li");
        let list = document.querySelector("ol");
        list.appendChild(listItem);    // append list items
        listItem.innerText = definitions[i]["definition"]  //add information to the items
        console.log(definitions[i]["definition"])
        console.log(definitions)
        console.log(listItem)
    }
};


function handleWordError() {
    let errorMessage = document.createElement("p");
    errorMessage.innerText = `I don't think the word "${targetWord}" exists!`;
    container.appendChild(errorMessage);
}

function clearContents() {
    // Clear list
    let oldList = document.querySelectorAll("ol > p, li, h2, .phonetic");
    for (let index = 0; index < oldList.length; index++) {
        oldList[index].remove();
    }
};

// use insertBefore to place an h2 that contains the current word being defined
function createSubHeading() {
    subHeading = document.createElement("h2");
    mainList = document.querySelector("ol");
    let container = document.getElementById("container");
    subHeading.innerText = `${targetWord}:`;
    container.insertBefore(subHeading, mainList);
}

function addPhonetic() {
    phonetic = document.querySelector(".results--phonetic");
    phoneticText = wordFromData["phonetic"];
    phonetic.innerText = phoneticText;
}
