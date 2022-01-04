export function doCORSRequest(url, printResult) {
    var x = new XMLHttpRequest();
    console.log(url);
    console.log((process.env.VITE_SERVER_CORS_URL.trimEnd().endsWith('/') ? process.env.VITE_SERVER_CORS_URL.trimEnd() : process.env.VITE_SERVER_CORS_URL.trimEnd() + '/') + url);
    x.open('GET', (process.env.VITE_SERVER_CORS_URL.trimEnd().endsWith('/') ? process.env.VITE_SERVER_CORS_URL.trimEnd() : process.env.VITE_SERVER_CORS_URL.trimEnd() + '/') + url);
    x.onload = x.onerror = function() {
        console.log('cors resp: ' + x.responseText);
        let res = '';
        const json = JSON.parse(x.responseText).query;
        if (json) {
            const pages = json.pages;
            if (pages && pages.length > 0) {
                const original = pages[0].original;
                if (original) {
                    res = original.source;
                }
            }
        }
        printResult(
            res
        );
    };
    x.send();
}

export default doCORSRequest;