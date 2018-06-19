import * as React from 'react';

import { Header } from './Header';

import { Footer } from './Footer';
import { UserHome } from './UserHome';
import { Home } from './Home';

export interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    isUserConnected: boolean;
    popupActive: boolean;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props) {
        super(props);
        this.state = {
            isUserConnected: false,
            popupActive: false
        }

        this.handlerLogin = this.handlerLogin.bind(this);
        this.handlerLogout = this.handlerLogout.bind(this);
        this.handlerTogglePopup = this.handlerTogglePopup.bind(this);
    }

    handlerLogin() {
        this.setState({ isUserConnected: true })
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

        const isLoggedIn = this.state.isUserConnected;

        let content = null;
        //if (isLoggedIn) {
        //    content = <UserHome />
        //}
        //else {
        //    content = <Home />
        //}

        return (
            <div className="App">

                <Header isLoggedIn={isLoggedIn} handlerLogout={this.handlerLogout} />

                <div id="container">
                    {this.props.children}
                </div>
                

                <Footer />
            </div>
        );
    }
}
