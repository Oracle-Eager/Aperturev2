import { A1EngineV3 } from './a1-engine.js';

const engine = new A1EngineV3();
const targetUrl = 'https://react.dev/'; // A perfect example of a JS-heavy SPA

async function loadPage(url) {
    try {
        console.log(`[APP] Loading ${url} with HyperDrive Engine...`);
        const iframe = document.getElementById('content-iframe');
        iframe.srcdoc = '<p>Loading...</p>'; // Show loading state

        const processedHtml = await engine.fetchAndProcessPage(url, { mode: 'desktop' });
        
        iframe.srcdoc = processedHtml;
        console.log(`[APP] Page loaded into iframe.`);

    } catch (error)_ {
        console.error('[APP] Failed to load page:', error);
        document.getElementById('content-iframe').srcdoc = `<p>Error: ${error.message}</p>`;
    }
}

// Listen for navigation messages from the sandboxed iframe
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'aperture-navigate') {
        const newUrl = event.data.url;
        console.log(`[APP] Navigation intercepted. New URL: ${newUrl}`);
        // Trigger a new page load with the new URL
        loadPage(newUrl);
    }
});

// Initial load
loadPage(targetUrl);