import { getProjects, storeProjects } from "../barrel";

export {
  projectsArray,
  addProject,
  findNumberOfProjects,
  removeProject,
  checkMoreThanOneProject,
};

let projectsArray = getProjects() || ["General"];

function addProject(projectName) {
  projectsArray.push(projectName);
  storeProjects(projectsArray);
}

function findNumberOfProjects() {
  return (getProjects() || projectsArray).length;
}

function removeProject(projectName) {
  let index = (getProjects() || projectsArray).indexOf(projectName);
  projectsArray.splice(index, 1);
  storeProjects(projectsArray);
}

function checkMoreThanOneProject() {
  if ((getProjects() || projectsArray).length > 1) {
    return true;
  } else {
    return false;
  }
}
