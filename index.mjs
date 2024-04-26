const axios = require('axios');
const { JSDOM } = require('jsdom');

async function downloadAndParseHTML(url) {
    try {
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Parse the HTML and extract content
        const content = parseHTML(document);
        
        // For simplicity, just logging the content here
        console.log(JSON.stringify(content, null, 2));
        
        // In a real application, you would store this content in DocumentDB or perform other operations
    } catch (error) {
        console.error('Error downloading or parsing HTML:', error);
    }
}

function parseHTML(document) {
    const content = {};
    // Example parsing logic
    // You would traverse through the document's structure and extract relevant content into the 'content' object
    // Example:
    content.title = document.querySelector('h1').textContent;
    content.subTitle = document.querySelector('.sub-title').textContent;
    content.parts = Array.from(document.querySelectorAll('.part')).map(part => ({
      title: part.querySelector('h2').textContent,
       paragraphs: Array.from(part.querySelectorAll('p')).map(p => p.textContent)
    }));
    
    return content;
}

// Usage
const url = 'https://www.ecfr.gov/api/renderer/v1/content/enhanced/2024-03-01/title-2';
downloadAndParseHTML(url);
