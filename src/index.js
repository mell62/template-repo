import "./styles/style.css";
import "./styles/modern-normalize.css";
import {
  renderTasks,
  scrollToTop,
  addTask,
  deleteTask,
  deleteTemporaryTask,
  saveTask,
  selectLatestTaskTitle,
  deselectTaskTitle,
  setEditFlag,
  renderTasksEditable,
  renderLatestTaskEditable,
  enableInputs,
  disableInputs,
  togglePriority,
  setPriorityStyling,
  findTaskEditingStatus,
  sortTaskLibrary,
  loadTodaysTasks,
  revertTaskLibrary,
  loadThisWeeksTasks,
  renderProjects,
  addProject,
  deleteProject,
  findNumberOfProjects,
  reloadProjectInputs,
  loadProjectTasks,
  createProjectHeader,
  removeProjectHeader,
  renderProjectHeaderEditable,
  enableProjectHeader,
  disableProjectHeader,
  saveProjectName,
  updateProjectsInTaskLibrary,
  checkProjectExists,
  checkMoreThanOneProject,
  renderNotes,
  addNote,
  deleteNote,
  saveNote,
  selectLatestNoteTitle,
  deselectNoteTitle,
  setNoteEditFlag,
  renderNotesEditable,
  renderLatestNoteEditable,
  enableNoteInputs,
  disableNoteInputs,
  findNoteEditingStatus,
  activateTaskbarBtn,
  findActivatedProjectIndex,
  addActivatedProjectStyle,
  storageAvailable,
} from "./barrel";

if (!storageAvailable()) {
  alert(
    "Please enable local storage in your browser or exit private browsing to proceed with using this application effectively."
  );
}

renderTasks();
renderProjects();

const tasksContainer = document.querySelector(".tasks");
const addBtn = document.querySelector(".add-task");
const everythingBtn = document.querySelector(".everything-btn");
const todayBtn = document.querySelector(".today-btn");
const upcomingBtn = document.querySelector(".upcoming-btn");
const addProjectBtn = document.querySelector(".add-project-btn");
const taskBar = document.querySelector(".taskbar");
const notesBtn = document.querySelector(".notes-btn");

scrollToTop(tasksContainer);
activateTaskbarBtn(everythingBtn);

everythingBtn.addEventListener("click", revertTaskLibrary);
everythingBtn.addEventListener("click", renderTasks);
everythingBtn.addEventListener("click", renderTasksEditable);
everythingBtn.addEventListener("click", enableInputs);
everythingBtn.addEventListener("click", removeProjectHeader);
everythingBtn.addEventListener("click", scrollToTop.bind(null, tasksContainer));
everythingBtn.addEventListener(
  "click",
  activateTaskbarBtn.bind(null, everythingBtn)
);
everythingBtn.click(); //To load alltasks by default upon reload

todayBtn.addEventListener("click", loadTodaysTasks);
todayBtn.addEventListener("click", renderTasks);
todayBtn.addEventListener("click", renderTasksEditable);
todayBtn.addEventListener("click", enableInputs);
todayBtn.addEventListener("click", removeProjectHeader);
todayBtn.addEventListener("click", scrollToTop.bind(null, tasksContainer));
todayBtn.addEventListener("click", activateTaskbarBtn.bind(null, todayBtn));

upcomingBtn.addEventListener("click", loadThisWeeksTasks);
upcomingBtn.addEventListener("click", renderTasks);
upcomingBtn.addEventListener("click", renderTasksEditable);
upcomingBtn.addEventListener("click", enableInputs);
upcomingBtn.addEventListener("click", removeProjectHeader);
upcomingBtn.addEventListener("click", scrollToTop.bind(null, tasksContainer));
upcomingBtn.addEventListener(
  "click",
  activateTaskbarBtn.bind(null, upcomingBtn)
);

// Add tasks
addBtn.addEventListener("click", revertTaskLibrary);
addBtn.addEventListener("click", addTask.bind(null, "New Task"));
addBtn.addEventListener("click", renderTasks);
addBtn.addEventListener("click", renderLatestTaskEditable);
addBtn.addEventListener("click", renderTasksEditable);
addBtn.addEventListener("click", enableInputs);
addBtn.addEventListener("click", selectLatestTaskTitle);
addBtn.addEventListener("click", removeProjectHeader);
addBtn.addEventListener("click", activateTaskbarBtn.bind(null, everythingBtn));

