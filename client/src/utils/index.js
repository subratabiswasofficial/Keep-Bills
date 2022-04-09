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
