class HealthcareFacility {
    constructor(name, location, capacity) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.patients = [];
    }

    admitPatient(character) {
        if (this.patients.length < this.capacity) {
            this.patients.push(character);
            console.log(`${character.name} has been admitted to ${this.name} for treatment.`);
            character.healthStatus = 'Under Treatment';
        } else {
            console.log(`${this.name} is at full capacity. Cannot admit ${character.name} at this time.`);
        }
    }

    dischargePatient(character) {
        this.patients = this.patients.filter(patient => patient !== character);
        character.healthStatus = 'Healthy';
        console.log(`${character.name} has been discharged from ${this.name} and is now healthy.`);
    }

    provideCare() {
        this.patients.forEach(patient => {
            // Simulate treatment process
            patient.health += 10; // Increment health points
            console.log(`${patient.name} receives care at ${this.name}, health improved.`);
        });
    }
}

class HealthcareManager {
    constructor() {
        this.facilities = [];
    }

    addFacility(facility) {
        this.facilities.push(facility);
    }

    manageHealthcare() {
        this.facilities.forEach(facility => facility.provideCare());
    }
}

module.exports = { HealthcareFacility, HealthcareManager };
