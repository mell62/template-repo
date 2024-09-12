export {
  storageAvailable,
  storeNotes,
  getNotes,
  storeTasks,
  getTasks,
  storeTemporaryTasks,
  getTemporaryTasks,
  storeProjects,
  getProjects,
};

function storageAvailable() {
  let storage;
  try {
    storage = window["localStorage"];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function storeTasks(taskLibrary) {
  if (storageAvailable()) {
    localStorage.setItem("taskLibrary", JSON.stringify(taskLibrary));
  }
}

function storeTemporaryTasks(temporaryTaskLibrary) {
  if (storageAvailable()) {
    localStorage.setItem(
      "temporaryTaskLibrary",
      JSON.stringify(temporaryTaskLibrary)
    );
  }
}

function getTasks() {
  if (storageAvailable()) {
    return JSON.parse(localStorage.getItem("taskLibrary"));
  }
}

function getTemporaryTasks() {
  if (storageAvailable()) {
    return JSON.parse(localStorage.getItem("temporaryTaskLibrary"));
  }
}

function storeProjects(projectsArray) {
  if (storageAvailable()) {
    localStorage.setItem("projectsArray", JSON.stringify(projectsArray));
  }
}

function getProjects() {
  if (storageAvailable()) {
    return JSON.parse(localStorage.getItem("projectsArray"));
  }
}

function storeNotes(notesLibrary) {
  if (storageAvailable()) {
    localStorage.setItem("notesLibrary", JSON.stringify(notesLibrary));
  }
}

function getNotes() {
  if (storageAvailable()) {
    return JSON.parse(localStorage.getItem("notesLibrary"));
  }
}
