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
                padding: 10px 30px;
                background: #9867C5;
                filter: drop-shadow(10px black);
                
            }
            
            p {
                color: white;
                font-family: 'Poppins', sans-serif;
            }
            
           .note:hover {
                transform: scale(1.05);
                transition: transform .2s;
                cursor: pointer;    
                filter: drop-shadow(0px 0px 10px black);
            }
           .note > div{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 10px 30px;
            }

            .note > div > button{
                margin-left: 2ex;
                display: block;
                content: '';
                height: 3em;
                width: 2.5em;
                background-image: url('./images/trash-can-solid.svg');
            }

            .note > div > button:hover {
                transform: scale(1.05);
                transition: transform .1s;
                cursor: pointer;    
                filter: drop-shadow(0px 0px 2px black);
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
            <div>
                <p class = "lastModified">${note.lastModified}</p>
                <button></button>
            </div>
        `;
        let button = shadow.querySelector('.note > div > button');
        // button.innerHTML = `
        //     <i class="fa fa-trash" aria-hidden="true"></i>
        // `;
        button.addEventListener('click', async ()=>{
            const db = await initializeDB(indexedDB);
            deleteNoteFromStorage(db, note);
            location.reload();
        })
    }
}   

customElements.define('dashboard-row', dashboardRow);
