
/**
 * describe() function that contains all E2E testing and user flow for the website
 */
 describe('Basic user flow for Website', () => {
  // First, visit the website
  beforeAll(async () => {
    await page.goto('https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/index.html');
  });
  
  /**
   * Initial the dashboard page, there should be 0 note objects created
   */
  it('Initial Dashboard Page - Check for 0 Note objects', async () => {

    console.log('Checking for 0 Note objects...');
    const numNotes = await page.$$eval('dashboard-row', (noteItems) => {
      return noteItems.length;
    });
    expect(numNotes).toBe(0);

  });

  /**
   * Check to make sure "+ New" button should redirect to the note editor window
   */
  it('Checking to make sure "+ New" button should redirect to note editor page', async () => {
    
    console.log('Checking "+ New" button...');
    const newButton = await page.$('button');
    await newButton.click();
    await page.waitForNavigation(); 
    expect(page.url()).toBe('https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html');

  }, 2500);

  /**
   * Check to make sure the title is initially inputted as "Untitled Note" by default
   */
  it('Checking to make sure the Title is initially inputted as "Untitled Note" on the note editor window', async () => {
    
    console.log('Checking to make sure Title is initially "Untitled Note"');
    const titleText = await page.$eval('#title-input',e => e.value);
    expect(titleText).toBe('Untitled Note')

  }, 2500);

  /**
   * Check to make sure the title input is changed from "Untitled Note" to "Lecture 1 CSE 110"
   */
  it('Check to make sure the title input is changed from "Untitled Note" to "Lecture 1 CSE 110"', async () => {
    
    console.log('Checking to make sure the title input is now "Lecture 1 CSE 110"...');
    var inputTxt = await page.$('#title-input');
    var titleText = await page.$eval('#title-input', e => e.value);
  
    await inputTxt.click({clickCount: 2});
    
    for (var i = 0; i < titleText.length; i++) {
      await page.keyboard.press('Backspace');
    }
    await page.type('#title-input','Lecture 1 CSE 110');
    titleText = await page.$eval('#title-input', e => e.value);
    expect(titleText).toBe('Lecture 1 CSE 110');

      }, 100000);

  /**
   * Check to make sure the Note text area has no input initially
   */
  it('Checking to make sure the Note text area has no input initially', async () => {

    console.log('Checking to make sure the Note text area has no input initially');
    const noteTextArea = await page.$eval('#notes-content-input',e => e.value);
    expect(noteTextArea).toBe('');
  }, 2500);

  /**
   * Check to make sure the title input is changed from "Untitled Note" to "Lecture 1 CSE 110"
   */
    it('Check to make sure the text area input is changed from empty to 5 lines', async () => {

    console.log('Checking to make sure the title input is now "Lecture 1 CSE 110"...');
    var inputTxt = await page.$('#notes-content-input');
    await inputTxt.click({clickCount: 2});
    await page.type('#notes-content-input','Lecture 1 CSE 110. ' +
    'Hello this is my first note!');
    titleText = await page.$eval('#notes-content-input', e => e.value);
    expect(titleText).toBe('Lecture 1 CSE 110. Hello this is my first note!');

  }, 100000);
  /**
   * Check to make sure "Save" button should update note editor page url with unique id of note
   */
  it('Check to make sure "Save" button should redirect to the note view editor mode window', async () => {
    
    console.log('Checking "Save" button...');
    const newButton = await page.$('button');
    await newButton.click();
    await page.waitForNavigation(); 
    expect(page.url()).toBe('https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html?id=1$preview=true');

  }, 2500);

/**
 * Check to make sure after clicking Save the notes-title innerHTML for the title is 'Lecture 1 CSE 110'
 */
    it('Check to make sure after clicking Save the window is in view editor mode and user cannot edit note page', async () => {

    console.log('Checking title input uneditable...');
    const titleText = await page.$eval('#notes-title',e => e.innerHTML);
    console.log(titleText);
    expect(titleText).toBe('Lecture 1 CSE 110');
    
  }, 2500);

/**
 * Check to make sure the element note-content-input attribute 'disabled' exists to indicate no editing note body
 */
  it('Check to make sure the note content body "disabled" attribute is on', async () => {

  console.log('Checking that note content input disabled attribute is on...');
  const notesDisabled = await page.$eval('#notes-content-input',e => e.getAttribute('disabled'));
  expect(notesDisabled).toBe('disabled');
  
}, 2500);  

  /**
 * Check to make sure the "Edit button" is on the page on view mode 
 */
   it('Check to make sure the "Edit button" is on the page on view mode ', async () => {

    console.log('Making sure the "Edit button" is on the page on view mode ...');
    const editButton = await page.$('button');
    const editB = await editButton.getProperty('innerText');
    const editBVal = await editB.jsonValue();
    expect(editBVal).toBe('Edit');
    
  }, 2500);  

  /**
 * Check to make sure when you click the "Edit" button, title is now 'Title: '
 */
    it('Check to make sure when you click the "Edit" button, title is now editable', async () => {

    console.log('Check to make sure title is now editable ...');
    const editButton = await page.$('button');
    await editButton.click();
    await page.waitForNavigation();
    const titleText = await page.$eval('#notes-title',e => e.innerText);
    console.log(titleText);
    expect(titleText).toBe('Title: ');
    
    
  }, 2500);  

/**
 * Check to make sure title is now 'Lecture 1 & Discussion: CSE 110'
 */
    it('Check to make sure title is now "Lecture 1 & Discussion: CSE 110"', async () => {

    var inputTxt = await page.$('#title-input');
    await inputTxt.click({clickCount: 3});
    await page.type('#title-input','Lecture 1 & Discussion: CSE 110');
    var titleText = await page.$eval('#title-input', e => e.value);
    expect(titleText).toBe('Lecture 1 & Discussion: CSE 110');
    
  }, 10000);  

/**
* Check to make sure note body is now: Lecture 1 CSE 110. Hello this is my first note! Adding discussion text
*/
    it('Check to make sure note body is changed', async () => {

    var inputTxt = await page.$('#notes-content-input');
    await inputTxt.click({clickCount: 1});
    await page.type('#notes-content-input',' Adding discussion text');
    var titleText = await page.$eval('#notes-content-input', e => e.value);
    expect(titleText).toBe('Lecture 1 CSE 110. Hello this is my first note! Adding discussion text');
    
  }, 10000);  

  
/**
* Clicking "Save note" to go back to view mode, check preview in the url is false
*/
it('Clicking "Save note" to go back to view mode, check preview in the url is false', async () => {

console.log('Checking window url from "Save" button...');
const newButton = await page.$('button');
await newButton.click();
await page.waitForNavigation(); 
expect(page.url()).toBe('https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html?id=1$preview=true');

}, 10000); 

/**
 * Click "Back" button to be redirected to the note Dashboard url
 */
it('Click "Back" button to be redirected to the note Dashboard url', async () => {

    console.log('Checking window url from "Back" button...');
    const newButton = await page.$('#back-button');
    await newButton.click();
    await page.waitForNavigation(); 
    expect(page.url()).toBe('https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/index.html');

}, 10000); 

 /**
     *  Check if there have 1 note objects created
     */
  it('Check if there have 1 note objects created', async () => {

    console.log('Checking for 1 Note objects...');
    const numNotes = await page.$$eval('dashboard-row', (noteItems) => {
      return noteItems.length;
    });
    expect(numNotes).toBe(1);

  }, 2500);

   /**
   *  Check that our local indexedDB database is populated with the current note
   * 
  
    it('Check that our local indexedDB database is populated with the current note', async () => {

      console.log('Checking local storage (indexedDB)...');

      const localStorage = await page.evaluate( async () => {
        const db = indexedDB.open('NotesDB',1);
        db.onsuccess = function (e) {
          console.log(db.result);
        }
      });
    
      console.log(localStorage);
      expect(localStorage).toEqual([]);
    }, 2500);
*/
    /**
     *  Check if delete button work
     */
    it('Check if delete button work', async () => {

      console.log('Checking for delete...');
      await page.hover('dashboard-row');
      const row = await page.$('dashboard-row');
      const shadow = await row.getProperty('shadowRoot');
      const button = await shadow.$('.note > div > button');
      
      await button.click();
      await page.waitForNavigation(); 

      // there should be not item left
      const numNotes = await page.$$eval('dashboard-row', (noteItems) => {
        return noteItems.length;
      });
      expect(numNotes).toBe(0);

    }, 10000);

  });
