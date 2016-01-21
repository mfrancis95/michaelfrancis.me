function smoothScroll(position, duration, ease, interruptable, callback) {
    position = position || 0;
    var start = window.scrollY;
    if (position === start) {
        if (callback) {
            callback();
        }
    }
    else {
        duration = duration || 500;
        if (!ease) {
            ease = function(time, start, change, duration) {
                return change * time / duration + start;
            };
        }
        var run = true;
        if (interruptable) {
            interruptable = function() {
                run = false;
            };
            window.addEventListener("wheel", interruptable);
        }
        var startTime = Date.now();
        var change = position - start;
        var step = function () {
            if (run) {
                var time = Date.now() - startTime;
                if (time <= duration) {
                    window.scrollTo(0, ease(time, start, change, duration));
                }
                else {
                    run = false;
                    window.scrollTo(0, position);
                }
                requestAnimationFrame(step);
            }
            else {
                if (interruptable) {
                    window.removeEventListener("wheel", interruptable);
                }
                if (callback) {
                    callback();
                }
            }
        };
        step();
    }
}

function easeInOutQuad(time, start, change, duration) {
    time /= duration / 2;
    if (time < 1) {
        return change / 2 * time * time + start;
    }
    else {
        --time;
        return -change / 2 * (time * (time - 2) - 1) + start;
    }
};

var whoami = document.getElementById("whoami");

document.querySelector(".fa-angle-down").addEventListener("click", function(event) {
    event.preventDefault();
    history.pushState(null, null, this.href);
    smoothScroll(whoami.offsetTop, 1000, easeInOutQuad, true);
});
