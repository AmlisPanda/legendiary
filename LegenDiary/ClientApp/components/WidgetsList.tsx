import * as React from 'react';
import { Widget } from './Widget';

export interface WidgetsListProps {
    isLoggedIn: boolean;
}

export class WidgetsList extends React.Component<WidgetsListProps> {
    render() {
        return (
            <div id="widgetsList">
                
                <Widget
                    title="Citation du jour"
                    description="Confucius"
                    isLoggedIn={this.props.isLoggedIn}
                />
             
            </div>

        );
    }
}
