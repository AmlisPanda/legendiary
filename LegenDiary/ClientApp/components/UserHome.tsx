import * as React from 'react';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import { Widget } from './Models';
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
}

export class UserHome extends React.Component<UserHomeProps, UserHomeState> {
    constructor(props) {
        super(props);
        this.state = {
            userId: UserSession.getAuthenticatedUser() ? UserSession.getAuthenticatedUser().UserId : 0,
            popupActive: false,
            widgets: []
        }

        this.getWidgets = this.getWidgets.bind(this);
        this.deleteWidget = this.deleteWidget.bind(this);
        this.logout = this.logout.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.createWidget = this.createWidget.bind(this);
        this.editWidget = this.editWidget.bind(this);

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

    public render() {

        const popupComponent = this.state.popupActive ?
            <Popup closePopup={this.closePopup}>
                {this.state.popupContent}
            </Popup>
            : "";

        return (
            <div>
                <WidgetsList isLoggedIn={true} widgets={this.state.widgets} userId={this.state.userId} deleteWidgetHandler={this.deleteWidget} editWidget={this.editWidget} closePopup={this.closePopup} />

                {popupComponent}

                <Nav handlerLogout={this.logout} createWidget={this.createWidget} closePopup={this.closePopup} />
            </div>
            

        );
    }
}