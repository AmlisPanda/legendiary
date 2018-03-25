import * as React from 'react';

 export interface UserConnectionProps {
     handlerLogin: (ev: React.MouseEvent<HTMLElement>) => void;
}
export class UserConnection extends React.Component<UserConnectionProps> {
    render() {

        return (
            <div id="userBlock">
                <button>S''inscrire</button>
                <button onClick={this.props.handlerLogin}>Se connecter</button>
            </div>
        );
    }
}
