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
 * @param {Array<Object>} notes containing all the notes in the local storage
 */
function addNotesToDocument(notes) {
    const dashboard = document.querySelector('.dashboard');

    // Clear out the existing rows in the dashboard
    const dashboardRow = document.querySelectorAll('dashboard-row');
    dashboardRow.forEach(row => {
      row.remove();
    })

    // Repopulate dashboard with new notes
    notes.forEach(note => {
        let row = document.createElement('dashboard-row');
        row.note = note;
        dashboard.appendChild(row);
        row.shadowRoot.querySelector('.title').addEventListener('click', async event => {
            window.location.href = `./notes.html?id=${note.uuid}?preview=true`;
        }); 
    });
}

/**
 * @description sort the notes by last modified date
 * @param {Array<Object>} notes containing all the notes in the local storage
 * @param {String} sortType the type of sort, either ascending or descending
 * @returns sortedNotes
 */
function sortNotesByTime(notes, sortType) {
  let sortedNotes = notes.sort((note1, note2) => {
    const dateList1 = note1.lastModified.split('/');
    const dateList2 = note2.lastModified.split('/');
    const date1 = new Date(dateList1[2], dateList1[0], dateList1[1]);
    const date2 = new Date(dateList2[2], dateList2[0], dateList2[1]);
    if(sortType === 'asc') {
      return date1 - date2;
    }
    return date2 - date1;
  })

  return sortedNotes;
}

/**
 * @description sort the notes by title
 * @param {Array<Object>} notes containing all the notes in the local storage
 * @param {String} sortType the type of sort, either ascending or descending
 * @returns sortedNotes
 */
 function sortNotesByTitle(notes, sortType) {
  const sortedNotes = notes.sort((note1, note2) => {
    if(sortType === 'asc') {
      return note1.title.localeCompare(note2.title);
    }
    return note2.title.localeCompare(note1.title);
  })
  return sortedNotes;
}

/**
 * @description Add necessary event handler for the Create New Note button
 * @param {Array<Object>} notes containing all the notes in the local storage
 */
async function initEventHandler(){
  const button = document.querySelector('button')
  const dashboard = document.querySelector('.dashboard');
  const db = await initializeDB(indexedDB);
  const notes = await getNotesFromStorage(db);
  //navigate to note page in order for the user to write note
  button.addEventListener('click', async event => {
    window.location.href = `./notes.html`;
  })

  // sort the notes to display in dashboard by last modified date
  const timeCol = document.querySelector('.timeCol');
  let timeSortCount = 0;
  timeCol.addEventListener('click', async event => {
    let sortedNotes = sortNotesByTime(notes, timeSortCount % 2 === 0 ? 'asc' : 'desc');
    timeSortCount++;
    addNotesToDocument(sortedNotes);
  });

  // sort the notes to display in dashboard by title
  const titleCol = document.querySelector('.titleCol');
  let titleSortCount = 0;
  titleCol.addEventListener('click', async event => {
    const sortedNotes = sortNotesByTitle(notes, titleSortCount % 2 === 0 ? 'asc' : 'desc');
    titleSortCount++;
    addNotesToDocument(sortedNotes);
  })



}




