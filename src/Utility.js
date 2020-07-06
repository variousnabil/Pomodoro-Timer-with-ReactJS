export const defaultLength = {
    break: 5,
    session: 25
};

export let msToMMSS = (ms) => {
    let totalSecond = ms / 1000;
    let minutes = Math.floor(totalSecond / 60);
    let seconds = totalSecond - (minutes * 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

export let minutesToMS = (minutes) => {
    let seconds = minutes * 60;
    let ms = seconds * 1000;
    return ms;
};

export let msToMinutes = (ms) => {
    return Math.floor(ms / 1000 / 60);
};