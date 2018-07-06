import * as React from 'react';
//import GridLayout from 'react-grid-layout';

import { Widget } from './Models';
import { WidgetElement } from './WidgetElement';
import { UserSession } from './UserSession';
import { CreateWidgetForm } from './CreateWidgetForm';



interface WidgetsListProps {
    isLoggedIn: boolean;
    widgets: Widget[];
    userId: number;
    deleteWidgetHandler: (id: number) => void;
    editWidget: (ev: React.MouseEvent<HTMLButtonElement>, widget: Widget) => void;
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

    render() {

        //let openFct = (e, w) => (e) => this.openWidget(e, w);


        //let layout = [];
        //for (var i = 0; i < this.props.widgets.length; i++) {
        //    let widget = {
        //        i: "widget_" + this.props.widgets[i].WidgetId,
        //        x: 0,
        //        y: this.props.widgets[i].WidgetId,
        //        w: 2,
        //        h: 1
        //    }
        //    layout.push(widget);
        //}

        //var layout = [
        //    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
        //    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        //    { i: 'c', x: 4, y: 0, w: 1, h: 2 }
        //];
        //return (
        //    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        //        <div key="a">a</div>
        //        <div key="b">b</div>
        //        <div key="c">c</div>
        //    </GridLayout>
        //)


        return (
            <div id="widgetsList">
                {this.props.widgets.map(widget =>

                    <WidgetElement
                        widget={widget}
                        key={"widget_" + widget.WidgetId}
                        isLoggedIn={true}
                        deleteWidgetHandler={this.props.deleteWidgetHandler}
                        openWidget={this.openWidget}
                        closePopup={this.props.closePopup}
                        />
                )}
            
             
            </div>

        );
    }
}
