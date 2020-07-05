declare module 'infrastructure/utils' {
    type NonObj = number | string | boolean | ((...args: unknown[]) => unknown) | null | undefined;

    export interface Indexed<T = any> {
        [x: string]: T;
    }

    export type Iterable<R> = Promise<R> | IterableIterator<R>;

    export type Nullable<T = unknown> = null | T;

    export type SetDifference<A, B> = A extends B ? never : A;

    export type Diff<T extends object, U extends object> = Pick<
        T,
        SetDifference<keyof T, keyof U>
        >;

    export type Intersection<T extends object, U extends object> = Pick<
        T,
        Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
        >;

    export type Assign<
        T extends object,
        U extends object,
        I = Diff<T, U> & Intersection<U, T> & Diff<U, T>
        > = Pick<I, keyof I>;
}
