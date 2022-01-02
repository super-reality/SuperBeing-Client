export function doCORSRequest(url, printResult) {
    var x = new XMLHttpRequest();
    x.open('GET', (process.env.VITE_SERVER_CORS_URL.endsWith('/') ? process.env.VITE_SERVER_CORS_URL : VITE_SERVER_CORS_URL + '/') + url);
    x.onload = x.onerror = function() {
        console.log('requested img');
        printResult(
            JSON.parse(x.responseText).query?.pages[0]?.original.source
        );
    };
    x.send();
}

export default doCORSRequest;