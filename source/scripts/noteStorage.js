const DBNAME = 'NotesDB';
const OBJECT_STORE_NAME = 'NotesOS';
let db;

/**
 * Sets up and returns a reference to our IndexedDB notes storage.
 * @returns A reference to our IndexedDB notes storage.
 */
export function initializeDB(indexedDB) {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
            return;
        }
        const openRequest = indexedDB.open(DBNAME, 1);
        openRequest.onupgradeneeded = (event) => {
            // Set up the database table if it hasn't been initialized yet.
            db = event.target.result;
            const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'uuid', autoIncrement: true});
            objectStore.createIndex('notes', 'notes', { unique: false });
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
export function getNotesFromStorage(db) {
    return new Promise((resolve, reject) => {
        const objectStore = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);
        const notes = []
        let getNotesRequest = objectStore.openCursor();
        getNotesRequest.onsuccess = (event) => {
            // Iterate through all the notes received and add them to be returned.
            let cursor = event.target.result;
            if (cursor) {
                notes.push(cursor.value);
                cursor.continue();
            } else {
                resolve(notes);
            }
        }
        getNotesRequest.onerror = (event) => {
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
export function getNoteFromStorage(db, id) {
    return new Promise((resolve, reject) => {
        const objectStore = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);
        const getNoteRequest = objectStore.get(id);
        getNoteRequest.onsuccess = (e) => {
            resolve(getNoteRequest.result);
        }
        getNoteRequest.onerror = (e) => {
            reject(`Error fetching note with id ${id} from storage.`);
        }
    });
}

/**
 * Takes the given note and saves it to the database. To make a new note,
 * pass in a Note object where the UUID is undefined and a new note will be made.
 * @param {*} db The initialized indexedDB object.
 * @param {*} note The note object to save.
 * @returns Promise<int> The UUID of the newly saved note.
 */
export function saveNoteToStorage(db, note) {
    if (!note.uuid) {
        return new Promise((resolve, reject) => {
            const objectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);
            const saveNoteRequest = objectStore.add(note);
            saveNoteRequest.onsuccess = (event) => {
                console.log(`Successfully saved note with uuid ${saveNoteRequest.result}`);
                console.log(saveNoteRequest.result);
                resolve();
            }
            saveNoteRequest.onerror = (event) => {
                reject(`Error saving new note to storage`)
            }
        });
    } else {
        return new Promise((resolve, reject) => {
            const objectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);
            const saveNoteRequest = objectStore.put(note);
            saveNoteRequest.onsuccess = (event) => {
                console.log(`Successfully saved note with uuid ${saveNoteRequest.result}`);
                resolve(saveNoteRequest.result);
            }
            saveNoteRequest.onerror = (event) => {
                reject(`Error saving note with id ${note.uuid} to storage`)
            }
        });
    }
}

/**
 * Takes the given note and deletes it from storage.
 * @param {*} db The initialized indexedDB object.
 * @param {*} note The note object to delete.
 * @returns Promise<void>
 */
function deleteNoteFromStorage(db, note) {
    return new Promise((resolve, reject) => {
        const objectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);
        const deleteNoteRequest = objectStore.delete(note.uuid);
        deleteNoteRequest.onsuccess = (event) => {
            console.log(`Successfully deleted note with uuid ${saveNoteRequest.result}`);
            resolve();
        }
        deleteNoteRequest.onerror = (event) => {
            reject(`Error deleting note with id ${note.uuid} from storage`)
        }
    });
}