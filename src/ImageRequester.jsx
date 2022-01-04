export function doCORSRequest(url, printResult) {
    var x = new XMLHttpRequest();
    const cors_url = 'https://superreality-backend.herokuapp.com/';
    x.open('GET', (cors_url.endsWith('/') ? cors_url: cors_url + '/') + url);
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