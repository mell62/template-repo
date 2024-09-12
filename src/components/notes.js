export { notesLibrary, addNote, removeNote, setNoteEditFlag };

import { getNotes, storeNotes } from "../barrel";

let notesFactory = (title) => {
  let noteTitle = title;
  let noteDescription = "";
  let editFlag = false;
  return { noteTitle, noteDescription, editFlag };
};

let defaultNote = notesFactory("Sample note");

let notesLibrary = getNotes() || [defaultNote];

function addNote(title) {
  let newNote = notesFactory(title);
  notesLibrary.push(newNote);
  storeNotes(notesLibrary);
}

function removeNote(index) {
  notesLibrary.splice(index, 1);
  storeNotes(notesLibrary);
}

function setAllEditFlagsFalse() {
  notesLibrary.forEach((note) => {
    note.editFlag = false;
  });
  storeNotes(notesLibrary);
}

function setNoteEditFlag(state, index) {
  if (typeof state === "boolean") {
    setAllEditFlagsFalse();
    notesLibrary[index].editFlag = state;
    storeNotes(notesLibrary);
  }
}
