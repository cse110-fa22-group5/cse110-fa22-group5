/**
 * describe() function that contains all E2E testing and user flow for the website
 */
describe('Basic user flow for Website', () => {
  // First, visit the website
  beforeAll(async () => {
    await page.goto(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/index.html'
    );
  });

  /**
   * Initialize the dashboard page, there should be 0 note objects created
   */
  it('Initial Dashboard Page - Check for 0 Note objects', async () => {
    console.log('Checking for 0 Note objects...');
    const numNotes = await page.$$eval(
      'dashboard-row',
      (noteItems) => noteItems.length
    );
    expect(numNotes).toBe(0);
  });

  /**
   * Check to make sure "+ New Note" button should redirect to the note editor window
   */
  it('Checking to make sure "+ New Note" button should redirect to note editor page', async () => {
    console.log('Checking "+ New Note" button...');
    const newButton = await page.$('button');
    await newButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html'
    );
  }, 2500);

  /**
   * Check to make sure the title is initially inputted as "Untitled Note" by default
   */
  it(
    'Checking to make sure the Title is initially inputted as "Untitled Note" on the note'
      + 'editor window',
    async () => {
      console.log('Checking to make sure Title is initially "Untitled Note"');
      const titleText = await page.$eval('#title-input', (e) => e.innerHTML);
      expect(titleText).toBe('');
    },
    2500
  );
  /**
   * Check to make sure the Note text area has no input initially
   */
  it('Checking to make sure the Note text area has no input initially', async () => {
    console.log(
      'Checking to make sure the Note text area has no input initially'
    );
    const noteTextArea = await page.$eval('#edit-content', (e) => e.value);
    expect(noteTextArea).toBe('');
  }, 2500);
  /**
   * Click "Back" button to be redirected to the note Dashboard URL, no confirm alerts
   */
  it('Click "Back" button to be redirected to the note Dashboard URL', async () => {
    console.log('Checking window url from "Back" button...');
    const newButton = await page.$('#back-button');
    await newButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/index.html'
    );
    // go back to the note body page
    const Button = await page.$('button');
    await Button.click();
    await page.waitForNavigation();
  }, 10000);
  /**
   * Check to make sure "Save" button should alert the user to enter a valid title
   */
  it('Check to make sure "Save" button should alert the user to enter a valid title', async () => {
    console.log('Checking "Save" button...');

    const saveButton = await page.$('#save-button');
    await page.evaluate('window.alert = () => true');
    await saveButton.click();
    expect(page.url()).toBe(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html'
    );
  }, 10000);
  /**
   * Check to make sure the title input is "Lecture 1 CSE 110"
   */
  it('Check to make sure the title input is "Lecture 1 CSE 110"', async () => {
    console.log(
      'Checking to make sure the title input is now "Lecture 1 CSE 110"...'
    );
    const inputTxt = await page.$('#title-input');
    let titleText = await page.$eval('#title-input', (e) => e.value);

    await inputTxt.click({ clickCount: 1 });

    await page.type('#title-input', 'Lecture 1 CSE 110');
    titleText = await page.$eval('#title-input', (e) => e.value);
    expect(titleText).toBe('Lecture 1 CSE 110');
  }, 10000);

  /**
   * Click "Back" button should alert user with confirmation to leave since title is modified
   */
  it('Click "Back" button should alert user with confirmation to leave', async () => {
    console.log('Checking window url from "Back" button...');
    const newButton = await page.$('#back-button');
    await page.evaluate('window.confirm = () => false');
    await newButton.click();
    expect(page.url()).toBe(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html'
    );
  }, 10000);

  /**
   * Check to make sure the note text area is changed from "Untitled Note" to "Lecture 1 CSE 110"
   */
  it('Check to make sure the note text area input is changed from empty to 5 lines', async () => {
    console.log(
      'Checking to make sure the title input is now "Lecture 1 CSE 110"...'
    );
    const inputTxt = await page.$('#edit-content');
    await inputTxt.click({ clickCount: 2 });
    await page.type(
      '#edit-content',
      'Lecture 1 CSE 110. Hello this is my first note!'
    );
    const titleText = await page.$eval('#edit-content', (e) => e.value);
    expect(titleText).toBe('Lecture 1 CSE 110. Hello this is my first note!');
  }, 10000);

  /**
   * Click "Back" button should alert user with confirmation to leave since note body is modified
   */
  it('Click "Back" button should alert user with confirmation to leave', async () => {
    console.log('Checking window url from "Back" button...');
    const newButton = await page.$('#back-button');
    await page.evaluate('window.confirm = () => false');
    await newButton.click();
    expect(page.url()).toBe(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html'
    );
  }, 10000);
  /**
   * Click "Back" button should alert user with confirmation to leave since note body is modified
   */
  it('Check to make sure "Save" button should redirect to the note view mode window', async () => {
    console.log('Checking "Save" button...');
    const newButton = await page.$('#save-button');
    await newButton.click();
    expect(page.url()).toBe(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html'
    );
  }, 10000);
  /**
   * Check to make sure after clicking Save the innerHTML for the title is 'Lecture 1 CSE 110'
   */
  it(
    'Check to make sure after clicking Save the window is in view editor mode and user cannot'
      + 'edit note page',
    async () => {
      console.log('Checking title input uneditable...');
      const titleText = await page.$eval('#title-input', (e) => e.value);
      console.log(titleText);
      const titleEditable = await page.$eval('#title-input', (e) => e.disabled);
      expect(titleText).toBe('Lecture 1 CSE 110');
      expect(titleEditable).toBe(true);
      const editTxtOff = await page.$eval('#edit-content', (e) => e.hidden);
      const viewTxtOff = await page.$eval('#view-content', (e) => e.hidden);
      expect(editTxtOff).toBe(true);
      expect(viewTxtOff).toBe(false);
    },
    2500
  );


  /**
   * Check to make sure the element note-content-input attribute
   * 'disabled' exists to indicate no editing note body
   */
  it('Checking that editcontext is hidden and viewcontext is not', async () => {
    console.log(
      'Checking that editcontext is hidden and viewcontext is not...'
    );
    const editTxtOff = await page.$eval('#edit-content', (e) => e.hidden);
    const viewTxtOff = await page.$eval('#view-content', (e) => e.hidden);
    expect(editTxtOff).toBe(true);
    expect(viewTxtOff).toBe(false);
  }, 2500);

  /**
   * Check to make sure the "Edit button" is on the page on view mode
   */
  it('Check to make sure the "Edit button" is on the page on view mode ', async () => {
    console.log(
      'Making sure the "Edit button" is on the page on view mode ...'
    );
    const editButton = await page.$('#change-view-button');
    const editB = await editButton.getProperty('innerText');
    const editBVal = await editB.jsonValue();
    expect(editBVal).toBe('Edit');
  }, 2500);

  /**
   * Check to make sure when you click the "Edit" button, title input is now editable
   */
  it('Check to make sure when you click the "Edit" button, title is now editable', async () => {
    console.log('Check to make sure title is now editable ...');
    const editButton = await page.$('#change-view-button');
    await editButton.click();
    const titleText = await page.$eval('#notes-title', (e) => e.innerHTML);
    console.log(titleText);
    expect(titleText).toBe(
      '<input type="text" id="title-input" placeholder="Untitled Note">'
    );
    const titleOff = await page.$eval('#title-input', (e) => e.disabled);
    console.log(titleOff);
    expect(titleOff).toBe(false);
  }, 1000);

  /**
   * Check to make sure title is now updated to 'Lecture 1 & Discussion: CSE 110'
   */
  it('Check to make sure title is now "Lecture 1 & Discussion: CSE 110"', async () => {
    const inputTxt = await page.$('#title-input');
    await inputTxt.click({ clickCount: 3 });
    await page.type('#title-input', 'Lecture 1 & Discussion: CSE 110');
    const titleText = await page.$eval('#title-input', (e) => e.value);
    expect(titleText).toBe('Lecture 1 & Discussion: CSE 110');
  }, 10000);

  /**
   * Check to make sure note body is updated to:
   * Lecture 1 CSE 110. Hello this is my first note! Adding discussion text
   */
  it('Check to make sure note body is changed', async () => {
    const inputTxt = await page.$('#edit-content');
    await inputTxt.click({ clickCount: 1 });
    await page.type('#edit-content', ' Adding discussion text');
    const titleText = await page.$eval('#edit-content', (e) => e.value);
    expect(titleText).toBe(
      'Lecture 1 CSE 110. Hello this is my first note! Adding discussion text'
    );
  }, 10000);

  /**
   * Clicking "Save note" to go back to view mode
   */
  it('Clicking "Save note" to go back to view mode', async () => {
    console.log('Checking mode from "Save" button...');
    const newButton = await page.$('#save-button');
    await newButton.click();
    const editTxtOff = await page.$eval('#edit-content', (e) => e.hidden);
    const viewTxtOff = await page.$eval('#view-content', (e) => e.hidden);
    expect(editTxtOff).toBe(true);
    expect(viewTxtOff).toBe(false);
  }, 10000);

  /**
   * Click "Back" button after note saved to be redirected to the note Dashboard URL with no alerts
   */
  it('Click "Back" button to be redirected to the note Dashboard URL', async () => {
    console.log('Checking window url from "Back" button...');
    const newButton = await page.$('#back-button');
    await newButton.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/index.html'
    );
  }, 10000);

  /**
   *  Check if there is a note object created
   */
  it('Check if there is a note object created', async () => {
    console.log('Checking for 1 Note objects...');
    const numNotes = await page.$$eval(
      'dashboard-row',
      (noteItems) => noteItems.length
    );
    expect(numNotes).toBe(1);
  }, 2500);

  /**
   * Open an existing note
   */
  it('Open an existing note', async () => {
    console.log('Checking Opening an existing note...');
    await page.click('dashboard-row');
    // checking if in the view mode
    const editTxtOff = await page.$eval('#edit-content', (e) => e.hidden);
    const viewTxtOff = await page.$eval('#view-content', (e) => e.hidden);
    expect(editTxtOff).toBe(true);
    expect(viewTxtOff).toBe(false);

    // checking if get the correct value
    const titleText = await page.$eval('#title-input', (e) => e.value);
    expect(titleText).toBe('Lecture 1 & Discussion: CSE 110');
    const contentText = await page.$eval('#edit-content', (e) => e.value);
    expect(contentText).toBe(
      'Lecture 1 CSE 110. Hello this is my first note! Adding discussion text'
    );

    // back to main page
    const newButton = await page.$('#back-button');
    await newButton.click();
    await page.waitForNavigation();
  }, 10000);

  /**
   *  Check if the delete button in the dashboard works (reject)
   */
  it('Check if delete button in the dashboard works', async () => {
    console.log('Checking for delete button...');
    await page.hover('dashboard-row');
    const row = await page.$('dashboard-row');
    const shadow = await row.getProperty('shadowRoot');
    const button = await shadow.$('.note > div > button');
    // Set the confirm function to automatically return true so we don't need to interact with it
    await page.evaluate('window.confirm = () => false');
    await button.click();

    // there should be no items left
    const numNotes = await page.$$eval(
      'dashboard-row',
      (noteItems) => noteItems.length
    );
    expect(numNotes).toBe(1);
  }, 10000);

  /**
   *  Check if the delete button in the dashboard works (accept)
   */
  it('Check if delete button in the dashboard works', async () => {
    console.log('Checking for delete button...');
    await page.hover('dashboard-row');
    const row = await page.$('dashboard-row');
    const shadow = await row.getProperty('shadowRoot');
    const button = await shadow.$('.note > div > button');
    // Set the confirm function to automatically return true so we don't need to interact with it
    await page.evaluate('window.confirm = () => true');
    await button.click();
    await page.waitForNavigation();

    // there should be no items left
    const numNotes = await page.$$eval(
      'dashboard-row',
      (noteItems) => noteItems.length
    );
    expect(numNotes).toBe(0);
  }, 10000);

  /**
   * Check search bar functionality for Lecture 2
   */
  it('Check search bar functionality', async () => {
    console.log('Check search bar functionality...');

    for (let i = 0; i < 3; i += 1) {
      /* eslint-disable no-await-in-loop */
      // create new note
      const newButton = await page.$('button');
      await newButton.click();
      await page.waitForNavigation();

      // set title
      const TTxt = await page.$('#title-input');
      const titleText = await page.$eval('#title-input', (e) => e.value);
      await TTxt.click({ clickCount: 2 });
      // Clear out the text in the title field
      await Promise.all(
        titleText.split('').map(() => page.keyboard.press('Backspace'))
      );

      await page.type('#title-input', `Lecture ${i + 1} CSE 110`);

      // set content
      const inputTxt = await page.$('#edit-content');
      await inputTxt.click({ clickCount: 2 });
      await page.type('#edit-content', `Lecture ${i + 1}!`);


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
    await search.click({ clickCount: 2 });
    await page.type('#search', 'Lecture 2');
    const numNotes = await page.$$eval(
      'dashboard-row',
      (noteItems) => noteItems.length
    );

    expect(numNotes).toBe(1);
  }, 100000);
  /**
   * Check that the Back button works for an existing note:
   * When title is edited, back button shows alert
   */
  it('Open an existing note', async () => {
    console.log('Checking Opening an existing note...');

    await page.click('dashboard-row');
    const clickEditButton = await page.$('#change-view-button');
    await clickEditButton.click();

    const titleText = await page.$('#title-input');
    await titleText.click({ clickCount: 1 });

    const backButton = await page.$('#back-button');
    await page.evaluate('window.confirm = () => false');
    await backButton.click();
    expect(page.url()).toBe(
      'https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html?id=3'
    );
  }, 100000);
});
