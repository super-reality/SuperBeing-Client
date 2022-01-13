export function getRandomStartingMessage(agent, speaker) { 
    let data = process.env.VITE_STARTING_MESSAGES.split('|');
    const index = Math.floor(Math.random() * data.length);
    let res = data[index].replace('$agent', agent).replace('$speaker', speaker);
    return res;
}

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}