//Delete temporary tasks
tasksContainer.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("delete-btn") ||
    event.target.classList.contains("finish-task-btn")
  ) {
    deleteTemporaryTask(event.target);
  }
});

//Delete tasks
tasksContainer.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("delete-btn") ||
    event.target.classList.contains("finish-task-btn")
  ) {
    deleteTask(event.target);
    renderTasks();
    renderTasksEditable();
    enableInputs();
    scrollToTop(tasksContainer);
  }
});

//Save tasks
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-btn")) {
    const task = event.target.closest(".task");
    const taskTitle = task.querySelector(".task-title");
    const projectField = task.querySelector(".project-field");
    const dueDateField = task.querySelector(".date-picker");
    const taskDescriptionField = task.querySelector(".task-description");
    saveTask(
      event.target,
      taskTitle.value,
      projectField.value,
      dueDateField.value,
      taskDescriptionField.value
    );
  }
});

//Deselect task title
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-btn")) {
    const editingBtns = document.querySelectorAll(".task-editing");
    const tasks = document.querySelectorAll(".task");
    const btnIndex = Array.prototype.indexOf.call(editingBtns, event.target);
    const task = tasks[btnIndex];
    deselectTaskTitle(task);
  }
  if (event.target.classList.contains("edit-btn")) {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
      deselectTaskTitle(task);
    });
  }
});

//Set edit flag
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    const taskBtns = document.querySelectorAll(".task-editing");
    const btnIndex = Array.prototype.indexOf.call(taskBtns, event.target);
    setEditFlag(true, btnIndex);
  }
});

//Un-set edit flag
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-btn")) {
    const taskBtns = document.querySelectorAll(".task-editing");
    const btnIndex = Array.prototype.indexOf.call(taskBtns, event.target);
    setEditFlag(false, btnIndex);
  }
});

//Swap done and edit buttons
tasksContainer.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("done-btn") ||
    event.target.classList.contains("edit-btn")
  ) {
    renderTasksEditable();
    enableInputs();
    disableInputs();
  } else if (
    event.target.classList.contains("set-project-btn") ||
    event.target.classList.contains("rename-project-btn")
  ) {
    renderProjectHeaderEditable();
    enableProjectHeader();
    disableProjectHeader();
  }
});

//Set priority flag
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("priority-btn")) {
    const tasks = document.querySelectorAll(".task");
    const thisTask = event.target.closest(".task");
    const taskIndex = Array.prototype.indexOf.call(tasks, thisTask);
    if (event.target.classList.contains("high-priority-btn")) {
      togglePriority("highPriority", taskIndex);
    } else if (event.target.classList.contains("medium-priority-btn")) {
      togglePriority("mediumPriority", taskIndex);
    } else {
      togglePriority("lowPriority", taskIndex);
    }
  }
});

tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("priority-btn")) {
    setPriorityStyling();
  }
});

tasksContainer.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("task")) {
    const thisTask = event.target;
    if (thisTask.querySelector(".edit-btn")) {
      const editBtn = thisTask.querySelector(".edit-btn");
      if (findTaskEditingStatus()) {
        editBtn.disabled = true;
      } else {
        editBtn.disabled = false;
      }
    }
  }
});

//Sort tasks
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-btn")) {
    sortTaskLibrary();
    renderTasks();
  }
});

tasksContainer.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("edit-btn") && !findTaskEditingStatus()) {
    event.target.disabled = false;
  }
});

addProjectBtn.addEventListener("click", () => {
  let numberOfProjects = findNumberOfProjects();
  addProject(`Project #${numberOfProjects + 1}`);
});

addProjectBtn.addEventListener("click", () => {
  let activatedProjectIndex = findActivatedProjectIndex();
  renderProjects();
  addActivatedProjectStyle(activatedProjectIndex);
});

//Refresh projects list of inputs
addProjectBtn.addEventListener("click", () => {
  reloadProjectInputs();
});

addProjectBtn.addEventListener("click", () => {
  addActivatedProjectStyle();
});

taskBar.addEventListener("click", (event) => {
  if (event.target.classList.contains("project")) {
    createProjectHeader(event.target.innerText);
  }
});

