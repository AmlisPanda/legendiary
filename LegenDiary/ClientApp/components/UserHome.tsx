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
    widgets: Widget[];
    popupContent?: React.ReactNode;
    navDisplayed: boolean;
}

export class UserHome extends React.Component<UserHomeProps, UserHomeState> {
    constructor(props) {
        super(props);
        this.state = {
            userId: UserSession.getAuthenticatedUser() ? UserSession.getAuthenticatedUser().UserId : 0,
            popupActive: false,
            widgets: [],
            navDisplayed: false
        }

        this.getWidgets = this.getWidgets.bind(this);
        this.deleteWidget = this.deleteWidget.bind(this);
        this.logout = this.logout.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.createWidget = this.createWidget.bind(this);
        this.editWidget = this.editWidget.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);

        this.getWidgets();
    }

    // Récupère la liste des widgets depuis le serveur
    getWidgets() {
        fetch('api/Widgets/User/' + this.state.userId).then(
            response => response.json()
        )
        .then(data => {

            this.setState({ widgets: data.WidgetsList });
        });
    }

    // Suppression d'un widget
    deleteWidget(widgetId) {
        fetch('api/Widgets/' + widgetId, {
            method: 'delete'
        }).then(
            response => response.json()
        )
        .then(data => {
            if (data.Success) {
                this.getWidgets();
            }
            else {
                alert(data.Message);
            }
        });
    }

    // Modification du layout
    editLayout(layout, layouts) {
        console.log(layouts);
        if (layouts) {
            fetch('api/Widgets/EditLayout', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(layouts)
            }).then(
                response => response.json()
            );
        }
        
    }

    logout() {

        UserSession.logout();
        this.props.history.push('/');
    }

    closePopup(e) {

        this.getWidgets();
        this.setState({popupActive:false}); 
    }

    openPopup(e) {
        this.setState({
            popupActive: true
        });
    }

    editWidget(e, widget) {
        this.openPopup(e);
        this.setState({
            popupContent: <CreateWidgetForm widget={widget} closePopup={this.closePopup} />
        });
    }

    createWidget(e) {
        this.openPopup(e);
        this.setState({
            popupContent: <CreateWidgetForm closePopup={this.closePopup} />
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
                        isLoggedIn={true}
                        widgets={this.state.widgets}
                        userId={this.state.userId}
                        deleteWidgetHandler={this.deleteWidget}
                        editWidget={this.editWidget}
                        editLayout={this.editLayout}
                        closePopup={this.closePopup}
                    />

                    {popupComponent}

                    
                </div>

                <Nav handlerLogout={this.logout} createWidget={this.createWidget} closePopup={this.closePopup} active={this.state.navDisplayed} toggleNav={this.toggleNav} />
            </div>

        );
    }
}