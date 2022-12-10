import {
  initializeDB,
  saveNoteToStorage,
  getNotesFromStorage,
  getNoteFromStorage,
  deleteNoteFromStorage,
} from './noteStorage.js';
import markdown from './markdown.js';

/**
 * @description get the current date and time for the dashboard
 * @returns {string} current date in format of mm/dd/yyyy at XX:XX XM
 */
function getDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${month}/${day}/${year} at ${time}`;
}
/**
 * @description Add event listener to back button to alert the
 *              user that changes may not be saved
 */
function initBackButton() {
  const editContent = document.querySelector('#edit-content');
  const titleInput = document.querySelector('#title-input');
  const backButton = document.querySelector('#back-button');
  const saveButton = document.querySelector('#save-button');
  const oldTitleInput = titleInput.value;
  const oldNoteBody = editContent.value;
  function dis() {
    if (
      saveButton.disabled !== true
      && (titleInput.value !== '' || editContent.value !== '')
      && (titleInput.value !== oldTitleInput || oldNoteBody !== editContent.value)
    ) {
      if (
        !window.confirm(
          'Are you sure you want to return to the main dashboard? Your note will not be saved.'
        )
      ) {
        backButton.removeAttribute('href');
      } else {
        backButton.setAttribute('href', './index.html');
      }
    } else {
      backButton.setAttribute('href', './index.html');
    }
  }

  backButton.addEventListener('click', dis);
}
/**
 * @description Switches between edit/view modes on the page
 * @param {*} editable True for edit mode, false for preview mode
 */
function setEditable(editable) {
  const editContent = document.querySelector('#edit-content');
  const viewContent = document.querySelector('#view-content');
  const titleInput = document.querySelector('#title-input');
  if (!editable) {
    viewContent.innerHTML = markdown(editContent.value);
    viewContent.hidden = false;
    editContent.hidden = true;
    titleInput.setAttribute('disabled', true);
  } else {
    editContent.hidden = false;
    viewContent.hidden = true;
    titleInput.removeAttribute('disabled');
  }
}
/**
 * @description Initialize the button that toggles between edit and preview modes
 * @param {boolean} editEnabled True if the note is initially in edit mode, false if in preview mode
 */
function initEditToggle(editEnabled) {
  const editButton = document.querySelector('#change-view-button');
  const saveButton = document.querySelector('#save-button');
  if (editEnabled) {
    editButton.innerHTML = 'Preview';
  } else {
    editButton.innerHTML = 'Edit';
  }
  setEditable(editEnabled);
  editButton.onclick = async () => {
    saveButton.classList.remove('disabled-button');
    saveButton.disabled = false;
    const editActive = editButton.innerHTML === 'Edit';
    setEditable(editActive);
    if (editActive) {
      editButton.innerHTML = 'Preview';
    } else {
      editButton.innerHTML = 'Edit';
    }
  };
}
/**
 * @description append the save button to the page
 * @param {Integer} id unique uuid of current note
 * @param {*} db The initialized indexedDB object.
 */
function initSaveButton(id, db) {
  const saveButton = document.querySelector('#save-button');
  // add event listener to save button
  saveButton.addEventListener('click', () => {
    const title = document.querySelector('#title-input').value.replace(/\s+/g, ' ').trim();
    if (title === '') {
      alert('Please enter a valid title.');
    } else {
      const content = document.querySelector('#edit-content').value;
      const lastModified = getDate();
      const noteObject = {
        title,
        lastModified,
        content,
      };
      if (id) {
        noteObject.uuid = id;
      }
      saveNoteToStorage(db, noteObject);
      if (!id) {
        // Navigate to the saved note page if we're saving a brand new note
        getNotesFromStorage(db).then((res) => {
          window.location.href = `./notes.html?id=${res[res.length - 1].uuid}`;
        });
      }
      // Switch to preview mode
      initEditToggle(false);
      setEditable(false);
      // Disable save button after clicking it
      saveButton.classList.add('disabled-button');
      saveButton.disabled = true;
    }
  });
}

/**
 * @description Deletes the current note and returns to the dashboard.
 * @param {Integer} id unique uuid of current note
 * @param {*} db The initialized indexedDB object.
 */
function initDeleteButton(id, db) {
  const deleteButton = document.querySelector('#delete-button');
  if (!id) {
    deleteButton.classList.add('disabled-button');
    deleteButton.disabled = true;
  }
  deleteButton.addEventListener('click', () => {
    if (id) {
      // Only do this if the id has already been saved;
      // otherwise return directly to the dashboard
      if (window.confirm('Are you sure you want to delete this note?')) {
        deleteNoteFromStorage(db, { uuid: id });
        window.location.href = './index.html';
      }
    }
  });
}

/**
 * @description append the notes title, last modified date, and content to page
 * @param {*} note note object with data
 */
async function addNotesToDocument(note) {
  // select html items
  const title = document.querySelector('#notes-title');
  const lastModified = document.querySelector('#notes-last-modified');
  const content = document.querySelector('#edit-content');
  // empty the html items
  // populate html with notes data
  title.innerHTML = '<input type="text" id="title-input" placeholder = "Untitled Note">';
  const titleInput = document.querySelector('#title-input');
  titleInput.value = note.title;
  lastModified.innerHTML = `Last Modified: ${note.lastModified}`;
  content.value = `${note.content}`;
}

/**
 * @description call all the functions after the DOM is loaded, initialize our indexedDB
 * for user notes storage, get notes from storage or add notes to the page,
 * and create our Edit and Save buttons for our note input page.
 *
 * We check if a note id exists, to indicate whether it is an existing or new note.
 *
 * We check whether the preview of the window url is set to true to represent if the user
 * is in view mode or edit mode for a given note.
 *
 * We disable the save button
 */
async function init() {
  const db = await initializeDB(indexedDB);
  // detect if there's = in the url
  const url = window.location.href;
  const urlArray = url.split('=');
  let id;
  if (urlArray.length === 2) {
    id = urlArray[1];
  }
  // if id doesn't exist meaning it's a new note, only edit mode
  if (!id) {
    const noteObject = {
      title: '',
      lastModified: `${getDate()}`,
      content: '',
    };
    await addNotesToDocument(noteObject);
    initEditToggle(true);
  } else {
    // if id exists meaning it's an existing note, pass preview to enable edit mode button
    id = parseInt(id, 10);
    const note = await getNoteFromStorage(db, parseInt(id, 10));
    await addNotesToDocument(note);
    initEditToggle(false);
    // existing note initial view mode should have disabled save button
    const saveButton = document.querySelector('#save-button');
    saveButton.classList.add('disabled-button');
    saveButton.disabled = true;
  }
  initDeleteButton(id, db);
  initSaveButton(id, db);
  initBackButton();
}

window.addEventListener('DOMContentLoaded', init);
