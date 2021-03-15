function Debounce() {
    let called = false;
    let timer;
    return (func, time) => {
        called = false;
        clearInterval(timer);
        timer = setInterval(() => {
            if (time) {
                time -= 10;
            }
            if (time === 0 && !called) {
                called = true;
                return func();
            }
        }, 10);
    };
}

const debounce = Debounce()

module.exports = debounce
