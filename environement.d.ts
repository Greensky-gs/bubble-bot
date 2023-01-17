declare global {
    namespace NodeJS {
        interface ProcessEnv {
            token: string;
            db_host: string;
            db: string;
            db_pwd: string;
            db_user: string;
        }
    }
}

export {}