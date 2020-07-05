declare module 'auth' {
    export interface CSRFToken {
        token: string;
    }

    export interface User {
        name: string;
        role: string;
        status: number;
        // IUserRequest
        request?: string;
    }

    export type LoginPack = {
        login: string;
        password: string;
    };
}
