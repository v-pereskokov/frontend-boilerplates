export default (str: string, length: number, endWith = '...'): string => {
    return (str.length > length) ? str.substr(0, length - 1) + endWith : str;
};
