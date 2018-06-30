import { AuthenticatedUser } from "./Models";

export class UserSession
{

    static checkAuthenticatedUser(): boolean {
        const user = sessionStorage.getItem("user");
        if (user) {
            let objUser: AuthenticatedUser;
            objUser = JSON.parse(user);
            if (objUser.UserId > 0)
                return true;
            else
                return false;
        }
        else
            return false;
    }

    static getAuthenticatedUser(): AuthenticatedUser {
        const user = sessionStorage.getItem("user");
        if (user) {
            const objUser = JSON.parse(user);
            return objUser;
        }
        return null;
    }

    static login(objUser: AuthenticatedUser) {
        sessionStorage.setItem("user", JSON.stringify(objUser));
    }

    static logout() {
        sessionStorage.setItem("user", "");
    }
}