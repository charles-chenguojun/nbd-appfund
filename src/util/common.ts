export function isMobile() {
    let flag =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );
    return flag;
}

export function isApp() {
    return navigator.userAgent.match(/nbdapp/i);
}

export function isWx() {
    let ua = window.navigator.userAgent.toLowerCase();
    const match = ua.match(/MicroMessenger/i);
    if (match == null) {
        return false;
    }
    if (match.includes("micromessenger")) {
        return true;
    }
    return false;
}
