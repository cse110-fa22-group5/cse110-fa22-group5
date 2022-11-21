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
            <p class = "lastModified">${note.lastModified}</p>
        `;
    }
}   

customElements.define('dashboard-row', dashboardRow);