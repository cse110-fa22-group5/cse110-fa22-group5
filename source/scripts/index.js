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
    const dashboard = document.querySelector('.dashboardItems');

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
            window.location.href = `./notes.html`;
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
  return notes.sort((note1, note2) => {
    const dateList1 = note1.lastModified.split('/');
    const dateList2 = note2.lastModified.split('/');
    const date1 = new Date(dateList1[2], dateList1[0], dateList1[1]);
    const date2 = new Date(dateList2[2], dateList2[0], dateList2[1]);
    if(sortType === 'asc') {
      return date1 - date2;
    }
    return date2 - date1;
  });
}

/**
 * @description sort the notes by title
 * @param {Array<Object>} notes containing all the notes in the local storage
 * @param {String} sortType the type of sort, either ascending or descending
 * @returns sortedNotes
 */
 function sortNotesByTitle(notes, sortType) {
  return notes.sort((note1, note2) => {
    if(sortType === 'asc') {
      return note1.title.localeCompare(note2.title);
    }
    return note2.title.localeCompare(note1.title);
  });
}

/**
 * @description Return the notes that match the query string. Case insensitive.
 * @param {Array<Object>} notes Array containing all the notes in local storage
 * @param {String} query The search string to filter the notes on
 * @returns filtered notes array
 */
function filterNotesByQuery(notes, query) {
  query = query.toLowerCase();
  return notes.filter((note) => {
    return note.title.toLowerCase().includes(query) || note.lastModified.toLowerCase().includes(query)
  });
}

/**
 * @description Add necessary event handlers for the buttons on page
 */
async function initEventHandler(){
  const button = document.querySelector('button')
  const db = await initializeDB(indexedDB);
  const notes = await getNotesFromStorage(db);
  //navigate to note page in order for the user to write note
  button.addEventListener('click', async event => {
     let noteObject = {
      "title": "Untitled Note",
      "lastModified": "11/20/2022",
      "content": ""
    };

    // Add notes to storage
    saveNoteToStorage(db, noteObject);
    addNotesToDocument(await getNotesFromStorage(db)); 

    window.location.href = `./notes.html`;
  })

  // Handle notes sorting on column header clicks
  const timeColSortArrow = document.querySelector('.timeColSortOrder');
  const titleColSortArrow = document.querySelector('.titleColSortOrder');
  // sort the notes to display in dashboard by last modified date
  const timeCol = document.querySelector('.timeCol');
  let timeSortCount = 0;
  timeCol.addEventListener('click', async event => {
    const direction = timeSortCount % 2 === 0 ? 'asc' : 'desc'
    titleColSortArrow.setAttribute('direction', '');
    timeColSortArrow.setAttribute('direction', direction);
    timeSortCount++;
    addNotesToDocument(sortNotesByTime(notes, direction));
  });

  // sort the notes to display in dashboard by title
  const titleCol = document.querySelector('.titleCol');
  let titleSortCount = 0;
  titleCol.addEventListener('click', async event => {
    const direction = titleSortCount % 2 === 0 ? 'asc' : 'desc'
    timeColSortArrow.setAttribute('direction', '');
    titleColSortArrow.setAttribute('direction', direction);
    titleSortCount++;
    addNotesToDocument(sortNotesByTitle(notes, direction));
  });

  const searchBar = document.querySelector('.searchBar');
  searchBar.addEventListener('input', (event) => {
    console.log(event.target.value);
    addNotesToDocument(filterNotesByQuery(notes, event.target.value));
  })
}




