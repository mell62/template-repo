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
};
import {
  taskLibrary,
  scrollAuto,
  setEditFlag,
  setDateLimit,
  projectsArray,
  setNoteEditFlag,
  getNotes,
  notesLibrary,
  getTasks,
  getProjects,
} from "../barrel";

const tasksContainer = document.querySelector(".tasks");

function renderTasks() {
  cleanAddNoteBtn();
  if (document.querySelector(".note")) {
    cleanNotes();
  }
  cleanTasks();
  (getTasks() || taskLibrary).forEach((item) => {
    createTask(item);
  });
  setDateLimit();
  setPriorityStyling();
  disableAllEditBtns();
}

function cleanTasks() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    tasksContainer.removeChild(task);
  });
}

function createTask(task) {
  const taskElement = document.createElement("div");
  const firstSection = document.createElement("div");
  const secondSection = document.createElement("div");
  const thirdSection = document.createElement("div");
  const fourthSection = document.createElement("div");
  taskElement.classList.toggle("task");
  firstSection.classList.toggle("task-first-section");
  secondSection.classList.toggle("task-second-section");
  thirdSection.classList.toggle("task-third-section");
  fourthSection.classList.toggle("task-fourth-section");
  firstSection.appendChild(createEditBtn());
  firstSection.appendChild(createDeleteBtn());
  secondSection.appendChild(createTaskTitle(task));
  secondSection.appendChild(createProjectInput(task));
  secondSection.appendChild(createTaskDescription(task));
  thirdSection.appendChild(createDatePicker(task));
  thirdSection.appendChild(createPriorities());
  fourthSection.appendChild(createFinishBtn());
  taskElement.appendChild(firstSection);
  taskElement.appendChild(secondSection);
  taskElement.appendChild(thirdSection);
  taskElement.appendChild(fourthSection);
  tasksContainer.appendChild(taskElement);
  scrollAuto(taskElement);
}

function createTaskTitle(task) {
  const taskTitleContainer = document.createElement("div");
  taskTitleContainer.classList.toggle("task-title-container");
  const taskTitle = document.createElement("input");
  const taskTitleLabel = document.createElement("label");
  taskTitle.setAttribute("value", task.taskTitle);
  taskTitle.classList.toggle("task-title");
  taskTitle.id = "task-title";
  taskTitle.disabled = true;
  taskTitleLabel.setAttribute("for", "task-title");
  taskTitleLabel.textContent = "Task";
  taskTitleContainer.appendChild(taskTitleLabel);
  taskTitleContainer.appendChild(taskTitle);
  return taskTitleContainer;
}

function createProjectInput(task) {
  const projectInputContainer = document.createElement("div");
  projectInputContainer.classList.toggle("project-input-container");
  const projectInput = document.createElement("select");
  const projectInputLabel = document.createElement("label");
  projectInput.classList.toggle("project-field");
  projectInput.id = "task-project";
  (getProjects() || projectsArray).forEach((project) => {
    const projectOption = document.createElement("option");
    projectOption.setAttribute("value", project);
    projectOption.textContent = project;
    projectInput.appendChild(projectOption);
  });
  projectInput.value = task.project;
  projectInput.disabled = true;
  projectInputLabel.setAttribute("for", "task-project");
  projectInputLabel.textContent = "Project";
  projectInputContainer.appendChild(projectInputLabel);
  projectInputContainer.appendChild(projectInput);
  return projectInputContainer;
}

function createDoneBtn() {
  const doneBtn = document.createElement("button");
  doneBtn.classList.toggle("done-btn");
  doneBtn.classList.add("task-editing");
  return doneBtn;
}

function createEditBtn() {
  const editBtn = document.createElement("button");
  editBtn.classList.toggle("edit-btn");
  editBtn.classList.add("task-editing");
  return editBtn;
}

function createDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.toggle("delete-btn");
  return deleteBtn;
}

