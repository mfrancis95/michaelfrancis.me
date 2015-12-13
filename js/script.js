function easeInOutQuad(time, start, change, duration) {
    time /= duration / 2;
    if (time < 1) {
        return change / 2 * time * time + start;
    }
    else {
        --time;
        return -change / 2 * (time * (time - 2) - 1) + start;
    }
}

function smoothScrollTo(position, duration) {
    duration = duration || 500;
    var start = window.scrollY;
    var change = position - start;
    var startTime = Date.now();
    var step = function() {
        var time = Date.now() - startTime;
        window.scrollTo(0, easeInOutQuad(time, start, change, duration));
        if (time <= duration) {
            requestAnimationFrame(step);
        }
        else {
            window.scrollTo(0, position);
        }
    };
    requestAnimationFrame(step);
}

var whoami = document.getElementById("whoami");

document.querySelector(".fa-angle-down").addEventListener("click", function() {
    smoothScrollTo(whoami.offsetTop, 1000);
});