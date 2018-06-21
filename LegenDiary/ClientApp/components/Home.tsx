import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { sessionService } from 'redux-react-session';

import { SubscribeForm } from './SubscribeForm';
import { LoginForm } from './LoginForm';


export class Home extends React.Component<RouteComponentProps<{}>, {}> {


    constructor(props) {
        super(props);
        this.state = {
            isUserConnected: false,
            popupActive: false
        }

        this.login = this.login.bind(this);
    }

    login(event, data) {
        sessionService.saveSession();
        sessionService.saveUser(data)

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
