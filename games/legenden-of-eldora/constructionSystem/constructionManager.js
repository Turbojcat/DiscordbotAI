class ConstructionManager {
    constructor() {
        this.buildings = []; // List of all buildings and their statuses
        this.constructionProjects = []; // Ongoing construction projects
    }

    // Initiate a new building project using resources and labor
    startConstruction(projectDetails) {
        this.constructionProjects.push(projectDetails);
        console.log(`Construction started for ${projectDetails.buildingType} at ${projectDetails.location}.`);
    }

    // Update construction progress based on available resources and labor
    updateConstruction() {
        this.constructionProjects.forEach(project => {
            if (project.resourcesAvailable && project.laborAvailable) {
                project.progress += project.progressRate;
                console.log(`Construction progress for ${project.buildingType} at ${project.location}: ${project.progress}%`);
            } else {
                console.log(`Construction delayed for ${project.buildingType} at ${project.location} due to lack of resources or labor.`);
            }
        });
    }

    // Complete construction projects that have met all requirements
    completeConstruction() {
        this.constructionProjects = this.constructionProjects.filter(project => {
            if (project.progress >= 100) {
                this.buildings.push(project);
                console.log(`Construction completed for ${project.buildingType} at ${project.location}.`);
                return false;
            }
            return true;
        });
    }
}

module.exports = { ConstructionManager };
