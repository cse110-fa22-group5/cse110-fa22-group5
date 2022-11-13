class listItem extends HTMLElement{
    /**
     * create the shadow dom for the list item
     */
    constructor(){
        super();
        let shadow = this.attachShadow({mode: 'open'});
        let note = document.createElement('div');
        note.setAttribute('class', 'note');

        const style = document. createElement('style');
        style.textContent = 
            `.note {
                display: flex;
                flex-direction: row;
                font-family: sans-serif;
                margin: 1px;
                padding: 10px 30px;
                justify-content: space-between;
                background: #9867C5;
                filter: drop-shadow(10px black);
            }
            p {
                color: white;
                font-family: 'Poppins', sans-serif;
                
            }
            .title:hover {
                color: #D6CDF2;
                cursor: pointer;
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

customElements.define('list-item', listItem);