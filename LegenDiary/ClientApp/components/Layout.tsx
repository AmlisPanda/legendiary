import * as React from 'react';

import { Header } from './Header';
import { Nav } from './Nav';
import { Popup } from './Popup';
import { Footer } from './Footer';
import { MainContent } from './MainContent';


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

        return (
            <div className="App">

                <Header isLoggedIn={isLoggedIn} handlerLogout={this.handlerLogout} />

                <div id="container">
                    <MainContent isLoggedIn={isLoggedIn} handlerLogin={this.handlerLogin} />

                    {isLoggedIn &&
                        <Popup active={this.state.popupActive} handlerTogglePopup={this.handlerTogglePopup} />
                    }
                    {isLoggedIn &&
                        <Nav handlerLogout={this.handlerLogout} handlerTogglePopup={this.handlerTogglePopup} />
                    }
                </div>


                <Footer />
            </div>
        );
    }
}
