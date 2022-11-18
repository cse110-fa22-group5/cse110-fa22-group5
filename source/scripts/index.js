import { initializeDB, saveNoteToStorage, getNotesFromStorage, getNoteFromStorage } from "./noteStorage.js";

window.addEventListener('DOMContentLoaded', init);

/**
 * @description call all the functions after the DOM is loaded
 */
async function init() {
    const db = await initializeDB(indexedDB);
    const notes = await getNotesFromStorage(db);
    addNotesToDocument(notes);
    await initEventHandler(notes);
}

/**
 * @description append the new row to the dashboard in the document
 * @param {Array<Object>} notes containing all the notes in the local storage
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
        row.shadowRoot.querySelector('.title').addEventListener('click', async event => {
            window.location.href = `./notes/notes.html`;
        });

    });

}
/**
 * @description sort the notes by last modified date
 * @param {Array<Object>} notes containing all the notes in the local storage
 * @param {String} sortType the type of sort, either ascending or descending
 * @returns sortedNotes
 */
function sortNotes(notes, sortType) {
  let sortedNotes = notes.sort((note1, note2) => {
    let time1 = note1.lastModified.split('/');
    let time2 = note2.lastModified.split('/');
    let date1 = new Date(time1[2], time1[0], time1[1]);
    let date2 = new Date(time2[2], time2[0], time2[1]);
    if(sortType === 'asc') {
      return date1 - date2;
    }
    if(sortType === 'desc') {
      return date2 - date1;
    }
  }
  )

  return sortedNotes;
}



/**
 * @description Add necessary event handler for the Create New Note button
 * @param {Array<Object>} notes containing all the notes in the local storage
 */
async function initEventHandler(notes){
  const button = document.querySelector('button')
  const dashboard = document.querySelector('.dashboard');
  // TODO: Get user's input on title name and 
  // navigate to note page in order for the user to write note
  button.addEventListener('click', async event => {
    let noteObject = {
      "title": "New Note",
      "lastModified": "01/01/2021",
      "content": ""
    };

    // Add notes to storage
    const db = await initializeDB(indexedDB);
    saveNoteToStorage(db, noteObject);
    addNotesToDocument(await getNotesFromStorage(db));

    /* window.location.href = `./notes/notes.html`; */
  })

  // sort the notes to display in dashboard by last modified date
  const timeCol = document.querySelector('.timeCol');
  let count = 0;
  timeCol.addEventListener('click', async event => {
    let dashboardRow = document.querySelectorAll('dashboard-row');
    dashboardRow.forEach(row => {
      row.remove();
    })
    let sortedNotes = sortNotes(notes, count % 2 === 0 ? 'asc' : 'desc');
    count++;
    notes.forEach(note => {
      let row = document.createElement('dashboard-row');  
      row.note = note;
      dashboard.appendChild(row);
      row.shadowRoot.querySelector('.title').addEventListener('click', async event => {
          window.location.href = `./notes/notes.html`;
      });
  });
  })
 
  



}




