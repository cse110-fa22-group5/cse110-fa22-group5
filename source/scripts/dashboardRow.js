import { initializeDB, deleteNoteFromStorage } from './noteStorage.js';

class dashboardRow extends HTMLElement{
    /**
     * create the shadow dom for the dashboard row
     */
    constructor(){
        super();
        let shadow = this.attachShadow({mode: 'open'});
        let note = document.createElement('div');
        note.setAttribute('class', 'note');
        const style = document.createElement('style');
        style.textContent = 
            `.note {
                display: flex;
                flex-direction: row;
                font-family: sans-serif;
                justify-content: space-between;
                margin: 1px;
                padding: 10px 30px 10px 30px;
                background: #9867C5;
            }
            
            .note > div {
                display: flex;
            }

            .deleteButton { 
                display: none;
                margin-right: 1.5em;
            }

            .note > p, .lastModified {
                color: white;
                font-family: 'Poppins', sans-serif;
            }

            .note:hover {
                filter: drop-shadow(0px 0px 10px black);
                outline: 1px black;
                cursor: pointer;
            }

           .note:hover div > button {
                display:block;
                background: url('../source/images/trash-can-solid.svg');
                cursor: pointer;   
                height: 1.7em;
                width: 1.5em;
            }

            .note:hover div > button:hover {
                filter: drop-shadow(0px 0px 5px white);
            }

            .note > div > button {
                border-style: none;
                margin-top: 2.3ex;
            }
        `;
        
        shadow.append(style);
        shadow.append(note);
        
    }

    /**
     * Set the note property
     * @param {Object} note containing the note data
     */
    set note(note){
        let shadow = this.shadowRoot;
        let noteDiv = shadow.querySelector('.note');
        noteDiv.innerHTML = `
            <p class="title">${note.title}</p>
            <div>
                <button class="deleteButton"></button>
                <p class="lastModified">${note.lastModified}</p>
            </div>
        `;
        let button = shadow.querySelector('.note > div > button');
        button.addEventListener('click', async (event)=>{
            event.stopPropagation();
            const db = await initializeDB(indexedDB);
            deleteNoteFromStorage(db, note);
            location.reload();
        })
        noteDiv.onclick = () => {
            window.location.href = `./notes.html?id=${note.uuid}`;
        }
    }
}   

customElements.define('dashboard-row', dashboardRow);
