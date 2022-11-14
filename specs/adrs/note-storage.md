# Create, read, update, and delete a note feature

## Context and Problem Statement

How to implement the local first software functionality, local storage or local machine? What functionalities are needed? Where and how should the notes be stored?

## Considered Options
- Local Storage (Lab 6)
- IndexedDB (Client-side object database)
- Directly on the machine (in a file)
  - .json file or .md or .txt file

## Decision Outcome

We decided to use IndexedDB to store our notes locally. Because localStorage can't store a large amount of data and files can't be stored directly on the machine on the client side, IndexedDB lets us store more complex data on the client side. Additionally, IndexedDB lets us store objects, so we can associate fields like lastModified, title, and content with a note instead of just a string.

A note's ID will map to the note object so we can still retrieve the original note even if the title or some other parts of the note change.
