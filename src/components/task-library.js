import {
  getTasks,
  getTemporaryTasks,
  storeTasks,
  storeTemporaryTasks,
} from "../barrel";

export {
  taskFactory,
  taskLibrary,
  temporaryTaskLibrary,
  addTask,
  removeTask,
  removeTemporaryTask,
  setEditFlag,
  togglePriority,
  removeAllTasks,
  moveAllTasks,
  removeAllTemporaryTasks,
  revertTaskLibrary,
};

// import { storageAvailable } from "../barrel";

let taskFactory = (title) => {
  let taskTitle = title;
  let project = "General";
  let dueDate;
  let taskDescription = "";
  let highPriority = false;
  let mediumPriority = true;
  let lowPriority = false;
  let editFlag = false;
  return {
    taskTitle,
    project,
    editFlag,
    dueDate,
    taskDescription,
    highPriority,
    mediumPriority,
    lowPriority,
  };
};

let defaultTask = taskFactory("Sample task");
let taskLibrary = getTasks() || [defaultTask];
let temporaryTaskLibrary = getTemporaryTasks() || [];

function addTask(title) {
  let newTask = taskFactory(title);
  taskLibrary.push(newTask);
  storeTasks(taskLibrary);
}

function removeTask(index) {
  taskLibrary.splice(index, 1);
  storeTasks(taskLibrary);
}

function removeTemporaryTask(task) {
  let taskIndex = (getTemporaryTasks() || temporaryTaskLibrary).indexOf(task);
  if (taskIndex !== -1) {
    temporaryTaskLibrary.splice(taskIndex, 1);
    storeTemporaryTasks(temporaryTaskLibrary);
  }
}

function removeAllTasks() {
  taskLibrary.splice(0, taskLibrary.length);
  storeTasks(taskLibrary);
}

function removeAllTemporaryTasks() {
  temporaryTaskLibrary.splice(0, temporaryTaskLibrary.length);
  storeTemporaryTasks(temporaryTaskLibrary);
}

function setAllEditFlagsFalse() {
  taskLibrary.forEach((task) => {
    task.editFlag = false;
  });
  storeTasks(taskLibrary);
}

function setEditFlag(state, index) {
  if (typeof state === "boolean") {
    setAllEditFlagsFalse();
    taskLibrary[index].editFlag = state;
    storeTasks(taskLibrary);
  }
}

function setPrioritiesFalse(index) {
  taskLibrary[index].highPriority = false;
  taskLibrary[index].mediumPriority = false;
  taskLibrary[index].lowPriority = false;
  storeTasks(taskLibrary);
}

function togglePriority(priority, index) {
  setPrioritiesFalse(index); //To set other priorities as false
  taskLibrary[index][priority] = !taskLibrary[index][priority];
  storeTasks(taskLibrary);
}

function moveAllTasks() {
  taskLibrary.forEach((task) => {
    if (!temporaryTaskLibrary.includes(task)) {
      //Check to prevent duplicating tasks
      temporaryTaskLibrary.push(task);
      storeTemporaryTasks(temporaryTaskLibrary);
    }
  });
  removeAllTasks();
  storeTasks(taskLibrary);
}

function revertTaskLibrary() {
  if (temporaryTaskLibrary.length !== 0) {
    //Check to prevent removing all tasks
    removeAllTasks();
    temporaryTaskLibrary.forEach((task) => {
      taskLibrary.push(task);
    });
    removeAllTemporaryTasks();
    storeTasks(taskLibrary);
    storeTemporaryTasks(temporaryTaskLibrary);
  }
}
