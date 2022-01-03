export function doCORSRequest(url, printResult) {
    var x = new XMLHttpRequest();
    x.open('GET', (process.env.VITE_SERVER_CORS_URL.endsWith('/') ? process.env.VITE_SERVER_CORS_URL : VITE_SERVER_CORS_URL + '/') + url);
    x.onload = x.onerror = function() {
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