function createTaskDescription(task) {
  const taskDescriptionContainer = document.createElement("div");
  taskDescriptionContainer.classList.toggle("task-description-container");
  const taskDescription = document.createElement("textarea");
  const taskDescriptionLabel = document.createElement("label");
  taskDescription.innerHTML = task.taskDescription;
  taskDescription.setAttribute("placeholder", "Describe your task...");
  taskDescription.setAttribute("rows", "3");
  taskDescription.setAttribute("cols", "20");
  taskDescription.id = "task-description";
  taskDescription.disabled = true;
  taskDescription.classList.toggle("task-description");
  taskDescriptionLabel.setAttribute("for", "task-description");
  taskDescriptionLabel.textContent = "Description";
  taskDescriptionContainer.appendChild(taskDescriptionLabel);
  taskDescriptionContainer.appendChild(taskDescription);
  return taskDescriptionContainer;
}

function createDatePicker(task) {
  const datePickerContainer = document.createElement("div");
  datePickerContainer.classList.toggle("date-picker-container");
  const datePicker = document.createElement("input");
  const datePickerLabel = document.createElement("label");
  datePicker.setAttribute("type", "date");
  datePicker.setAttribute("value", task.dueDate);
  datePicker.classList.toggle("date-picker");
  datePicker.disabled = true;
  datePicker.id = "task-duedate";
  datePickerLabel.setAttribute("for", "task-duedate");
  datePickerLabel.textContent = "Due:";
  datePickerContainer.appendChild(datePickerLabel);
  datePickerContainer.appendChild(datePicker);
  return datePickerContainer;
}

function createPriorities() {
  const priorityContainer = document.createElement("div");
  const priorityBtnContainer = document.createElement("div");
  const highPriorityBtn = document.createElement("button");
  const mediumPriorityBtn = document.createElement("button");
  const lowPriorityBtn = document.createElement("button");
  const priorityLabel = document.createElement("div");

  highPriorityBtn.classList.toggle("high-priority-btn");
  mediumPriorityBtn.classList.toggle("medium-priority-btn");
  lowPriorityBtn.classList.toggle("low-priority-btn");

  highPriorityBtn.classList.toggle("priority-btn");
  mediumPriorityBtn.classList.toggle("priority-btn");
  lowPriorityBtn.classList.toggle("priority-btn");

  highPriorityBtn.textContent = "High";
  mediumPriorityBtn.textContent = "Medium";
  lowPriorityBtn.textContent = "Low";

  highPriorityBtn.disabled = true;
  mediumPriorityBtn.disabled = true;
  lowPriorityBtn.disabled = true;

  priorityLabel.classList.toggle("priority-label");
  priorityLabel.textContent = "Priority";

  priorityContainer.classList.toggle("priority-container");
  priorityBtnContainer.classList.toggle("priority-btn-container");

  priorityBtnContainer.appendChild(highPriorityBtn);
  priorityBtnContainer.appendChild(mediumPriorityBtn);
  priorityBtnContainer.appendChild(lowPriorityBtn);
  priorityContainer.appendChild(priorityLabel);
  priorityContainer.appendChild(priorityBtnContainer);

  return priorityContainer;
}

function createFinishBtn() {
  const finishBtn = document.createElement("button");

  finishBtn.classList.toggle("finish-task-btn");

  finishBtn.textContent = "Finish!";

  return finishBtn;
}

function swapBtns(btn) {
  btn.classList.contains("done-btn") ? swapDoneBtn(btn) : swapEditBtn(btn);
}

function swapDoneBtn(doneBtn) {
  const container = doneBtn.closest(".task-first-section");
  const deleteBtn = container.querySelector(".delete-btn");
  doneBtn.remove();
  container.insertBefore(createEditBtn(), deleteBtn);
}

function swapEditBtn(editBtn) {
  const container = editBtn.closest(".task-first-section");
  const deleteBtn = container.querySelector(".delete-btn");
  editBtn.remove();
  container.insertBefore(createDoneBtn(), deleteBtn);
}

function renderTasksEditable() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task, index) => {
    const taskBtn = task.querySelector(".task-editing");
    if ((getTasks() || taskLibrary)[index].editFlag === true) {
      if (task.querySelector(".edit-btn")) {
        swapBtns(taskBtn);
      }
    } else if ((getTasks() || taskLibrary)[index].editFlag === false) {
      if (task.querySelector(".done-btn")) {
        swapBtns(taskBtn);
      }
    }
  });
}

