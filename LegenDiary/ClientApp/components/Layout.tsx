import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Header } from './Header';
import { Footer } from './Footer';
import { UserHome } from './UserHome';
import { Home } from './Home';

interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    userId: number;
    popupActive?: boolean;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
      
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            popupActive: false
        }


        this.handlerLogout = this.handlerLogout.bind(this);
        this.handlerTogglePopup = this.handlerTogglePopup.bind(this);
    }

    handlerLogout() {
        this.setState({ userId: 0 })
    }

    handlerTogglePopup(e) {

        e.stopPropagation();

        this.setState((prevState) => {
            return { popupActive: !prevState.popupActive }
        });
    }

    public render() {

        const isLoggedIn = this.state.userId > 0;

        let content = null;


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