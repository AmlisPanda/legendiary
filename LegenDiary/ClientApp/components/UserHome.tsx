import * as React from 'react';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';

import { WidgetsList } from './WidgetsList';
import { Nav } from './Nav';
import { Popup } from './Popup';
import { UserSession } from './UserSession';
import { RouteComponentProps } from 'react-router';


export interface UserHomeProps extends RouteComponentProps<{}> {
}
interface UserHomeState {
    userId: number;
    popupActive?: boolean;
}

export class UserHome extends React.Component<UserHomeProps, UserHomeState> {
    constructor(props) {
        super(props);
        this.state = {
            userId: UserSession.getAuthenticatedUser() ? UserSession.getAuthenticatedUser().UserId : 0,
            popupActive: false
        }

        this.logout = this.logout.bind(this);
        this.handlerTogglePopup = this.handlerTogglePopup.bind(this);
    }

    logout() {

        UserSession.logout();
        this.props.history.push('/');
    }

    handlerTogglePopup(e) {

        //e.stopPropagation();

        this.setState((prevState) => {
            return { popupActive: !prevState.popupActive }
        });
    }

    public render() {

        return (
            <div>
                <WidgetsList isLoggedIn={true} />

                {this.state.popupActive &&
                    <Popup handlerTogglePopup={this.handlerTogglePopup} />
                }
               

                <Nav handlerLogout={this.logout} handlerTogglePopup={this.handlerTogglePopup} />
            </div>
            

        );
    }
}