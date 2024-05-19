function triggerRandomEvent() {
    const events = ['earthquake', 'thunderstorm', 'meteorShower'];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    console.log(`A ${randomEvent} has occurred!`);
}

module.exports = { triggerRandomEvent };
