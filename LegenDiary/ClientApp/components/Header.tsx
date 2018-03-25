import * as React from 'react';
import { Menu } from './Menu'
import { UserConnection } from './UserConnection'
import { User } from './User'
import { MouseEventHandler, EventHandler, MouseEvent } from 'react';

const logo = require('../images/logo.jpg');

export interface HeaderProps {
    isLoggedIn: boolean;
    handlerLogout: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export class Header extends React.Component<HeaderProps, {}> {

    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return (
            <header className="App-header">
                <div id="logoTitle">
                    <img className="App-logo" src={String(logo)} />
                    <h1 className="App-title">LegenDiary</h1>
                </div>

              {this.props.isLoggedIn &&
                  (<User />)
              }

                {this.props.isLoggedIn &&
                    <Menu selectedItem={0} isLoggedIn={this.props.isLoggedIn} />
              }

            </header>
        )
    }
}
