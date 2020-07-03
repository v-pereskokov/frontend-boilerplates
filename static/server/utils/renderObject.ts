import serialize from 'serialize-javascript';

export default (data: unknown) =>
    serialize(data).replace(/</g, '\\\u003c');
