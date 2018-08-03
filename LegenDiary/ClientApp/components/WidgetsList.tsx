import * as React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { Widget } from './Models';
import { WidgetElement } from './WidgetElement';
import { UserSession } from './UserSession';
import { CreateWidgetForm } from './CreateWidgetForm';
import * as moment from 'moment';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';


const ResponsiveGridLayout = WidthProvider(Responsive);


interface WidgetsListProps {
    mode: string;
    date: Date,
    isLoggedIn: boolean;
    userId: number;
    editWidget: (ev: React.MouseEvent<HTMLButtonElement>, widget: Widget) => void;
    closePopup: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    refresh: boolean;
}

interface WidgetsListState {
    widgets: Widget[];
    date: Date;
}

export class WidgetsList extends React.Component<WidgetsListProps, WidgetsListState> {

    constructor(props) {
        super(props);
        this.openWidget = this.openWidget.bind(this);
        this.getWidgets = this.getWidgets.bind(this);
        this.deleteWidget = this.deleteWidget.bind(this);
        this.closeWidgetPopup = this.closeWidgetPopup.bind(this);

        this.state = {
            widgets: [],
            date: this.props.date
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.getWidgets();
    }


    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps");
        const { refresh } = this.props;
        if (props.refresh == true) {
            this.getWidgets();
        }
        else if (props.date != this.props.date) {
            console.log(props.date);
            this.getWidgets(props.date);

            
        }

    }

    openWidget(e, widget) {
        this.props.editWidget(e, widget);
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
    editLayout(callbackItem) {
        if (callbackItem) {
            fetch('api/Widgets/EditLayout', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(callbackItem)
            }).then(
                response => response.json()
                );
        }

    }

    // Récupère la liste des widgets depuis le serveur
    getWidgets(date?: Date) {

        if (!date)
            date = this.state.date;
        console.log("getWidgets : " + moment(date).format("YYYY-MM-DD"));

        let url = 'api/Widgets/User/' + this.props.userId + '/'; 
        url += this.props.mode + "/" + moment(date).format("YYYY-MM-DD");

        fetch(url).then(
            response => response.json()
        )
            .then(data => {

                this.setState({ widgets: data.WidgetsList });
            });
    }

    closeWidgetPopup(e) {
        this.getWidgets();
        this.props.closePopup(e);
    }

    render() {

        const cols = { lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 };


        return (
            <div>
                {moment(this.props.date).format("YYYY-MM-DD")}
            { this.state.widgets &&

                    <ResponsiveGridLayout key="widgetsList" className="layout" onDragStop={this.editLayout} onResizeStop={this.editLayout} margin={[20, 20]} cols={cols} draggableHandle={".grip, .widgetHeader"}>
                        {this.state.widgets.map(widget =>
                            <div key={"widget_" + widget.WidgetId} data-grid={{ x: widget.X, y: widget.Y, w: widget.Width, h: widget.Height, isResizable: true }}>
                                <WidgetElement
                                    widget={widget}
                                    isLoggedIn={true}
                                    deleteWidgetHandler={() => this.deleteWidget(widget.WidgetId)}
                                    openWidget={this.openWidget}
                                    closePopup={this.closeWidgetPopup}
                                />
                            </div>
                        )
                        }
                    </ResponsiveGridLayout>
                }
                </div>

        );
    }
}
