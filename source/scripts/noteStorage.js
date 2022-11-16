const DBNAME = 'NotesDB';
const OBJECT_STORE_NAME = 'NotesOS';
let db;

/**
 * Sets up and returns a reference to our IndexedDB notes storage.
 * @returns A reference to our IndexedDB notes storage.
 */
function initializeDB(indexedDB) {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
            return;
        }
        
        const openRequest = indexedDB.open(DBNAME);
        openRequest.onupgradeneeded = (event) => {
            db = event.target.result;
            db = e.target.result;
            const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'uuid', autoIncrement: true});

            objectStore.createIndex('title', 'title', { unique: false });
            objectStore.createIndex('lastModified', 'lastModified', { unique: false });
            objectStore.createIndex('content', 'content', { unique: false });
        }

        openRequest.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        }
        
        openRequest.onerror = (event) => {
            reject(`Error opening database! ${event.target.errorCode}`)
        }
    });
}

/**
 * Gets all notes stored in 'NotesDB' from IndexedDB.
 * @param {*} db The initialized indexedDB object
 * @returns A list of note objects.
 */
function getNotesFromStorage(db) {
    return new Promise((resolve, reject) => {
        const objectStore = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);
        const notes = []
        let request = objectStore.openCursor();
        request.onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                notes.push(cursor.value);
                cursor.continue();
            } else {
                resolve(notes);
            }
        }
        request.onerror = (event) => {
            reject(`Error fetching notes from storage: ${event.target.errorCode}`)
        }
    });
}

/**
 * Gets a single note from storage, if it exists.
 * @param {*} db The initialized indexedDB object.
 * @param {*} id UUID of the note.
 * @returns The note object stored with the given UUID.
 */
function getNoteFromStorage(db, id) {
    return new Promise((resolve, reject) => {
        const objectStore = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);
        const request = objectStore.get(id);
        request.onsuccess = (e) => {
            resolve(request.result);
        }
        request.onerror = (e) => {
            reject(`Error fetching note with id ${id} from storage.`);
        }
    });
}

/**
 * Takes the given note and saves it to the database.
 * @param {*} db The initialized indexedDB object.
 * @param {*} note The note object to save.
 * @returns Promise<void>
 */
function saveNoteToStorage(db, note) {
    return new Promise((resolve, reject) => {
        const objectStore = db.transaction(OBJECT_STORE_NAME,'readwrite').objectStore(OBJECT_STORE_NAME);
        const saveNoteRequest = objectStore.put(note, note.uuid);

        saveNoteRequest.onsuccess = (event) => {
            resolve();
        }

        saveNoteRequest.onerror = (event) => {
            reject(`Error saving note with id ${note.uuid} to storage`)
        }
    });
}
/**
 * 
 */
function deleteNoteFromStorage(db,note) {
}

export { initializeDB, getNotesFromStorage, getNoteFromStorage, saveNoteToStorage, deleteNoteFromStorage }