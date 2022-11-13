window.addEventListener('DOMContentLoaded', init);

/**
 * call all the functions after the DOM is loaded
 */
function init() {
    //let nodes = getNotes();
    let notes = getNotesFromStorage();
    addNotesToDocument(notes);

    initEventHandler();
}

/**
 * For testing purpose, it will create a new note and save it to local storage
 * Retrive all notes from local storage
 * @returns either the notes json data or the empty list
 */
function getNotesFromStorage() {
    const notes =  localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

/**
 * For testing purpose, it will save the notes to local storage
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'notes' in localStorage
 * @param {Array<Object>} notes An array of notes
 */
function saveNotesToStorage(notes) {
    localStorage.setItem('notes',JSON.stringify(notes));
}

/**
 * append the list items to the list in the document
 * @param {Object} notes containing all the notes in the local storage
 */
function addNotesToDocument(notes) {
    let list = document.querySelector('.list');

    notes.forEach(note => {
        let listItem = document.createElement('list-item');
        listItem.note = note;
        list.appendChild(listItem);
    });
}

/**
 * Add necessary event handler for create new note button
 * For testing purpose, it will create a new note and save it to local storage
 */
function initEventHandler(){
    const button = document.querySelector('button')
    const list = document.querySelector('.list');

  // TODO: Get user's input on title name and 
  // navigate to note page in order for the user to write note
    button.addEventListener('click', event => {
    let listItem = document.createElement('list-item');
    let noteObject = {
      "uuid": "3",
      "title": "Lecture 1",
      "lastModified": "11/8/2022",
      "content": ""
    };

    listItem.note = noteObject;
    list.appendChild(listItem);

    // Add notes to storage
    let currentNotes = getNotesFromStorage();
    currentNotes.push(noteObject);
    saveNotesToStorage(currentNotes);
  })
}