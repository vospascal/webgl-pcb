export function debounce(fnc: VoidFnc, delay = 200, immediate = false) {
    let timeoutId: number;

    return (...args: unknown[]) => {
        if (immediate && !timeoutId) {
            fnc(...args);
        }
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            if (!immediate) {
                fnc(...args);
            } else {
                timeoutId = undefined;
            }
        }, delay);
    };
}

export function throttle(fnc: VoidFnc, timeToWaitBeforeNextCall = 200) {
    let timeoutId: number;
    let prevCallTime: number;
    let now: number;
    let nextScheduledCallTime: number;

    return (...args: unknown[]) => {
        nextScheduledCallTime = prevCallTime + timeToWaitBeforeNextCall;
        now = performance.now();

        if (!prevCallTime || now > nextScheduledCallTime) {
            fnc(...args);
            prevCallTime = now;
        } else {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                fnc(...args);
                prevCallTime = now;
            }, timeToWaitBeforeNextCall - (now - prevCallTime));
        }
    };
}

const mobileUserAgentRegExp = /Android|iPhone|iPad/i;

export function isMobileDevice() {
    return mobileUserAgentRegExp.test(window.navigator.userAgent);
}

export function formatTime(time: number) {
    const milSec = Math.floor(time % 1000);
    const sec = Math.floor((time / 1000) % 60);
    const min = Math.floor((time / 60000) % 60);

    return `${appendLeadingZero(min)}:${appendLeadingZero(sec)}.${milSec}`;
}

function appendLeadingZero(value: number) {
    const str = value.toString();

    return str.length < 2 ? `0${value}` : str;
}

export function numberToHexString(colorValue: number) {
    return `#${colorValue.toString(16).toUpperCase()}`;
}

export function degToRad(deg: number) {
    return (deg / 180) * Math.PI;
}

export function radToDeg(rad: number) {
    return (rad * 180) / Math.PI;
}

export function round(n: number) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function valueBetween(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
}
