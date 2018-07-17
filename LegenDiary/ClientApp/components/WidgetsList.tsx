import * as React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { Widget } from './Models';
import { WidgetElement } from './WidgetElement';
import { UserSession } from './UserSession';
import { CreateWidgetForm } from './CreateWidgetForm';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';


const ResponsiveGridLayout = WidthProvider(Responsive);


interface WidgetsListProps {
    isLoggedIn: boolean;
    widgets: Widget[];
    userId: number;
    deleteWidgetHandler: (id: number) => void;
    editWidget: (ev: React.MouseEvent<HTMLButtonElement>, widget: Widget) => void;
    editLayout: (layout, layouts) => void;
    closePopup: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

interface WidgetsListState {
    
}

export class WidgetsList extends React.Component<WidgetsListProps, WidgetsListState> {

    constructor(props) {
        super(props);
        this.openWidget = this.openWidget.bind(this);
    }

    openWidget(e, widget) {
        console.log("WidgetsList");
        this.props.editWidget(e, widget);
    }

    onLayoutChange = (layout, layouts) => {

    }

    render() {

        const cols = { lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 };
        return (
            <ResponsiveGridLayout key="widgetsList" className="layout" margin={[20, 20]} cols={cols} onLayoutChange={this.props.editLayout}>
                {this.props.widgets.map(widget =>
                    <div key={"widget_" + widget.WidgetId} data-grid={{ x: widget.X, y: widget.Y, w: widget.Width, h: widget.Height, isResizable: true }}>
                        <WidgetElement
                            widget={widget}
                            isLoggedIn={true}
                            deleteWidgetHandler={this.props.deleteWidgetHandler}
                            openWidget={this.openWidget}
                            closePopup={this.props.closePopup}
                        />
                    </div>
                )}
            </ResponsiveGridLayout>

        );
    }
}
