import { storageAvailable } from "./components/storage.js";

export {
  renderTasks,
  swapBtns,
  selectLatestTaskTitle,
  deselectTaskTitle,
  renderTasksEditable,
  renderLatestTaskEditable,
  enableInputs,
  disableInputs,
  setPriorityStyling,
  renderProjects,
  reloadProjectInputs,
  createProjectHeader,
  removeProjectHeader,
  renderProjectHeaderEditable,
  enableProjectHeader,
  disableProjectHeader,
  renderNotes,
  swapNoteBtns,
  selectLatestNoteTitle,
  deselectNoteTitle,
  renderNotesEditable,
  renderLatestNoteEditable,
  enableNoteInputs,
  disableNoteInputs,
  activateTaskbarBtn,
  addActivatedProjectStyle,
} from "./components/user-interface.js";

export {
  taskFactory,
  taskLibrary,
  temporaryTaskLibrary,
  addTask,
  removeTask,
  setEditFlag,
  togglePriority,
  removeAllTasks,
  moveAllTasks,
  removeAllTemporaryTasks,
  revertTaskLibrary,
  removeTemporaryTask,
} from "./components/task-library.js";

export {
  scrollAuto,
  scrollToTop,
  deleteTask,
  deleteTemporaryTask,
  saveTask,
  setDateLimit,
  findTaskEditingStatus,
  sortTaskLibrary,
  loadTodaysTasks,
  loadThisWeeksTasks,
  loadProjectTasks,
  saveProjectName,
  updateProjectsInTaskLibrary,
  checkProjectExists,
  deleteNote,
  saveNote,
  findNoteEditingStatus,
  deleteProject,
  findActivatedProjectIndex,
} from "./components/main.js";

export {
  projectsArray,
  addProject,
  findNumberOfProjects,
  removeProject,
  checkMoreThanOneProject,
} from "./components/projects.js";

export {
  notesLibrary,
  addNote,
  removeNote,
  setNoteEditFlag,
} from "./components/notes.js";

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
} from "./components/storage.js";
