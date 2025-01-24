import "passport";

declare global {
    namespace Express {
        interface User {
            id: number
            username: string
            password: string
        }
    }
}