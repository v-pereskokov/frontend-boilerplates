let localStorage;

if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
    localStorage = window.localStorage;
} else {
    localStorage = {
        setItem() {},
        getItem() {},
    };
}

module.exports = localStorage;
