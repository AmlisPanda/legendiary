import * as React from 'react';

export interface ListWidgetListItemProps {
    listType: number;
    label: string;
}

export class ListWidgetListItem extends React.Component<ListWidgetListItemProps> {

    render() {

        let notation = [];
        if (this.props.listType === 2) {
            for (var i = 0; i < 5; i++) {
                notation.push(
                    (<i key={"note_" + i} className="far fa-star fa-s"></i>)
                )
            }
        }

        return (
            <li className={this.props.listType === 1 ? "strikethroughItem" : ""}>
                <div >
                    {this.props.label}
                    <i className="iconDelete fas fa-trash fa-xs"></i>
                </div>
                {notation}
            </li>

        );
    }
}
