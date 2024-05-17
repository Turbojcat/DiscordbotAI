const puppeteer = require('puppeteer');

let browser;
(async () => {
    browser = await puppeteer.launch();
})();

const searchCommand = async (query, message, openaiApi) => {
    const page = await browser.newPage();

    try {
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
        const searchResults = await page.evaluate(() => {
            const results = Array.from(document.querySelectorAll('div.g'));
            return results.map((result) => result.textContent);
        });

        const prompt = `Search query: ${query}\n\nSearch results:\n${searchResults.join('\n\n')}\n\nProvide a summary of the search results:`;
        const response = await openaiApi.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 1024,
            n: 1,
            stop: null,
            temperature: 0.7,
        });

        message.reply(response.data.choices[0].text);
    } catch (error) {
        console.error(error);
        message.reply('An error occurred while processing your request.');
    } finally {
        await page.close();
    }
};

module.exports = {
    data: {
        name: 'search',
        description: 'Search Google and summarize the results using OpenAI',
    },
    execute(message, args) {
        const query = args.join(' ');
        searchCommand(query, message, this.openaiApi);
    },
};

