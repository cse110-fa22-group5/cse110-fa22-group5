# Create, read, update, and delete a note feature

## Context and Problem Statement

How to implement the local first software functionality, local storage or local machine? What functionalities are needed? Where and how should the notes be stored?

## Considered Options
- Local Storage (Lab 6)
- Directly on the machine (in a file)
  - .json file or .md or .txt file

## Decision Outcome

We decided to store the notes directly on the machine. Because localStorage can be cleared if a browser's cookies/browsing history is cleared, we want our notes to still be accessible, so we will store them on a file on the machine's filesystem.

The notes will be stored in a JSON file under /source/notes, and we will pull the notes and make modifications to the file as we modify our notes. A JSON file makes it simple to read and edit changes by writing/parsing the JSON as a string. We use file I/O libraries that are native to JavaScript.
