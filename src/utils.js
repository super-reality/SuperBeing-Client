export function getRandomStartingMessage() { 
    let data = process.env.VITE_STARTING_MESSAGES;
    data = data.split('|');
    const index = Math.floor(Math.random() * data.length);
    return data[index];
}

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}