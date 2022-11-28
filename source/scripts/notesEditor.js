import { initializeDB, saveNoteToStorage, getNotesFromStorage, getNoteFromStorage, deleteNoteFromStorage } from "./noteStorage.js";
import { markdown } from "./markdown.js";

window.addEventListener('DOMContentLoaded', init);

/**
 * @description call all the functions after the DOM is loaded, initialize our indexedDB for user notes storage,
 * get notes from storage or add notes to the page, and create our Edit and Save buttons for our note input page.
 * 
 * We check if a note id exists, to indicate whether it is an existing or new note.
 * 
 * We check whether the preview of the window url is set to true, to represent if the user is in view mode or edit
 * mode for a given note.  
 *  
 */
async function init() {
    const db = await initializeDB(indexedDB);
    // detect if there's = in the url
    let url = window.location.href;
    let urlArray = url.split('=');
    let id;
    //if preview is not set to true in url
    if (urlArray.length == 2) {
        id = urlArray[1];
    }
    //if id doesn't exist meaning it's a new note, only edit mode
    if (!id) {
        let noteObject = {
            "title": "Untitled Note",
            "lastModified": `${getDate()}`,
            "content": "", 
        };
        await addNotesToDocument(noteObject);
        initEditToggle(true);
    } else {
        //if id exists meaning it's an existing note, pass preview to enable edit mode button
        id = parseInt(id);
        let note = await getNoteFromStorage(db, parseInt(id));
        await addNotesToDocument(note);
        initEditToggle(false);
    }
    initDeleteButton(id, db);
    initSaveButton(id, db);
}

/**
 * @description get the current date and time for the dashboard 
 * @returns {string} current date in format of mm/dd/yyyy XX:XX XM
 */
function getDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    return `${month}/${day}/${year} at ${time}`;
}

/**
 * @description append the edit or view button to the page
 * @param {boolean} preview true if user is in view only mode or not
 * @param {Integer} id unique uuid of current note
 */
 function initEditToggle(editEnabled) {
    const editButton = document.querySelector('#change-view-button');
    if (editEnabled) {
        editButton.innerHTML = 'Preview';
    } else {
        editButton.innerHTML = 'Edit'
    }
    setEditable(editEnabled);
    editButton.onclick = async () => {
        const editEnabled = editButton.innerHTML === 'Edit';
        setEditable(editEnabled);
        if (editEnabled) {
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
    const saveButton = document.querySelector("#save-button");

    // add event listener to save button
    saveButton.addEventListener('click', () => {
        let title = document.querySelector('#title-input').value;
        let content = document.querySelector('#edit-content').value;
        let lastModified = getDate();
        let noteObject = {
            "title": title,
            "lastModified": lastModified,
            "content": content,
        };
        if (id) {
            noteObject.uuid = id;
        }
        saveNoteToStorage(db, noteObject);
        if (!id) {
            getNotesFromStorage(db).then(res => {
                window.location.href = `./notes.html?id=${res[res.length - 1].uuid}`;
            });
        }
        // window.location.reload();
    });
}

function initDeleteButton(id, db) {
    const deleteButton = document.querySelector("#delete-button");

    deleteButton.addEventListener('click', () => {
        if (id) {
            deleteNoteFromStorage(db, { uuid: id });
        }
        window.location.href = './index.html';
    });
}

/**
 * @description append the notes title, last modified date, and content to page
 * @param {*} note note object with data
 */
async function addNotesToDocument(note) {
    // select html items
    let title = document.querySelector('#notes-title');
    let lastModified = document.querySelector('#notes-last-modified')
    let content = document.querySelector('#edit-content');
    //empty the html items
    // populate html with notes data
    title.innerHTML = '<input type="text" id="title-input" name="title-input">';
    let titleInput = document.querySelector('#title-input');
    titleInput.value = note.title;
    lastModified.innerHTML = `Last Modified: ${note.lastModified}`;
    content.value = `${note.content}`;
}

/**
 * @description disable editing if in view only mode
 * @param {*} editable false if user is in view only mode
 */
async function setEditable(editable) {
    let editContent = document.querySelector('#edit-content');
    let viewContent = document.querySelector('#view-content');
    let titleInput = document.querySelector('#title-input');
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