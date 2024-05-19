class Guild {
    constructor(name, leader) {
        this.name = name;
        this.leader = leader;
        this.members = [leader];
    }

    addMember(player) {
        this.members.push(player);
        console.log(`${player.name} has joined the guild '${this.name}'`);
    }

    removeMember(player) {
        this.members = this.members.filter(member => member !== player);
        console.log(`${player.name} has left the guild '${this.name}'`);
    }
}

module.exports = Guild;
