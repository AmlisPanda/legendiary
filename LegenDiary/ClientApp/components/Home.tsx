import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { UserSession } from './UserSession';

import { SubscribeForm } from './SubscribeForm';
import { LoginForm } from './LoginForm';


export class Home extends React.Component<RouteComponentProps<{}>, {}> {


    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(event, data) {
        UserSession.login(data);

        this.props.history.push("/user");
        
    }

    

    public render() {

        return (

            <div id="homepageContent">
                <SubscribeForm />
                <LoginForm onSuccess={this.login} />
            </div>

           
        );
    }
}
