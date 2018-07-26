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
                items: [],
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
        this.itemChange = this.itemChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    //componentDidUpdate(prevProps) {
    //    this.getItems();
    //}

    getItems() {
        fetch('api/ListItems/' + this.props.widgetId).then(
            response => response.json()
        )
        .then(data => {
            this.setState({ items: data.Items });
        });
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            text: e.target.value
        })
    }

    itemChange(item: ListWidgetItem) {

        this.saveItem(item, () => {});
    }

    handleSubmit(e) {
        e.preventDefault();

        const newItem: ListWidgetItem = {
            ListItemId: 0,
            WidgetId: this.props.widgetId,
            Order: this.state.items.length,
            Label: this.state.text,
            Done: false,
            Note: 0
        };

        this.saveItem(newItem, (data) => {
            newItem.ListItemId = data.ListItemId;
            const items = this.state.items.concat(newItem);
            this.setState({ items: items, text: "" });

        });

      
    }

    saveItem(item: ListWidgetItem, callback: (data) => void) {

        fetch('api/ListItems',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            .then(function(response) { return response.json(); })
            .then((data) => {
                callback(data);
            });
    }

    deleteItem(index) {
        fetch('api/ListItems/' + index, {
            method: 'delete'
        }).then(
            response => response.json()
            )
            .then(data => {
                if (data.Success) {
                    this.getItems();
                }
                else {
                    alert("Item non supprimé");
                }
            });
    }

    static cn = "listWidget";
    render() {

        let listItems: ListWidgetItem[] = [];


        return (
                <form onSubmit={this.handleSubmit} className="listWidgetForm">
                    <div className="listTyping">
                        <input type="text" className="inputAddListValue" value={this.state.text} placeholder="Ajoute un item" onChange={this.handleChange} />
                        <button><i className="fas fa-plus fa-m"></i></button>
                </div>
                    <ul>
                    {this.state.items.map((item, index) => (
                        <ListWidgetListItem key={index} data={item} listType={this.state.listType} itemChangeHandler={this.itemChange} itemDeleteHandler={this.deleteItem} />
                        ))
                    }
                    </ul>
                </form>


        );
    }
}
