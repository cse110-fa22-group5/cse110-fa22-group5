import { initializeDB } from './noteStorage'

window.addEventListener('DOMContentLoaded', init);

/**
 * @description call all the functions after the DOM is loaded
 */
function init() {
    //let nodes = getNotes();
    let notes = getNotesFromStorage();
    console.log(indexedDB);
    addNotesToDocument(notes);
    initEventHandler();
}

/**
 * @description For testing purpose, it will create a new note and save it to local storage
 * Retrive all notes from local storage
 * @returns either the notes json data or the empty list
 */
function getNotesFromStorage() {
    const notes =  localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

/**
 * @description For testing purpose, it will save the notes to local storage, Takes in an array of recipes, converts it to a string, and then, saves that string to 'notes' in localStorage
 * @param {Array<Object>} notes An array of notes
 */
function saveNotesToStorage(notes) {
    localStorage.setItem('notes',JSON.stringify(notes));
}

/**
 * @description append the new row to the dashboard in the document
 * @param {Object} notes containing all the notes in the local storage
 */
function addNotesToDocument(notes) {
    let dashboard = document.querySelector('.dashboard');

    notes.forEach(note => {
        let row = document.createElement('dashboard-row');
        row.note = note;
        dashboard.appendChild(row);
    });
}

/**
 * Add necessary event handler for create new note button
 * For testing purpose, it will create a new note and save it to local storage
 */
function initEventHandler(){
    const button = document.querySelector('button')
    const dashboard = document.querySelector('.dashboard');

  // TODO: Get user's input on title name and 
  // navigate to note page in order for the user to write note
    button.addEventListener('click', event => {
    let row = document.createElement('dashboard-row');
    let noteObject = {
      "uuid": "3",
      "title": "Lecture 1",
      "lastModified": "11/8/2022",
      "content": ""
    };

    row.note = noteObject;
    dashboard.appendChild(row);

    // Add notes to storage
    let currentNotes = getNotesFromStorage();
    currentNotes.push(noteObject);
    saveNotesToStorage(currentNotes);
  })
}