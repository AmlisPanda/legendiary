export class Subscriber {
    Login: string;
    Email: string;
    Password: string;
    PasswordConfirm: string;
}

export class User {
    Email: string;
    Password: string;
}

export class AuthenticatedUser {
    UserId: number;
    Email: string;
    Login: string;
}

export class Widget {
    WidgetId?: number;
    Title: string;
    Subtitle: string;
    IsFavourite?: boolean;
    WidgetData: string;
    WidgetTypeId: number;
    AppuserId: number;
    Width: number;
    Height: number;
    X: number;
    Y: number;
}
export class WidgetLayout {
    Id: string;
    WidgetId?: number;
    Width: number;
    Height: number;
    X: number;
    Y: number;
}