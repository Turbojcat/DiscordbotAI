const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');

async function loadModel() {
    const model = await mobilenet.load();
    return model;
}

client.on('messageCreate', async (message) => {
    if (message.attachments.size > 0) {
        const attachment = message.attachments.first();
        if (attachment.contentType.startsWith('image/')) {
            try {
                const imageBytes = await attachment.arrayBuffer();
                const imageTensor = tf.node.decodeImage(new Uint8Array(imageBytes), 3);

                const model = await loadModel();
                const predictions = await model.classify(imageTensor);

                const labels = predictions.map(prediction => `${prediction.className} (${(prediction.probability * 100).toFixed(2)}%)`);
                const reply = `Dette bildet inneholder: ${labels.join(', ')}`;
                await message.reply(reply);
            } catch (error) {
                console.error('Error analyzing image:', error);
                await message.reply('En feil oppstod under analysen av bildet.');
            }
        }
    }
});
