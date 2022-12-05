## Development Timeline

# MVP (Minimum Viable Product) - Local Storage

- Make a new note (Markdown file)
  - Open a new page on the frontend
- Save a note (as a .md file)
  - Save the page's contents to our local file system
- Delete a note
  - Delete the page from the local file system, close the page if open
- Edit an existing note
  - Overwrite the existing page's contents in our local file system
- Frontend Interface
  - On startup, load in previously saved local files
- Bonus: Render/replace markdown text with its formatted equivalents (using Regex/find and replace)
- Bonus: Autosave (setInterval to check for changes, then save the file automatically)
  - Make this a clickable option on the page screen

# Extra Feature 1 (Organization)

- Tags
  - Previously defined tags (Notes, Homework, Lecture Notes) are selectable for each note
- Search
  - We can search/filter notes by typing in a search bar, which looks for tags/title of notes
- Sort
  - We can choose to sort the notes from earliest to latest, latest to earliest, or alphabetically by title
- Font options
  - Add font/color options (From a predefined list)
- Templates
  - Option on make a new note to duplicate a previously existing note
  - Option on dashboard to duplicate a previously existing note

# Extra Feature 2 (Publishing public notes)

- Add database to store public notes
  - Database stores note title, note contents, last modified, author name
- Add public dashboard
  - On initialization, GET notes from the database
- Publish a note
  - POST the existing note to the database
  - Prompt for author name (We will try authentication in a future feature)
- Save a note from the public database
  - Take the public note, save to our local filesystem, and reload our local filesystem

# Extra Feature 3 (Custom tags, Authentication, PDFs)

- Users need to sign in to publish their notes
  - Public notes will have the user associated with it
- Tags are customizable
  - Search/filter only checks for alphanumeric symbols? Makes it more likely to find tags
- Add option to use a PDF file instead of Markdown
  - Upload button (Only accepts PDF Files)
  - Additional view on original page for PDFs

# Extra Feature 4 (Settings, User Profiles)

- Store comments/likes on public notes
- Settings Page
  - Select appearance colors
  - Presets for notes
- User profiles
  - Name, profile picture, previously published notes
