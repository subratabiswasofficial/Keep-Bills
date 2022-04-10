export const validNumber = (code = '') => {
    for (let i = 0; i < code.length; ++i) {
        if ('0' <= code[i] && code[i] <= '9') {
            continue;
        } else {
            return false;
        }
    }
    return true;
};

export const semesterView = (n) => {
    if (n === 1) {
        return '1st';
    } else if (n === 2) {
        return '2nd';
    } else if (n === 3) {
        return '3rd';
    } else if (n < 9) {
        return `${n}th`;
    } else {
        return 'Invalid';
    }
};
