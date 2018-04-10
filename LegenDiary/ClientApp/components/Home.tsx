import * as React from 'react';
import { SubscribeForm } from './SubscribeForm';
import { LoginForm } from './LoginForm';


export class Home extends React.Component<{}, {}> {

    public render() {

        return (
            <div id="container">
                <div id="homepageContent">
                    <SubscribeForm />
                    <LoginForm />
                </div>
            </div>
           
        );
    }
}
