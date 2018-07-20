import * as React from 'react';
import { ListWidgetItem, ListWidgetData } from '../Models';
import { ListWidgetListItem } from './ListWidgetListItem';

export interface ListWidgetProps {
    data: string;
    widgetId: number;
}
export interface ListWidgetState {
    text: string;
    items: Array<ListWidgetItem>;
    listType: number;
}

export class ListWidget extends React.Component<ListWidgetProps, ListWidgetState> {
    constructor(props) {
        super(props);

        let dataObj = null;

        try {
            dataObj = JSON.parse(this.props.data);
            //dataObj.WidgetId = this.props.widgetId;
            this.state = {
                items: dataObj.Items,
                text: "",
                listType: dataObj.ListType
            }
        }
        catch (e) {
            this.state = {
                items: [],
                text: "",
                listType: 0
            }
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveList = this.saveList.bind(this);
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
            Order: this.state.items.length,
            Label: this.state.text,
            Done: false,
            Note: 0
        };

        const items = this.state.items.concat(newItem);
        console.log(items);
        this.saveList({
            ListType: this.state.listType,
            Items: items,
            WidgetId: this.props.widgetId
        });

      
    }

    saveList(dataObj: ListWidgetData) {

        fetch('api/Widgets/SaveList',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataObj)
            })
            .then(function(response) { return response.json(); })
            .then((data) => {
                this.setState((prevState) => ({
                    items: dataObj.Items,
                    text: ''
                }));
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
                    <ul>
                    {this.state.items.map((item, index) => (
                            <ListWidgetListItem key={index} label={item.Label} listType={this.state.listType} />
                        ))
                    }
                    </ul>
                </form>


        );
    }
}
