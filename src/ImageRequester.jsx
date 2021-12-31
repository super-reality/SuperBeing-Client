import { corsUrl } from "./connectionUrl";

export function doCORSRequest(url, printResult) {
    var x = new XMLHttpRequest();
    x.open('GET', corsUrl + url);
    x.onload = x.onerror = function() {
        printResult(
            JSON.parse(x.responseText).query?.pages[0]?.original.source
        );
    };
    x.send();
}

export default doCORSRequest;