function renderLatestTaskEditable() {
  const tasks = document.querySelectorAll(".task");
  let numberOfTasks = tasks.length;
  setEditFlag(true, numberOfTasks - 1);
}

function enableInputs() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    if (task.querySelector(".done-btn")) {
      enableInputElements(task);
      enableTextareaElements(task);
      enablePriorityBtns(task);
      enableProjectInputs(task);
    }
  });
}

function disableInputs() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    if (task.querySelector(".edit-btn")) {
      disableInputElements(task);
      disableTextAreaElements(task);
      disablePriorityBtns(task);
      disableProjectInputs(task);
    }
  });
}

function enableInputElements(task) {
  let inputFields = task.querySelectorAll("input");
  inputFields.forEach((input) => {
    input.disabled = false;
  });
}

function enableTextareaElements(task) {
  let inputFields = task.querySelectorAll("textarea");
  inputFields.forEach((input) => {
    input.disabled = false;
  });
}

function enablePriorityBtns(task) {
  let priorityBtns = task.querySelectorAll(".priority-btn");
  priorityBtns.forEach((btn) => {
    btn.disabled = false;
  });
}

function enableProjectInputs(task) {
  let projectFields = task.querySelectorAll(".project-field");
  projectFields.forEach((field) => {
    field.disabled = false;
  });
}

function disableInputElements(task) {
  let inputFields = task.querySelectorAll("input");
  inputFields.forEach((input) => {
    input.disabled = true;
  });
}

function disableTextAreaElements(task) {
  let textAreaFields = task.querySelectorAll("textarea");
  textAreaFields.forEach((textArea) => {
    textArea.disabled = true;
  });
}

function disablePriorityBtns(task) {
  let priorityBtns = task.querySelectorAll(".priority-btn");
  priorityBtns.forEach((btn) => {
    btn.disabled = true;
  });
}

function disableProjectInputs(task) {
  let projectFields = task.querySelectorAll(".project-field");
  projectFields.forEach((field) => {
    field.disabled = true;
  });
}

function selectTaskTitle(task) {
  const taskTitle = task.querySelector(".task-title");
  taskTitle.select();
}

function deselectTaskTitle(task) {
  const taskTitle = task.querySelector(".task-title");
  taskTitle.focus();
  taskTitle.setSelectionRange(0, 0);
}

function selectLatestTaskTitle() {
  let numberOfTasks = (getTasks() || taskLibrary).length;
  const tasks = document.querySelectorAll(".task");
  const latestTaskElement = tasks[numberOfTasks - 1];
  selectTaskTitle(latestTaskElement);
}

function setPriorityStyling() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task, index) => {
    let highPriorityBtn = task.querySelector(".high-priority-btn");
    let mediumPriorityBtn = task.querySelector(".medium-priority-btn");
    let lowPriorityBtn = task.querySelector(".low-priority-btn");

    (getTasks() || taskLibrary)[index].highPriority
      ? highPriorityBtn.classList.add("priority-styling")
      : highPriorityBtn.classList.remove("priority-styling");

    (getTasks() || taskLibrary)[index].mediumPriority
      ? mediumPriorityBtn.classList.add("priority-styling")
      : mediumPriorityBtn.classList.remove("priority-styling");

    (getTasks() || taskLibrary)[index].lowPriority
      ? lowPriorityBtn.classList.add("priority-styling")
      : lowPriorityBtn.classList.remove("priority-styling");
  });
}

function disableAllEditBtns() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    const editBtn = task.querySelector(".edit-btn");
    editBtn.disabled = true;
  });
}

function reloadProjectInputs() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    removeAllProjectInputs(task);
    loadAllProjectInputs(task);
  });
}

function removeAllProjectInputs(task) {
  const projectInput = task.querySelector(".project-field");
  while (projectInput.firstChild) {
    projectInput.removeChild(projectInput.firstChild);
  }
}

