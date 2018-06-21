import * as React from 'react';
import { sessionService } from 'redux-react-session';

import { WidgetsList } from './WidgetsList';
import { Nav } from './Nav';
import { Popup } from './Popup';
import { RouteComponentProps } from 'react-router';


export interface UserHomeProps extends RouteComponentProps<{}> {

}
interface UserHomeState {
    userId: string;
    popupActive: boolean;
}

export class UserHome extends React.Component<UserHomeProps, UserHomeState> {
    constructor(props) {
        super(props);
        this.state = {
            userId: "50",
            popupActive: false
        }

        this.logout = this.logout.bind(this);
        this.handlerTogglePopup = this.handlerTogglePopup.bind(this);
    }

    logout() {

        this.setState({ userId: "0" })
        sessionService.deleteSession();
        sessionService.deleteUser();
        this.props.history.push('/');
    }

    handlerTogglePopup(e) {

        e.stopPropagation();

        this.setState((prevState) => {
            return { popupActive: !prevState.popupActive }
        });
    }

    public render() {

        return (
            <div>
                <WidgetsList isLoggedIn={true} />

                <Popup active={this.state.popupActive} handlerTogglePopup={this.handlerTogglePopup} />

                <Nav handlerLogout={this.logout} handlerTogglePopup={this.handlerTogglePopup} />
            </div>
            

        );
    }
}
