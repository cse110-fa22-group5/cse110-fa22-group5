import { existsSync, writeFileSync, readFileSync } from 'fs';

/**
 * Generates a new UUID for a new note to be created.
 * @returns String containing the UUID for the new note.
 */
function generateUUID() {
    const notes = getNotes();
    // To generate a unique ID, we'll take the current date and add random noise to the end.
    const currentTime = Date.now().toString();
    let uuid = currentTime + '-' + Math.random(15).toString(16).slice(2);
    // If the uuid somehow exists as a uuid in our saved notes, we regenerate it.
    while (notes[uuid] !== undefined) {
        uuid = currentTime + '-' + Math.random(15).toString(16).slice(2);
    }
    return uuid;
}

/**
 * Reads in the data from ./notes.json and returns the JSON object there.
 * The JSON object will be in the format:
 * {
 *   "uuid": {
 *     "uuid": "string",
 *     "title": "string",
 *     "lastModified": "string",
 *     "content": "string",
 *   },
 *   ...
 * }
 * where each object corresponds to a note.
 * @returns Object containing all previously saved notes
 */
function getNotes() {
    if (!existsSync('./notes.json')) {
        return {};
    }
    // Read in the contents of ./notes.json and parse it into an object
    const json = JSON.parse(readFileSync('./notes.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        return data;
    }));
    return json;
}

/**
 * Takes in a note and writes it to ./notes.json.
 * If the note already exists, the previous note in ./notes.json is overwritten.
 * Otherwise, a new field is created in ./notes.json which corresponds to our note.
 * 
 * @param {Object} note Object in the form:
 * {
 *   "uuid": "string",
 *   "title": "string",
 *   "lastModified": "string",
 *   "content": "string",
 * }
 */
function saveNote(note) {
    if (!note.uuid) {
        throw 'Error: Note cannot be saved without an UUID!';
    } else if (note.title === undefined || note.lastModified === undefined || note.content === undefined) {
        throw 'Error: Badly formed note in saveNotes';
    }
    const currentNotes = getNotes();
    currentNotes[note['uuid']] = note;
    writeFileSync('./notes.json', JSON.stringify(currentNotes, null, 2));
}

/**
 * Takes in a given note and removes it from the list of given notes,
 * if it exists. It then writes the result to ./notes.json.
 * 
 * @param {Object} note Object in the form:
 * {
 *   "uuid": "string",
 *   "title": "string",
 *   "lastModified": "string",
 *   "content": "string",
 * }
 */
function deleteNote(note) {
    if (!note.uuid) {
        throw 'Error: Note cannot be deleted without an UUID!';
    } else if (note.title === undefined || note.lastModified === undefined || note.content === undefined) {
        throw 'Error: Badly formed note in deleteNote';
    }
    const currentNotes = getNotes();
    if (currentNotes[note.uuid]) {
        delete currentNotes[note.uuid];
        writeFileSync('./notes.json', JSON.stringify(currentNotes, null, 2));
    } else {
        throw 'Error: Note does not exist';
    }
}

const note = {
    "uuid": "2",
    "title": "Title",
    "lastModified": "10/10/2022",
    "content": "Hello there"
};

console.log(generateUUID());