function loadAllProjectInputs(task) {
  const projectInput = task.querySelector(".project-field");
  (getProjects() || projectsArray).forEach((project) => {
    const projectOption = document.createElement("option");
    projectOption.setAttribute("value", project);
    projectOption.textContent = project;
    projectInput.appendChild(projectOption);
  });
}

function createProjectHeader(projectName) {
  removeProjectHeader();

  const tasksPane = document.querySelector(".tasks");

  const projectHeaderContainer = document.createElement("div");
  const projectHeaderBtnContainer = document.createElement("div");
  const projectHeader = document.createElement("input");

  projectHeaderContainer.classList.toggle("project-header-container");
  projectHeaderBtnContainer.classList.toggle("project-header-btn-container");
  projectHeader.classList.toggle("project-header");

  projectHeader.value = projectName;
  projectHeader.disabled = true;

  projectHeaderContainer.appendChild(projectHeader);
  projectHeaderBtnContainer.appendChild(createRenameProjectBtn());
  projectHeaderBtnContainer.appendChild(createDeleteProjectBtn());
  projectHeaderContainer.appendChild(projectHeaderBtnContainer);
  tasksPane.insertBefore(projectHeaderContainer, tasksPane.firstChild);
}

function removeProjectHeader() {
  const tasksPane = document.querySelector(".tasks");
  if (tasksPane.querySelector(".project-header-container")) {
    const projectHeader = tasksPane.querySelector(".project-header-container");
    projectHeader.remove();
  }
}

function createRenameProjectBtn() {
  const renameProjectBtn = document.createElement("button");
  renameProjectBtn.classList.toggle("rename-project-btn");
  renameProjectBtn.classList.toggle("project-header-editing");
  return renameProjectBtn;
}

function createSetProjectBtn() {
  const setProjectBtn = document.createElement("button");
  setProjectBtn.classList.toggle("set-project-btn");
  setProjectBtn.classList.toggle("project-header-editing");
  return setProjectBtn;
}

function createDeleteProjectBtn() {
  const deleteProjectBtn = document.createElement("button");
  deleteProjectBtn.classList.toggle("delete-project-btn");
  return deleteProjectBtn;
}

function swapProjectHeaderBtn(btn) {
  btn.classList.contains("set-project-btn")
    ? swapSetProjectBtn(btn)
    : swapRenameProjectBtn(btn);
}

function swapSetProjectBtn(setProjectBtnContainer) {
  const parentContainer = setProjectBtnContainer.closest(
    ".project-header-btn-container"
  );
  parentContainer.replaceChild(
    createRenameProjectBtn(),
    setProjectBtnContainer
  );
}

function swapRenameProjectBtn(renameProjectBtnContainer) {
  const parentContainer = renameProjectBtnContainer.closest(
    ".project-header-btn-container"
  );
  parentContainer.replaceChild(
    createSetProjectBtn(),
    renameProjectBtnContainer
  );
}

function renderProjectHeaderEditable() {
  const projectContainer = document.querySelector(".project-header-container");
  const projectHeaderBtn = projectContainer.querySelector(
    ".project-header-editing"
  );
  if (projectContainer.querySelector(".rename-project-btn")) {
    swapProjectHeaderBtn(projectHeaderBtn);
  } else if (projectContainer.querySelector(".set-project-btn")) {
    swapProjectHeaderBtn(projectHeaderBtn);
  }
}

function enableProjectHeader() {
  const projectHeaderContainer = document.querySelector(
    ".project-header-container"
  );
  const projectHeader = document.querySelector(".project-header");
  if (projectHeaderContainer.querySelector(".set-project-btn")) {
    projectHeader.disabled = false;
  }
}

function disableProjectHeader() {
  const projectHeaderContainer = document.querySelector(
    ".project-header-container"
  );
  const projectHeader = document.querySelector(".project-header");
  if (projectHeaderContainer.querySelector(".rename-project-btn")) {
    projectHeader.disabled = true;
  }
}

//TASKBAR RELATED

const projectsContainer = document.querySelector(".projects-todo");

