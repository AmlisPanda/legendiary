import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

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
    containerWidth: number;
    containerHeight: number;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
      
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            popupActive: false,
            containerWidth: 0,
            containerHeight: 0
        }


        this.handlerLogout = this.handlerLogout.bind(this);
        this.handlerTogglePopup = this.handlerTogglePopup.bind(this);
    }

    componentDidMount() {
        this.setState({
            containerWidth: window.innerWidth,
            containerHeight: window.innerHeight - 200
        });
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

        const containerStyle = {
            height: this.state.containerHeight
        }

        return (
            <div className="App">

                <Header isLoggedIn={isLoggedIn} handlerLogout={this.handlerLogout} />

                <div id="container" style={containerStyle}>
                    {this.props.children}
                </div>
                

                <Footer />
            </div>
        );
    }
}