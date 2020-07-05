export default (data: object) => Object.keys(data)
    .filter(key => Boolean(data[key]))
    .reduce((result, key) => ({...result, [key]: data[key]}), {});
