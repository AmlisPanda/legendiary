import * as React from 'react';
import { Widget } from './Models';
import { WidgetElement } from './WidgetElement';
import { UserSession } from './UserSession';

interface WidgetsListProps {
    isLoggedIn: boolean;
}

interface WidgetsListState {
    widgets: Widget[];
    userId: number;
    loading: boolean;
}

export class WidgetsList extends React.Component<WidgetsListProps, WidgetsListState> {

    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            loading: true,
            userId: UserSession.getAuthenticatedUser() ? UserSession.getAuthenticatedUser().UserId : 0,
        };

        fetch('api/Widgets/User/' + this.state.userId).then(
                response => response.json()
            )
            .then(data => {
                
                this.setState({ widgets: data.WidgetsList, loading: false });
            });
    }
    render() {
        return (
            <div id="widgetsList">
                {this.state.widgets.map(widget =>
                    <WidgetElement
                        id={widget.WidgetId}
                        key={widget.WidgetId}
                        title={widget.Title}
                        description={widget.Subtitle}
                        widgetType={widget.WidgetTypeId}
                        data={widget.WidgetData}
                        isLoggedIn={true}
                    />
                )}
            
             
            </div>

        );
    }
}
