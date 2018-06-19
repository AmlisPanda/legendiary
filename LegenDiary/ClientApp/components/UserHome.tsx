import * as React from 'react';
import { WidgetsList } from './WidgetsList';
import { Nav } from './Nav';
import { Popup } from './Popup';

export interface UserHomeProps {
}
interface UserHomeState {
    isUserConnected: boolean;
    popupActive: boolean;
}

export class UserHome extends React.Component<UserHomeProps, UserHomeState> {
    constructor(props) {
        super(props);
        this.state = {
            isUserConnected: false,
            popupActive: false
        }

        this.handlerLogout = this.handlerLogout.bind(this);
        this.handlerTogglePopup = this.handlerTogglePopup.bind(this);
    }

    handlerLogout() {
        this.setState({ isUserConnected: false })
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

                <Nav handlerLogout={this.handlerLogout} handlerTogglePopup={this.handlerTogglePopup} />
            </div>
            

        );
    }
}
