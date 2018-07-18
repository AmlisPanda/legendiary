import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { UserSession } from './UserSession';

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
            userId: UserSession.getAuthenticatedUser() ? UserSession.getAuthenticatedUser().UserId : 0,
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

        const containerStyle = {
            height: this.state.containerHeight
        }

        return (
            <div className="App">

                <Header userId={this.state.userId} />

                <div id="container">
                    {this.props.children}
                </div>
                

                <Footer />
            </div>
        );
    }
}