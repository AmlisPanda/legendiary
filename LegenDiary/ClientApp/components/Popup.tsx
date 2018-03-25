import * as React from 'react';
import { MouseEventHandler, EventHandler, MouseEvent } from 'react';
import { CreateWidgetForm } from './CreateWidgetForm'

export interface PopupProps {
    active: boolean;
    handlerTogglePopup: (ev: React.MouseEvent<HTMLElement>) => void;
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
            <div id="popupContainer" className={this.props.active ? "active" : ""} onClick={this.props.handlerTogglePopup}>

                <form onClick={this.formClick}>
                    <a title="Fermer" className="closeButton" onClick={this.props.handlerTogglePopup}>
                        <i className="fa-2x fas fa-window-close"></i>
                    </a>

                    <CreateWidgetForm />
                </form>
            </div>
        )
    }
}
