import * as React from 'react';
import { User } from './Models';

 export interface UserConnectionProps {
     handlerLogin: (ev: React.MouseEvent<HTMLElement>) => void;
}
export interface UserConnectionState {
    user: User;
    openDialog: boolean;
    dialogMsg: string;
}

export class UserConnection extends React.Component<UserConnectionProps, UserConnectionState> {


    constructor(props) {
        super(props);
        this.state = {
            user: {
                Email: "",
                Password: "",
            },
            openDialog: false,
            dialogMsg: ""
        };
    }

    render() {

        return (
            <div id="userBlock">
                <button>S''inscrire</button>
                <button onClick={this.props.handlerLogin}>Se connecter</button>
            </div>
        );
    }
}
