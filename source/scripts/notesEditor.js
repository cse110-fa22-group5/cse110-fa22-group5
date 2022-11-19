import { initializeDB, saveNoteToStorage, getNotesFromStorage, getNoteFromStorage } from "./noteStorage.js";

window.addEventListener('DOMContentLoaded', init);

/**
 * @description call all the functions after the DOM is loaded
 */
async function init() {
    const db = await initializeDB(indexedDB);
    const id = window.location.search.split('=')[1];
    let note = await getNoteFromStorage(db, parseInt(id));
    addNotesToDocument(note);
}

/**
 * pupulate the notes editor with the note data
 * 
 */
async function addNotesToDocument(note) {
    let title = document.querySelector('#notes-title');
    let lastModified = document.querySelector('#notes-last-modified')
    let content = document.querySelector('#notes-content-input');
    
    // put the note title in the title input
    title.innerHTML = note.title;
    lastModified.innerHTML = `${note.lastModified}`;
    content.value = `${note.content}`;
}