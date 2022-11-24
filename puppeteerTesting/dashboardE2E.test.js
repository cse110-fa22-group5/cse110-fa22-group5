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
    it('Check to make sure "Save" button should redirect to the note editor window', async () => {
      
      console.log('Checking "Save" button...');
      const newButton = await page.$('button');
      await newButton.click();
      await page.waitForNavigation(); 
      expect(page.url()).toBe('https://cse110-fa22-group5.github.io/cse110-fa22-group5/source/notes.html?id=1');

    }, 2500);

  });