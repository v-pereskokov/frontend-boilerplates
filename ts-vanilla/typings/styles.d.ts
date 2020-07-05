declare module '*.css' {
    const styles: any;
    export = styles;
}

declare module '*.scss' {
    export const b: (...args: unknown[]) => string;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.csv' {
    const content: any;
    export default content;
}
