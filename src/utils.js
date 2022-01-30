export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function capitalizeFirstLetter(word) {
    if (!word || word === undefined) word = '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }