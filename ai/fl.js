const tf = require('@tensorflow/tfjs-node');

// Laste inn og forberede data
const loadData = async () => {
    const csvData = await fetch('https://example.com/data.csv');
    const data = await csvData.text();
    const lines = data.trim().split('\n');
    const labels = lines.shift().split(',').slice(1);
    const examples = lines.map(line => {
        const values = line.split(',');
        const label = values.shift();
        return { label, values: values.map(Number) };
    });
    return { examples, labels };
};

// Trene modellen
const trainModel = async (examples, labels) => {
    const tensorLabels = tf.tensor1d(labels.map(label => labels.indexOf(label)), 'int32');
    const tensorExamples = tf.tensor2d(examples.map(example => example.values));

    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [examples[0].values.length], units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: labels.length, activation: 'softmax' }));

    model.compile({
        optimizer: 'adam',
        loss: 'sparseCategoricalCrossentropy',
        metrics: ['accuracy'],
    });

    await model.fit(tensorExamples, tensorLabels, { epochs: 100, batchSize: 32 });
    return model;
};

// Bruke modellen
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const input = message.content.split(',').map(Number);
    const tensorInput = tf.tensor2d([input]);

    const prediction = model.predict(tensorInput).argMax(-1).dataSync()[0];
    const label = labels[prediction];

    await message.reply(`Basert på inputen din, er min prediksjon: ${label}`);
});

// Laste inn data og trene modellen
const { examples, labels } = await loadData();
const model = await trainModel(examples, labels);
