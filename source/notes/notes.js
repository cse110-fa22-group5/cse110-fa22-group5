import { existsSync, writeFileSync, readFileSync } from 'fs';

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
async function getNotes() {
    if (!existsSync('./notes.json')) {
        return {};
    }
    const json = JSON.parse(await readFileSync('./notes.json', 'utf8', (err, data) => {
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
async function saveNote(note) {
    if (!note.uuid) {
        throw 'Note cannot be saved without an UUID!';
    } else if (note.title !== undefined || note.lastModified !== undefined || content !== undefined) {
        throw 'Badly formed note in saveNotes';
    }
    const currentNotes = await getNotes();
    currentNotes[note['uuid']] = note;
    writeFileSync('./notes.json', JSON.stringify(currentNotes, null, 2));
}

const note = {
       "uuid": "2",
       "title": "Title",
       "lastModified": "10/10/2022",
       "content": "Hello there"
};

saveNote(note);
