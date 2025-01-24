import "express-session"; // don't forget to import the original module

declare module "express-session" {
    interface SessionData {
        test: boolean // whatever property you like
    }
}