import * as React from 'react';
import { MouseEventHandler, EventHandler, MouseEvent } from 'react';
import { CreateWidgetForm } from './CreateWidgetForm'

export interface PopupProps {
    closePopup: (ev: React.MouseEvent<HTMLElement>) => void;
}

export class Popup extends React.Component<PopupProps> {

    constructor(props) {
       super(props);
       this.formClick = this.formClick.bind(this);
    }

    formClick(e) {
        e.stopPropagation();
    }

    render() {
        return(
            <div id="popupContainer" className="active" onClick={this.props.closePopup}>

                <div className="popup" onClick={this.formClick}>
                    <a title="Fermer" className="closeButton" onClick={this.props.closePopup}>
                        <i className="fa-2x fas fa-window-close"></i>
                    </a>

                    {this.props.children}
                </div>
            </div>
        )
    }
}