function renderProjects() {
  cleanProjects();
  (getProjects() || projectsArray).forEach((project) => {
    createProject(project);
  });
}

function cleanProjects() {
  const projects = document.querySelectorAll(".project-item");
  projects.forEach((project) => {
    projectsContainer.removeChild(project);
  });
}

function createProject(projectName) {
  const projectItemContainer = document.createElement("div");
  projectItemContainer.classList.toggle("project-item");
  const project = document.createElement("button");
  project.textContent = projectName;
  project.classList.toggle("project");
  project.classList.toggle("taskbar-btn");
  projectItemContainer.appendChild(project);
  projectsContainer.appendChild(projectItemContainer);
}

function addActivatedProjectStyle(index) {
  const projectElements = document.querySelectorAll(".project");
  if (index) {
    projectElements[index - 1].classList.add("taskbar-btn-activate");
  }
}

//NOTES RELATED

function renderNotes() {
  if (document.querySelector(".task")) {
    cleanTasks();
  }
  if (document.querySelector(".add-note-btn")) {
    cleanAddNoteBtn();
  }
  removeProjectHeader();
  cleanNotes();
  appendAddNoteBtn();
  (getNotes() || notesLibrary).forEach((item) => {
    createNote(item);
  });
  disableAllNoteEditBtns();
}

function appendAddNoteBtn() {
  const addBtn = document.createElement("button");

  const svgString = `<svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="-5.0 -10.0 110.0 135.0"
              class="add-note-logo"
            >
              <path
                d="m54.168 37.5v8.332h8.332c2.3047 0 4.168 1.8633 4.168 4.168s-1.8633 4.168-4.168 4.168h-8.332v8.332c0 2.3047-1.8633 4.168-4.168 4.168s-4.168-1.8633-4.168-4.168v-8.332h-8.332c-2.3047 0-4.168-1.8633-4.168-4.168s1.8633-4.168 4.168-4.168h8.332v-8.332c0-2.3047 1.8633-4.168 4.168-4.168s4.168 1.8633 4.168 4.168zm-38.668 1.9961c1.082 0 2.168-0.41406 2.918-1.207 0.78906-0.75 1.2461-1.832 1.2461-2.957 0-1.082-0.46094-2.1641-1.25-2.9141-1.5-1.5859-4.332-1.5859-5.875 0-0.79297 0.75-1.207 1.832-1.207 2.9141 0 1.1289 0.41406 2.2109 1.207 2.957 0.75 0.79297 1.8359 1.207 2.9609 1.207zm20.457-20.078c1.082 0 2.1641-0.46094 2.918-1.2539 0.78906-0.75 1.25-1.832 1.25-2.957 0-1.082-0.46094-2.1641-1.207-2.9141-1.543-1.543-4.332-1.5859-5.918 0-0.79297 0.78906-1.207 1.832-1.207 2.9141 0 1.1289 0.41406 2.2109 1.207 2.957 0.78906 0.79297 1.875 1.2539 2.957 1.2539zm-12.457 8.2461c1.082 0 2.168-0.45703 2.918-1.25 0.79297-0.75 1.25-1.8359 1.25-2.918 0-1.125-0.45703-2.2109-1.25-2.957-1.543-1.543-4.332-1.582-5.875 0-0.79297 0.79297-1.2109 1.8359-1.2109 2.9609 0 1.082 0.41797 2.168 1.207 2.918 0.75 0.79297 1.8359 1.2461 2.9609 1.2461zm55.898 51.832c0.015624-0.015625 0.042968-0.023438 0.058593-0.039063s0.023438-0.042969 0.039063-0.058593c7.5156-7.543 12.172-17.938 12.172-29.398 0-5.4883-1.0938-10.723-3.0312-15.523-0.027344-0.074218-0.050781-0.14453-0.078125-0.21875-2.1055-5.1367-5.1953-9.7734-9.0547-13.645-0.019531-0.019531-0.027344-0.050781-0.046875-0.070312s-0.046875-0.023438-0.066406-0.042969c-7.543-7.5156-17.934-12.168-29.391-12.168-0.96875 0-1.8164 0.38281-2.5234 0.93359-0.13672 0.10156-0.30859 0.15234-0.43359 0.27344-0.19531 0.20313-0.30859 0.46875-0.46094 0.70703-0.43359 0.66406-0.75 1.4062-0.75 2.2539 0 0.85547 0.32031 1.6055 0.76172 2.2656 0.14844 0.23438 0.25781 0.49219 0.44922 0.69141 0.19531 0.1875 0.45312 0.29297 0.68359 0.44141 0.66016 0.44531 1.4141 0.76953 2.2734 0.76953 18.379 0 33.332 14.953 33.332 33.332s-14.953 33.332-33.332 33.332-33.332-14.953-33.332-33.332c0-0.5625-0.11328-1.1055-0.32422-1.6055-0.0625-0.15234-0.18359-0.26172-0.26172-0.40234-0.18359-0.33203-0.35938-0.67188-0.62109-0.94922-0.15234-0.15234-0.35938-0.21875-0.53125-0.33984-0.69141-0.51172-1.5039-0.87109-2.4297-0.87109s-1.7383 0.35938-2.4297 0.87109c-0.17187 0.12109-0.37891 0.1875-0.53125 0.33984-0.28516 0.29688-0.47656 0.66016-0.66797 1.0195-0.0625 0.11719-0.16406 0.20703-0.21484 0.32812-0.20703 0.5-0.32422 1.043-0.32422 1.6094 0 5.4961 1.0938 10.734 3.0391 15.543 0.019531 0.054687 0.035156 0.10938 0.058594 0.16406 2.1055 5.1484 5.1953 9.793 9.0586 13.676 0.023438 0.019532 0.027344 0.054688 0.050781 0.074219 0.019532 0.023438 0.050782 0.027344 0.074219 0.050781 3.7266 3.7109 8.1523 6.7227 13.059 8.8203 0.050781 0.023437 0.09375 0.046875 0.14844 0.070313 4.9766 2.1016 10.445 3.2695 16.18 3.2695 5.4531 0 10.648-1.082 15.426-2.9961 0.10547-0.039063 0.20703-0.066406 0.3125-0.11328 5.1406-2.1094 9.7812-5.1992 13.66-9.0625z"
              /></svg
            ><strong>Note</strong>`;

  addBtn.classList.toggle("add-note-btn");
  addBtn.innerHTML = svgString;
  tasksContainer.appendChild(addBtn);
}

