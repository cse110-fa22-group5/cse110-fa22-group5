<!-- Note taker: Alex Zhang-->
<!-- October 22, 2022-->
# October 2, 2022 Meeting Minutes
​
<!-- 7:00 PM -->
## Time
- Start: 7:00 PM
- End: 8:30 PM
​
<!-- TA or team, etc.-->
## Type of meeting: Brainstorming Session
​
<!-- [x] for present -->
## Attendance:
- [x] Yaya Jiang
- [x] Kevin Lam
- [x] Aaryan Tiwary
- [x] Lauren Lee
- [x] Priya Senthilkumar
- [x] Duy Vu
- [x] Alex Zhang
- [x] Akanksha Pandey
- [x] Zelong Zhou
- [x] Guidong Luo
​
<!-- Topics for the meeting-->
# Agenda
- Complete Brainstorming Assignment
  - Clarifying definitions and requirements
  - Thinking about users and their expectations
  - Deciding on app's themes/mood
  - Surveying competition
​
<!-- homework basically zzzz-->
# Things to do for next meeting:
- TO DO
​
<!-- what was discussed for each topic-->
# Main Ideas:
- Note Taking App
  - Features
    - Must Have
      - Make a new note
      - Save a note
      - Delete a note
      - Edit an existing note
    - Nice to have
      - Share notes
      - Publish notes publicly
        - Public notes dashboard
        - Download other people's notes locally
      - Templates
      - Tags (Classes, professors)
      - Different fonts/colors
      - PDF upload
      - User profiles
      - Comments/Likes
      - User chooses color appearance of the website
      - Search bar
    - Don't need
      - Autocorrect/spellcheck
        - Browser will handle this for us
          - They can get Grammarly otherwise
  - Local
    - Your personal notes
      - Make a new note, edit, view all notes you made, delete
      - On a note, you have the option to publish it publicly
        - Add it to the backend database
          - Database stores all the notes that are on the public dashboard
      - File system
        - /personalfiles
          - Submit the form
            - New note: make a new file under the file system: Note-10-22.txt
            - Previously existing note: update the existing file
          - Delete a note: delete the file
          - Stretch Goal: PDFS
            - if the file is a PDF, we have a special view for it
              - Display PDFS on the note page instead of linking to it
                - iframe displays it, not outside certain browsers
    - Public dashboard (Requires internet connection for users)
      - Get all the items - makes a call to our database and pulls them all up

- Use Cases / User Needs
  - Making quick notes/reminders
    - Want a simple interface
    - Want formatting (like Google Docs)
    - Low loading times
  - Organizing large sets of notes
    - Interface should be able to organize notes
  - Class/Lecture Notes
    - Students take a lot of notes, want to organize them
      - Should be able to distinguish between quick notes and long notes
    - Organize notes by date, store time made/last modified
    - See what other students are taking notes on
      - Sharable with other people, make notes public
    - Most recent notes are easily accessible

- Design themes/mood
  - Simple, not cluttered
  - Dark mode
    - People will use this at night
  - Not blue, white with accent color
  - Light purple (accent color)
  - Responsive, works with different screen sizes/on mobile

- Surveying competition
  - Notability/GoodNotes
    - Pros
      - File system: folders, hierarchical structure
      - Local first, syncs to the cloud after if something goes wrong
      - Search through notes easily
      - Import and write on PDFs
      - Draw pictures and symbols quickly
      - Dual screen
    - Cons
      - Costs money
      - Can't type easily
      - Can't CTRL+F on handwriting
  - Google Docs/Drive
    - Pros
      - Easy to use
      - Easy to collaborate with others
      - Autosaves
      - Need Wi-Fi
      - Can have different types of files
    - Cons
      - Interface is difficult (all notes everywhere)
      - Background is white
      - Formatting is more difficult (have to move cursor up to change bolding, etc.)
      - High on resources (drains battery)
  - Notion
    - Pros
      - Good interface
      - Link to other pages
      - supports Markdown
      - Templates
      - Emojis with each page
      - Database/tables
      - Integrations with other apps (Figma, etc.)
    - Cons
      - Can't change font sizes
      - Need internet
      - High learning curve
  - OneNote
    - Pros
      - Easy to take notes side-by-side with PDF document (lecture slides on the left)
      - Easy to use drawing + text at the same time
      - Easy to sync with different devices
      - Local-first
    - Cons
      - Slow to sync
      - Costs money
      - Can't collaborate easily (most people don't use OneDrive)
      - High on resources (drains battery)
  - Paper and pencil
    - Pros
      - Very local
      - More personal/secure
      - More tactile experience
      - Math symbols and diagrams are easy
    - Cons
      - Need paper and pencil
      - No collaborating
      - Can't type/use keyboard shortcuts (no copy+paste)
  - Takeaways
    - Things our application should prioritize/steal
      - Simple interface
        - Low on resources
        - Intuitive to start using
      - Local-first
        - No need to connect to Wi-Fi
      - User Control
        - User can format/customize their notes easily
          - Bullets, font size, headings, etc.
      - Organizable
        - Easy, compact view
          - Sort/filter notes?
          - Search bar for keywords, tags, labels
      - Multiple file types
        - Images, PDFs, text

- User Flow
  - Should see their local dashboard
    - If empty, prompts the user to make their first note
    - Otherwise, it lists out the notes that the user has and a button to make a new note
    - Search bar, filter and sort to go through all the notes that were made
      - Default sort by most recently edited
  - Also side option to go to the public dashboard
    - The public dashboard looks the same as the local one, but users can't directly make a new note onto the public dashboard
  - New note/blank note
    - Title
    - Date created (automatically set?)
    - Font/color/customizability options (templates if we get there)
    - Tags to add
    - Option to upload PDF or use text (two different tabs)
      - Textarea for text users
      - Upload button for PDFs
    - Save button -> saves the note
      - After you save, the option to publish the note should appear somewhere in the top right
      - Public notes only: The option to save the note to your file system should appear somewhere in the top right
      - Autosave? every 1 minute
        - Stretch goal: track when they stop typing
        - Stretch goal: make this a setting so people can choose if they want to autosave
  - Publish new note
    - Write their name so it can be a field for published notes
  - Stretch goal: Settings Page
    - Pick appearance colors
    - Pick if they want to autosave
    - Presets for new notes