taskBar.addEventListener("click", (event) => {
  if (event.target.classList.contains("project")) {
    loadProjectTasks(event.target.innerText);
    renderTasks();
    renderTasksEditable();
    enableInputs();
    scrollToTop(tasksContainer);
    activateTaskbarBtn(event.target);
  }
});

let oldProjectName;

//Save project name
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("rename-project-btn")) {
    const projectTitleElement = document.querySelector(".project-header");
    oldProjectName = projectTitleElement.value;
  }
  if (event.target.classList.contains("set-project-btn")) {
    const projectTitleElement = document.querySelector(".project-header");
    let newProjectName = projectTitleElement.value;
    if (!checkProjectExists(newProjectName)) {
      //Save project only if project does not already exist
      saveProjectName(oldProjectName, newProjectName);
      updateProjectsInTaskLibrary(oldProjectName, newProjectName);
    } else {
      projectTitleElement.value = oldProjectName;
    }
  }
});

tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("set-project-btn")) {
    renderProjects();
  }
});

tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-btn")) {
    if (tasksContainer.querySelector(".project-header")) {
      const projectTitleElement =
        tasksContainer.querySelector(".project-header");
      let projectTitle = projectTitleElement.value;
      loadProjectTasks(projectTitle);
      renderTasks();
      renderTasksEditable();
      enableInputs();
    }
  }
});

tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-project-btn")) {
    const container = event.target.closest(".project-header-container");
    const projectName = container.querySelector(".project-header").value;
    if (checkMoreThanOneProject()) {
      deleteProject(projectName);
      renderProjects();
      renderTasks();
      renderTasksEditable();
      enableInputs();
      removeProjectHeader();
      scrollToTop(tasksContainer);
      reloadProjectInputs();
      activateTaskbarBtn(everythingBtn);
    }
  }
});

//NOTES RELATED

notesBtn.addEventListener("click", renderNotes);
notesBtn.addEventListener("click", scrollToTop.bind(null, tasksContainer));
notesBtn.addEventListener("click", activateTaskbarBtn.bind(null, notesBtn));

tasksContainer.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("add-note-btn") ||
    event.target.closest(".add-note-btn")
  ) {
    addNote("New Note");
    renderNotes();
    renderLatestNoteEditable();
    renderNotesEditable();
    enableNoteInputs();
    selectLatestNoteTitle();
  }
});

//Delete notes
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("note-delete-btn")) {
    deleteNote(event.target);
    renderNotes();
    renderNotesEditable();
    enableNoteInputs();
  }
});

//Save notes
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("note-done-btn")) {
    const note = event.target.closest(".note");
    const noteTitle = note.querySelector(".note-title");
    const noteDescriptionField = note.querySelector(".note-description");
    saveNote(event.target, noteTitle.value, noteDescriptionField.value);
  }
});

//Deselect note title
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("note-done-btn")) {
    const editingBtns = document.querySelectorAll(".note-editing");
    const notes = document.querySelectorAll(".note");
    const btnIndex = Array.prototype.indexOf.call(editingBtns, event.target);
    const note = notes[btnIndex];
    deselectNoteTitle(note);
  }
  if (event.target.classList.contains("note-edit-btn")) {
    const notes = document.querySelectorAll(".note");
    notes.forEach((note) => {
      deselectNoteTitle(note);
    });
  }
});

//Set note edit flag
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("note-edit-btn")) {
    const noteBtns = document.querySelectorAll(".note-editing");
    const btnIndex = Array.prototype.indexOf.call(noteBtns, event.target);
    setNoteEditFlag(true, btnIndex);
  }
});

//Un-set note edit flag
tasksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("note-done-btn")) {
    const noteBtns = document.querySelectorAll(".note-editing");
    const btnIndex = Array.prototype.indexOf.call(noteBtns, event.target);
    setNoteEditFlag(false, btnIndex);
  }
});

//Swap note's done and edit buttons
tasksContainer.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("note-done-btn") ||
    event.target.classList.contains("note-edit-btn")
  ) {
    renderNotesEditable();
    enableNoteInputs();
    disableNoteInputs();
  }
});

tasksContainer.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("note")) {
    const thisNote = event.target;
    if (thisNote.querySelector(".note-edit-btn")) {
      const editBtn = thisNote.querySelector(".note-edit-btn");
      if (findNoteEditingStatus()) {
        editBtn.disabled = true;
      } else {
        editBtn.disabled = false;
      }
    }
  }
});
