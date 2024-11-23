function save() {
    let storage = window.localStorage;
    let data = btoa(JSON.stringify(gameData.userData));
    storage.setItem("clickScoreSave", data);
    console.log("Saved!");
}
function load() {
    let storage = window.localStorage;
    let data = storage.getItem("clickScoreSave");
    if (data !== null) {
        try {
            newUserData = JSON.parse(atob(data));
            newUserData = recursiveConvert(newUserData);
            newUserData = addMissingFields(newUserData, gameData.userData);
			gameData.userData = newUserData;
            console.log(newUserData);
            console.log("Loaded");
			return true;
        } catch (e) {
            console.error(e);
        }
    }
	return false;
}
function recursiveConvert(obj) {
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        if (typeof(obj[key]) === "object") obj[key] = recursiveConvert(obj[key]);
        else if (typeof(obj[key]) === "number" && !obj[key].toString().includes('.')) obj[key] = obj[key];
        else if (typeof(obj[key]) === "string" && /^\d+n$/.test(obj[key])) obj[key] = obj[key].substring(obj[key].length - 1, -1);
    }
    return obj;
}
function addMissingFields(target, source) {
    for (let key in source) {
        if (!source.hasOwnProperty(key)) continue;
        if (!target.hasOwnProperty(key) || target[key] === undefined || target[key] === null) target[key] = source[key];
        else if (typeof(source[key]) === "number" && typeof(target[key]) === "bigint") target[key] = number(target[key]);
        else if (typeof(source[key]) === "number" && typeof(target[key]) === "string") target[key] = parseInt(target[key]);
        else if (typeof(source[key]) === "object" && typeof(target[key]) === "object") target[key] = addMissingFields(target[key], source[key]);
        else if (typeof(source[key]) !== typeof(target[key])) target[key] = source[key];
    }
    return target;
}
function wipeSave() {
    let storage = window.localStorage;
    storage.removeItem("clickScoreSave");
    blob = defaultBlob;

    window.location.reload();
}
