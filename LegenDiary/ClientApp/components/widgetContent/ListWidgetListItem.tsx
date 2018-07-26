import * as React from 'react';
import { ListWidgetItem } from 'ClientApp/components/Models';

export interface ListWidgetListItemProps {
    listType: number;
    data: ListWidgetItem;
    itemChangeHandler: (data: ListWidgetItem) => void;
    itemDeleteHandler: (itemId: number) => void;
}

interface ListWidgetListItemState {
    note: number;
}

export class ListWidgetListItem extends React.Component<ListWidgetListItemProps, ListWidgetListItemState> {

    constructor(props) {

        super(props);

        this.state = {
            note : this.props.data.Note
        }
    }

    noteChange(index) {
        this.props.data.Note = index + 1;
        this.props.itemChangeHandler(this.props.data);
        this.setState({ note: this.props.data.Note });
    }

   

    render() {

        let notation = [];

        if (this.props.listType == 2) {

            let starStyle;

            for (var i = 0; i < 5; i++) {

                if (i < this.state.note) {
                    starStyle = "fas";
                }
                else
                    starStyle = "far";

                notation.push(
                    (<i key={"note_" + i} className={starStyle + " fa-star fa-s iconStar"} onClick={this.noteChange.bind(this, i)}></i>)
                )
            }
        }

        const className = "listItem " + (this.props.listType == 1 ? "crossAllowed" : "");

        return (
            <li className={className}>
                <div>
                    <span>{this.props.data.Label}</span>
                    <i className="iconDelete fas fa-trash fa-xs" onClick={() => this.props.itemDeleteHandler(this.props.data.ListItemId)}></i>
                </div>
                {notation}
            </li>

        );
    }
}
