import { initializeDB, saveNoteToStorage, getNotesFromStorage, getNoteFromStorage } from "./noteStorage.js";

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
    if(urlArray.length == 2){
        id = urlArray[1];
    }
    //if id doesn't exist meaning it's a new note, only edit mode
    if (!id){
        let noteObject = {
            "title": "Untitled Note",
            "lastModified": `${getDate()}`,
            "content": "", 
        };
        await addNotesToDocument(noteObject, true);
        addNewNoteButtons(parseInt(id), db);
    } 
    //if id exists meaning it's an existing note, pass preview to enable edit mode button
    else {
        let note = await getNoteFromStorage(db, parseInt(id));
        await addNotesToDocument(note, !preview);
        addEditButton(preview, parseInt(id));
    }
    //show save button in edit mode
    if (!preview) {
        saveNoteButton(parseInt(id), db);
    }
}

/**
 * @description get the current date and time for the dashboard 
 * @returns {string} current date in format of mm/dd/yyyy XX:XX XM
 */
function getDate(){
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    return `${month}/${day}/${year} &nbsp ${time}`;
}

/**
 * @description append the edit button to the page to enable note edit mode
 * @param {boolean} preview true if user is in view only mode or not
 * @param {Integer} id unique uuid of current note
 */
function addEditButton(preview, id){
    if (preview) {
    let editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit-button');
    // add edit button
    let buttonSection = document.querySelector('#option-button');
    editButton.innerHTML = 'Edit';
    buttonSection.appendChild(editButton);
    editButton.addEventListener('click', () => {
        window.location.href = `./notes.html?id=${id}`;
    })
    
    }
}

/**
 * @description append the save button to the page
 * @param {Integer} id unique uuid of current note
 * @param {*} db The initialized indexedDB object.
 */
function saveNoteButton(id, db) {
    // create a save button
    let saveButton = document.createElement('button');
        saveButton.setAttribute('class', 'save-button');
        saveButton.innerHTML = 'Save';
        let buttonSection = document.querySelector('#option-button');
        buttonSection.appendChild(saveButton);
    
    // add event listener to save button
    saveButton.addEventListener('click', () => {
        let title = document.querySelector('#title-input').value;
        let content = document.querySelector('#notes-content-input').value;
        let lastModified = getDate();
        let noteObject = {
            "title": title,
            "lastModified": lastModified,
            "content": content,
        };
        // if the note id exists, update the current noteObject id
        if (id) {
            noteObject.uuid = id;
        } 
        // save this noteObject to storage, new id formed for non existing note
        saveNoteToStorage(db, noteObject);
        if (!id) {
            // update the window for user feedback of saved note
            getNotesFromStorage(db).then(res => {
                window.location.href = `./notes.html?id=${res[res.length - 1].uuid}$preview=true`;
            })
        } else {
            window.location.href = `./notes.html?id=${noteObject.uuid}$preview=true`;
        }
    });
}


/**
 * @description append the notes title, last modified date, and content to page
 * @param {*} note note object with data
 * @param {boolean} editable false if user is in view only mode
 */
async function addNotesToDocument(note, editable) {
    // select html items
    let title = document.querySelector('#notes-title');
    let lastModified = document.querySelector('#notes-last-modified')
    let content = document.querySelector('#notes-content-input');
    //empty the html items
    // populate html with notes data
    title.innerHTML = `<label for="title-input">Title:</label>
        <input type="text" id="title-input" name="title-input">
        `;
    let titleInput = document.querySelector('#title-input');
    titleInput.value = note.title;
    lastModified.innerHTML = `${note.lastModified}`;
    content.value = `${note.content}`;
    // disable editing pages if in view only mode
    await switchEditable(editable);
}

/**
 * @description disable editing if in view only mode
 * @param {*} editable false if user is in view only mode
 */
async function switchEditable(editable) {
    let content = document.querySelector('#notes-content-input');
    let titleInput = document.querySelector('#title-input');
    if (!editable) {
        // make input field uneditable
        title.innerHTML = titleInput.value;
        title.style.pointerEvents = 'none';
        titleInput.setAttribute('hidden', 'true');
       
        lastModified.style.width = 'auto';
        lastModified.style.textAlign = 'center';
        lastModified.style.pointerEvents = 'none';
        // make content textarea uneditable
        content.setAttribute('disabled','disabled');
        // change background color of read/view only mode for user recognition
        content.style.background = 'linear-gradient(-90deg, #7658b1,#D6CDF2)';
    } 
    else{
        titleInput.removeAttribute('disabled');
        content.removeAttribute('readonly');
    }
}