function cleanAddNoteBtn() {
  const addNoteBtn = document.querySelector(".add-note-btn");
  if (addNoteBtn) {
    tasksContainer.removeChild(addNoteBtn);
  }
}

function cleanNotes() {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    tasksContainer.removeChild(note);
  });
}

function createNote(note) {
  const noteElement = document.createElement("div");
  noteElement.appendChild(createNoteEditBtn());
  noteElement.appendChild(createNoteDeleteBtn());
  noteElement.appendChild(createNoteTitle(note));
  noteElement.appendChild(createNoteDescription(note));
  noteElement.classList.toggle("note");
  tasksContainer.appendChild(noteElement);
  scrollAuto(noteElement);
}

function createNoteTitle(note) {
  const noteTitleContainer = document.createElement("div");
  const noteTitle = document.createElement("input");
  noteTitle.setAttribute("value", note.noteTitle);
  noteTitle.classList.toggle("note-title");
  noteTitle.disabled = true;
  noteTitleContainer.classList.toggle("note-title-container");
  noteTitleContainer.appendChild(noteTitle);
  return noteTitleContainer;
}

function createNoteDoneBtn() {
  const doneBtn = document.createElement("button");
  doneBtn.classList.toggle("note-done-btn");
  doneBtn.classList.add("note-editing");
  return doneBtn;
}

function createNoteEditBtn() {
  const editBtn = document.createElement("button");
  editBtn.classList.toggle("note-edit-btn");
  editBtn.classList.add("note-editing");
  return editBtn;
}

function createNoteDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.toggle("note-delete-btn");
  return deleteBtn;
}

