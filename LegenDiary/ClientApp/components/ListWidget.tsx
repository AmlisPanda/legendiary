import * as React from 'react';
import { ListWidgetListItem } from './ListWidgetListItem.js'

type ListItem = {
    order: number;
    label: string;
}
export interface ListWidgetProps {
    listType: number;
}
export interface ListWidgetState {
    items: Array<ListItem>;
    text: string;
}

export class ListWidget extends React.Component<ListWidgetProps, ListWidgetState> {
    constructor(props) {
       super(props);

       this.state = {
           items: [
               { order: 0, label: "Pain" },
               { order: 1, label: "Jambon" },
               { order: 2, label: "Tomates" },
            ],
           text: ""
       }

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

        const newItem = {
            order: this.state.items.length,
            label: this.state.text
        };
        this.setState(prevState => ({
          items: prevState.items.concat(newItem),
          text: ''
        }));
    }

    static cn = "listWidget";
    render() {

        let listItems:Array<ListItem> =[];

        if (this.props.listType === 1) {
            listItems = [
                { order: 0, label: "Pain" },
                { order: 1, label: "Jambon" },
                { order: 2, label: "Tomates" }
            ]
        }
        else if (this.props.listType === 2) {
            listItems = [
                { order: 0, label: "Minisizer" },
                { order: 1, label: "Black Panther" },
                { order: 2, label: "Maze runner" }
            ]
        }

        this.setState({
            items: listItems
        });
        return (
                <form onSubmit={this.handleSubmit}>
                    <div className="listTyping">
                        <input type="text" className="inputAddListValue" value={this.state.text} placeholder="Ajoute un item" onChange={this.handleChange} />
                        <button><i className="fas fa-plus fa-m"></i></button>
                    </div>

                    <ul>
                        {   this.state.items.map(item => (
                                <ListWidgetListItem key={item.order} label={item.label} listType={this.props.listType} />
                            ))
                        }
                    </ul>
                </form>


        );
    }
}
