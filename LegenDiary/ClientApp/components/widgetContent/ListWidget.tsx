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
    }

    componentDidMount() {
        this.getItems();
    }

    //componentDidUpdate(prevProps) {
    //    this.getItems();
    //}

    getItems() {
        fetch('api/Widgets/ListItems/' + this.props.widgetId).then(
            response => response.json()
        )
        .then(data => {
            console.log(data);
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
            WidgetId: this.props.widgetId,
            Order: this.state.items.length,
            Label: this.state.text,
            Done: false,
            Note: 0
        };

        const items = this.state.items.concat(newItem);
        this.saveItem(newItem, () => { this.setState({ items: items, text: "" }) });

      
    }

    saveItem(item: ListWidgetItem, callback: () => void) {

        fetch('api/Widgets/ListItem',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            .then(function(response) { return response.json(); })
            .then((data) => {
                callback();
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
                        <ListWidgetListItem key={index} data={item} listType={this.state.listType} itemChangeHandler={this.itemChange}  />
                        ))
                    }
                    </ul>
                </form>


        );
    }
}
