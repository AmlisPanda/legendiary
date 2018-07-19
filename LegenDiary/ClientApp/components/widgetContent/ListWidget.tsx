import * as React from 'react';
import { ListWidgetItem, ListWidgetData } from '../Models';
import { ListWidgetListItem } from './ListWidgetListItem';

export interface ListWidgetProps {
    data: string;
    widgetId: number;
}
export interface ListWidgetState {
    text: string;
    dataObj: ListWidgetData;
    items: Array<ListWidgetItem>;
}

export class ListWidget extends React.Component<ListWidgetProps, ListWidgetState> {
    constructor(props) {
        super(props);


        const dataObj = JSON.parse(this.props.data);
        this.state = {
            dataObj: dataObj,
            items: dataObj.Items,
            text: ""
        }

        this.state.dataObj.WidgetId = this.props.widgetId;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            text: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const newItem: ListWidgetItem = {
            Order: this.state.dataObj.Items.length,
            Label: this.state.text
        };

        const newDataObj = this.state.dataObj;
        newDataObj.Items.concat(newItem);

        this.setState((prevState) => ({
            dataObj: newDataObj,
            items: newDataObj.Items,
            text: ''
        }));

        this.saveList(newDataObj);

       

        
    }

    saveList(dataObj) {

        fetch('api/Widgets/SaveList',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataObj)
            })
            .then(function(response) { return response.json(); })
            .then((data) => {
            });
    }

    static cn = "listWidget";
    render() {

        let listItems: ListWidgetItem[] = [];

        //if (this.props.listType === 1) {
        //    listItems = [
        //        { order: 0, label: "Pain" },
        //        { order: 1, label: "Jambon" },
        //        { order: 2, label: "Tomates" }
        //    ]
        //}
        //else if (this.props.listType === 2) {
        //    listItems = [
        //        { order: 0, label: "Minisizer" },
        //        { order: 1, label: "Black Panther" },
        //        { order: 2, label: "Maze runner" }
        //    ]
        //}

        return (
                <form onSubmit={this.handleSubmit} className="listWidgetForm">
                    <div className="listTyping">
                        <input type="text" className="inputAddListValue" value={this.state.text} placeholder="Ajoute un item" onChange={this.handleChange} />
                        <button><i className="fas fa-plus fa-m"></i></button>
                </div>
                {this.state.dataObj.Items.length}
                    <ul>
                    {this.state.dataObj.Items.map((item, index) => (
                            <ListWidgetListItem key={index} label={item.Label} listType={this.state.dataObj.ListType} />
                        ))
                    }
                    </ul>
                </form>


        );
    }
}
