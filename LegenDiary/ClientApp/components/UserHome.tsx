import * as React from 'react';
import { Widget } from './Models';
import { Header } from './Header';
import { WidgetsList } from './WidgetsList';
import { Nav } from './Nav';
import { Popup } from './Popup';
import { UserSession } from './UserSession';
import { RouteComponentProps } from 'react-router';
import { CreateWidgetForm } from './CreateWidgetForm';
import { ReactNode } from 'react';


export interface UserHomeProps extends RouteComponentProps<{}> {
}
interface UserHomeState {
    userId: number;
    popupActive?: boolean;
    popupContent?: React.ReactNode;
    navDisplayed: boolean;
    refreshWidgets: boolean;
}

export class UserHome extends React.Component<UserHomeProps, UserHomeState> {
    constructor(props) {
        super(props);
        this.state = {
            userId: UserSession.getAuthenticatedUser() ? UserSession.getAuthenticatedUser().UserId : 0,
            popupActive: false,
            navDisplayed: false,
            refreshWidgets: false
        }

        this.logout = this.logout.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.createWidget = this.createWidget.bind(this);
        this.editWidget = this.editWidget.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }




    logout() {

        UserSession.logout();
        this.props.history.push('/');
    }

    closePopup(e) {
        this.setState({popupActive:false, refreshWidgets:true}); 
    }

    openPopup(e) {
        this.setState({
            popupActive: true,
            refreshWidgets: false
        });
    }

    editWidget(e, widget) {
        this.openPopup(e);
        // TODO : ne pas rafraîchir tous les widgets
        this.setState({
            popupContent: <CreateWidgetForm widget={widget} closePopup={() => this.setState({ popupActive: false, refreshWidgets: true })} />
        });
    }

    createWidget(e) {
        this.openPopup(e);
        this.setState({
            popupContent: <CreateWidgetForm closePopup={() => this.setState({ popupActive: false, refreshWidgets: true })} />
        });
    }

    toggleNav(e) {

        this.setState({ navDisplayed: !this.state.navDisplayed });
    }

    closeNav(e) {
        this.setState({ navDisplayed: false });
    }

    public render() {

        const popupComponent = this.state.popupActive ?
            <Popup closePopup={this.closePopup}>
                {this.state.popupContent}
            </Popup>
            : "";

        return (
            <div>

                <Header userId={this.state.userId} toggleNav={this.toggleNav} />

                <div id="container" className={this.state.navDisplayed ? "withNavBar" : ""} onClick={this.closeNav}>
                    <WidgetsList
                        refresh={this.state.refreshWidgets}
                        isLoggedIn={true}
                        userId={this.state.userId}
                        editWidget={this.editWidget}
                        closePopup={this.closePopup}
                    />

                    {popupComponent}

                    
                </div>

                <Nav handlerLogout={this.logout} createWidget={this.createWidget} closePopup={this.closePopup} active={this.state.navDisplayed} toggleNav={this.toggleNav} />
            </div>

        );
    }
}