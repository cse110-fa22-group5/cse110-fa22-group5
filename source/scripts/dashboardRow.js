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
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: row;
                font-family: sans-serif;
                justify-content: space-between;
                // width: 100%;
                margin: 1px;
                // padding: 10px 30px;
                padding: 10px;
                background: #9867C5;
                filter: drop-shadow(10px black);
                
            }
            button { 
                // position: absolute;
                display: none;
                margin-left: 10px;
                z-index:2;
            }
            p {
                color: white;
                font-family: 'Poppins', sans-serif;
            }
            .note:hover {
                filter: drop-shadow(0px 0px 10px black);
                source: url('../source/images/trash-can-solid.svg');
                transform: scale(1.05);
                transition: transform .2s;
                cursor: pointer;    
                // padding: 20px 40px;
                // padding: 20px 20px;
                justify-content: space-between;
                display: flex;
                z-index:2;
                
            }
            .note > p{
                padding-left: 20px;
            }
            .note:hover > p{
                padding-left: 40px;
            }
           .note:hover div > button {
                display:block;
                // source: url('../source/images/trash.png');
                background: url('../source/images/trash-can-solid.svg');
                // height: 100%;
                // width: 100%;
                // img {
                //     max-width: 10%;
                //     resize: both;
                //     height: auto;
                // }
                // grid-column-start: 2;
                grid-area: b;
                cursor: pointer;   
                height: 1.7em;
                width: 1.5em; 
                // margin-top: 1.2ex
                // border-style: none;
                
                // filter: drop-shadow(0px 0px 10px black);
                
            }

            .note:hover div > button:hover {
                filter: drop-shadow(0px 0px 5px white);
            }
           .note:hover > div {
                // position: relative;
                // source: url('../source/images/trash-can-solid.svg');
                display: grid;
                // display: flex;
                grid-template-areas: "a b";
                // flex-direction: row;
                justify-content: space-between;
                // padding: 10px 30px;
            }

            .note > div > p {
                padding-right: 20px;
            }

            // .note:hover > div > button {
            //     grid-column-start: 2;
            //     grid-area: a;
            //     // grid-column-end: 3;
            // }

            .note:hover > div > p {
                // grid-column-start: 2;
                grid-area: a;
                padding-right: 10px;
                // margin-left: 10px;
                // grid-column-end: 3;
            }



            .note > div > button {
            //     // source: url('../source/images/trash-can-solid.svg');
            //     // source = url('../source/images/bin.jpg');
            //     margin-left: 2ex;
            //     display: block;
            //     content: '';
            //     height: 3em;
            //     width: 2.5em;
            //     background: transparent;
            //     border-color: transparent;
                border-style: none;
                margin-top: 2.3ex;
                // margin-left: 20px;
            }
            // .note > div > button:hover {
            //     img.src = '../source/images/bin.jpg';
            //     transform: scale(1.05);
            //     transition: transform .1s;
            //     cursor: pointer;    
            //     filter: drop-shadow(0px 0px 2px black);
            // }

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
            <p class = "title">${note.title}</p>
            <div>
                <p class = "lastModified">${note.lastModified}</p>
                <button><img src=''></button>
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
