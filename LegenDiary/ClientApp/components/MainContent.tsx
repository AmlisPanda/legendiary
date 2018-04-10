import * as React from 'react';
import { WidgetsList } from './WidgetsList';
import { SubscribeForm } from './SubscribeForm';
import { LoginForm } from './LoginForm';

export interface MainContentProps {
    isLoggedIn: boolean;
    handlerLogin: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export class MainContent extends React.Component<MainContentProps, {}> {

    public render() {

        const isLoggedIn = this.props.isLoggedIn;

        let content = null;

        //if (isLoggedIn) {
        //    content = <WidgetsList isLoggedIn={this.props.isLoggedIn} />
        //}
        //else {
        //    content = (
        //        <div id="homepageContent">
        //            <SubscribeForm />
        //            <LoginForm handlerLogin={this.props.handlerLogin} />
        //        </div>
        //    );
        //}

        return (
            <div id="main">
                {content}
            </div>

        );
    }
}
