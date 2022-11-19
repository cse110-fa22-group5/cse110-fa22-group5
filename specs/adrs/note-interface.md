# Create note page interface

## Context and Problem Statement

- How are users are able to create a new note, edit a note, save a note and delete a note?
- How should the note text area be formatted and the code be structured? 
- How can the users go back to the dashboard home page? 
- How should the text area be colored in reference to the dashboard?
- Should our delete and save buttons have icons?
- Should there be an organizational element for each note?
## Considered Options

- Create a text area attribute, or form attribute with text element
- Create custom labels/ids for title, button and textarea
- Using delete and save icons from the online library, or no icons and only text 
- Using option for the tags, drop down list for organization element
- Set background to transparent or to match dashboard color

## Decision Outcome

- Create a text area attribute which corresponds to our note input body, makes more sense than text as text does not have multiple input. Create custom id for buttons to seperately manipulate buttons from other section of html body
- Create a dropdown list of default tags as opposed to custom tags, in order to prevent errors from non standard inputs
- Use icons to illustrate save and delete button, to add visual representation of save and delete buttons along with their text values
- Text area body can have the same background color as our dashboard interface, but slightly lighter gradient for practical use of text input