function createNoteDescription(note) {
  const noteDescriptionContainer = document.createElement("div");
  const noteDescription = document.createElement("textarea");
  noteDescription.innerHTML = note.noteDescription;
  noteDescription.setAttribute("rows", "3");
  noteDescription.setAttribute("cols", "20");
  noteDescription.setAttribute("placeholder", "Describe your note...");
  noteDescription.disabled = true;
  noteDescription.classList.toggle("note-description");
  noteDescriptionContainer.classList.toggle("note-description-container");
  noteDescriptionContainer.appendChild(noteDescription);
  return noteDescriptionContainer;
}

function swapNoteBtns(btn) {
  btn.classList.contains("note-done-btn")
    ? swapNoteDoneBtn(btn)
    : swapNoteEditBtn(btn);
}

function swapNoteDoneBtn(doneBtn) {
  const note = doneBtn.closest(".note");
  doneBtn.remove();
  note.prepend(createNoteEditBtn());
}

function swapNoteEditBtn(editBtn) {
  const note = editBtn.closest(".note");
  editBtn.remove();
  note.prepend(createNoteDoneBtn());
}

function renderNotesEditable() {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note, index) => {
    const noteBtn = note.querySelector(".note-editing");
    if ((getNotes() || notesLibrary)[index].editFlag === true) {
      if (note.querySelector(".note-edit-btn")) {
        swapNoteBtns(noteBtn);
      }
    } else if ((getNotes() || notesLibrary)[index].editFlag === false) {
      if (note.querySelector(".note-done-btn")) {
        swapNoteBtns(noteBtn);
      }
    }
  });
}

function renderLatestNoteEditable() {
  const notes = document.querySelectorAll(".note");
  let numberOfNotes = notes.length;
  setNoteEditFlag(true, numberOfNotes - 1);
}

function enableNoteInputs() {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    if (note.querySelector(".note-done-btn")) {
      enableNoteInputElements(note);
      enableNoteTextareaElements(note);
    }
  });
}

function disableNoteInputs() {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    if (note.querySelector(".note-edit-btn")) {
      disableNoteInputElements(note);
      disableNoteTextAreaElements(note);
    }
  });
}

function enableNoteInputElements(note) {
  let inputFields = note.querySelectorAll("input");
  inputFields.forEach((input) => {
    input.disabled = false;
  });
}

function enableNoteTextareaElements(note) {
  let inputFields = note.querySelectorAll("textarea");
  inputFields.forEach((input) => {
    input.disabled = false;
  });
}

function disableNoteInputElements(note) {
  let inputFields = note.querySelectorAll("input");
  inputFields.forEach((input) => {
    input.disabled = true;
  });
}

function disableNoteTextAreaElements(note) {
  let textAreaFields = note.querySelectorAll("textarea");
  textAreaFields.forEach((textArea) => {
    textArea.disabled = true;
  });
}

function selectNoteTitle(note) {
  const noteTitle = note.querySelector(".note-title");
  noteTitle.select();
}

function deselectNoteTitle(note) {
  const noteTitle = note.querySelector(".note-title");
  noteTitle.focus();
  noteTitle.setSelectionRange(0, 0);
}

function selectLatestNoteTitle() {
  let numberOfNotes = (getNotes() || notesLibrary).length;
  const notes = document.querySelectorAll(".note");
  const latestNoteElement = notes[numberOfNotes - 1];
  selectNoteTitle(latestNoteElement);
}

function disableAllNoteEditBtns() {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    const editBtn = note.querySelector(".note-edit-btn");
    editBtn.disabled = true;
  });
}

//STYLING

function removeTaskbarBtnActivation() {
  const taskbarBtns = document.querySelectorAll(".taskbar-btn");
  taskbarBtns.forEach((btn) => {
    btn.classList.remove("taskbar-btn-activate");
  });
}

function addTaskbarBtnActivation(btn) {
  btn.classList.add("taskbar-btn-activate");
}

function activateTaskbarBtn(btn) {
  removeTaskbarBtnActivation();
  addTaskbarBtnActivation(btn);
}
