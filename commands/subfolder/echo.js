module.exports = {
  data: {
      name: 'echo',
      description: 'Echoes a message',
  },
  execute(message, args) {
      message.reply(args.join(' '));
  },
};
