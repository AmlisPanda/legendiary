﻿export class Subscriber {
    Login: string;
    Email: string;
    Password: string;
    PasswordConfirm: string;
}

export class User {
    Email: string;
    Password: string;
}

export class Widget {
    WidgetId?: number;
    Title: string;
    Subtitle: string;
    IsFavourite?: boolean;
    WidgetData: string;
    WidgetTypeId: number;
    AppuserId: number;
}