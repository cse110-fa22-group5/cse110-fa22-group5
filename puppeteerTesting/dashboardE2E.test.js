
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
    const noteTextArea = await page.$eval('#edit-content',e => e.value);
    expect(noteTextArea).toBe('');
  }, 2500);

  /**
   * Check to make sure the title input is changed from "Untitled Note" to "Lecture 1 CSE 110"
   */
    it('Check to make sure the text area input is changed from empty to 5 lines', async () => {

    console.log('Checking to make sure the title input is now "Lecture 1 CSE 110"...');
    var inputTxt = await page.$('#edit-content');
    await inputTxt.click({clickCount: 2});
    await page.type('#edit-content','Lecture 1 CSE 110. ' +
    'Hello this is my first note!');
    titleText = await page.$eval('#edit-content', e => e.value);
    expect(titleText).toBe('Lecture 1 CSE 110. Hello this is my first note!');

  }, 100000);
  /**
   * Check to make sure "Save" button should update note editor page url with unique id of note
   */
  it('Check to make sure "Save" button should redirect to the note view editor mode window', async () => {
    
    console.log('Checking "Save" button...');
    const newButton = await page.$('#save-button');
    await newButton.click();
    await page.waitForNavigation(); 
    expect(page.url()).toBe('https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html?id=1');
    const titleEditable = await page.$eval('#title-input',e => e.disabled);
    expect(titleEditable).toBe(true);

  }, 2500);

/**
 * Check to make sure after clicking Save the notes-title innerHTML for the title is 'Lecture 1 CSE 110'
 */
    it('Check to make sure after clicking Save the window is in view editor mode and user cannot edit note page', async () => {

    console.log('Checking title input uneditable...');
    const titleText = await page.$eval('#title-input',e => e.value);
    console.log(titleText);
    const titleEditable = await page.$eval('#title-input',e => e.disabled);
    expect(titleText).toBe('Lecture 1 CSE 110');
    expect(titleEditable).toBe(true);
    var editTxtOff = await page.$eval('#edit-content', e => e.hidden);
    var viewTxtOff = await page.$eval('#view-content', e => e.hidden);
    expect(editTxtOff).toBe(true);
    expect(viewTxtOff).toBe(false);
    
  }, 2500);

/**
 * Check to make sure the element note-content-input attribute 'disabled' exists to indicate no editing note body
 */
  it('Checking that editcontext is hidden and viewcontext is not', async () => {

  console.log('Checking that editcontext is hidden and viewcontext is not...');
  var editTxtOff = await page.$eval('#edit-content', e => e.hidden);
  var viewTxtOff = await page.$eval('#view-content', e => e.hidden);
  expect(editTxtOff).toBe(true);
  expect(viewTxtOff).toBe(false);
  
}, 2500);  

  /**
 * Check to make sure the "Edit button" is on the page on view mode 
 */
   it('Check to make sure the "Edit button" is on the page on view mode ', async () => {

    console.log('Making sure the "Edit button" is on the page on view mode ...');
    const editButton = await page.$('#change-view-button');
    const editB = await editButton.getProperty('innerText');
    const editBVal = await editB.jsonValue();
    expect(editBVal).toBe('Edit');
    
  }, 2500);  

  /**
 * Check to make sure when you click the "Edit" button, title is now 'Title: '
 */
    it('Check to make sure when you click the "Edit" button, title is now editable', async () => {

    console.log('Check to make sure title is now editable ...');
    const editButton = await page.$('#change-view-button');
    await editButton.click();
    const titleOff = await page.$eval('#title-input',e => e.disabled);
    console.log(titleOff);
    expect(titleOff).toBe(false);
    
    
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

    var inputTxt = await page.$('#edit-content');
    await inputTxt.click({clickCount: 1});
    await page.type('#edit-content',' Adding discussion text');
    var titleText = await page.$eval('#edit-content', e => e.value);
    expect(titleText).toBe('Lecture 1 CSE 110. Hello this is my first note! Adding discussion text');
    
  }, 10000);  

  
/**
* Clicking "Save note" to go back to view mode
*/
it('Clicking "Save note" to go back to view mode', async () => {

console.log('Checking mode from "Save" button...');
const newButton = await page.$('#save-button');
await newButton.click();
let editTxt = await page.$('#edit-content');
let viewTxt = await page.$('#view-content');
var editTxtOff = await page.$eval('#edit-content', e => e.hidden);
var viewTxtOff = await page.$eval('#view-content', e => e.hidden);
expect(editTxtOff).toBe(true);
expect(viewTxtOff).toBe(false);

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
   * Open an exist note
   */
    it('Open an exist note', async () => {

      console.log('Checking for Opening an exist note...');
      await page.click('dashboard-row');
      // checking if in the view mode
      var editTxtOff = await page.$eval('#edit-content', e => e.hidden);
      var viewTxtOff = await page.$eval('#view-content', e => e.hidden);
      expect(editTxtOff).toBe(true);
      expect(viewTxtOff).toBe(false);

      // checking if get the correct value
      var titleText = await page.$eval('#title-input', e => e.value);
      expect(titleText).toBe('Lecture 1 & Discussion: CSE 110');
      var contentText = await page.$eval('#edit-content', e => e.value);
      expect(contentText).toBe('Lecture 1 CSE 110. Hello this is my first note! Adding discussion text');

      // back to main page
      const newButton = await page.$('#back-button');
      await newButton.click();
      await page.waitForNavigation(); 
  
    }, 10000);
  

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

    /**
     * Check for search
     */
    it('Check for search', async () => {
      
      console.log('Check for search...');

      for (let i = 0; i < 3; i++){
        // create new note
        const newButton = await page.$('button');
        await newButton.click();
        await page.waitForNavigation(); 

        // set title 
        let TTxt = await page.$('#title-input');
        var titleText = await page.$eval('#title-input', e => e.value);
        await TTxt.click({clickCount: 2});
        for (let j = 0; j < titleText.length; j++) {
          await page.keyboard.press('Backspace');
        }
        await page.type('#title-input',`Lecture ${i+1} CSE 110`);

        // set content
        var inputTxt = await page.$('#edit-content');
        await inputTxt.click({clickCount: 2});
        await page.type('#edit-content',`Lecture ${i+1} CSE 110. ` +
        `Hello this is my ${i+1} note!'`);

        // save the note
        const saveButton = await page.$('#save-button');
        await saveButton.click();
        await page.waitForNavigation();

        // back to main page
        const backButton = await page.$('#back-button');
        await backButton.click();
        await page.waitForNavigation(); 
      }

      // search Lecture 2
      const search = await page.$('#search');
      await search.click({clickCount: 2});
      await page.type('#search', 'Lecture 2');
      const numNotes = await page.$$eval('dashboard-row', (noteItems) => {
        return noteItems.length;
      });
      expect(numNotes).toBe(1);

    }, 100000);

    

  });
