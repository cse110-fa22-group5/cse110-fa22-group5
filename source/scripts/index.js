import { initializeDB, saveNoteToStorage, getNotesFromStorage, getNoteFromStorage } from "./noteStorage.js";

window.addEventListener('DOMContentLoaded', init);

/**
 * @description call all the functions after the DOM is loaded
 */
async function init() {
    const db = await initializeDB(indexedDB);
    const notes = await getNotesFromStorage(db);
    addNotesToDocument(notes);
    await initEventHandler();
}

/**
 * @description append the new row to the dashboard in the document
 * @param {Object} notes containing all the notes in the local storage
 */
function addNotesToDocument(notes) {
    let dashboard = document.querySelector('.dashboard');
    // Clear out the existing rows in the dashboard and refill with our new notes.
    dashboard.innerHTML = `
      <div class="columnTitle">
        <p class="titleCol">Title</p>
        <p class="timeCol">Last Modified</p>
      </div>
      `;

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
async function initEventHandler(){
  const button = document.querySelector('button')
  const dashboard = document.querySelector('.dashboard');
  // TODO: Get user's input on title name and 
  // navigate to note page in order for the user to write note
  button.addEventListener('click', async event => {
    let noteObject = {
      "title": "Lecture 1",
      "lastModified": "11/8/2022",
      "content": ""
    };

    // Add notes to storage
    const db = await initializeDB(indexedDB);
    saveNoteToStorage(db, noteObject);
    addNotesToDocument(await getNotesFromStorage(db));
  })
}