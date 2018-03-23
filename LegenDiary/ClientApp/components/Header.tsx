import * as React from 'react';
//import logo from './images/logo.jpg'; // relative path to image
import { Menu } from './Menu.js'
import { UserConnection } from './UserConnection.js'
import { User } from './User.js'
import { MouseEventHandler, EventHandler, MouseEvent } from 'react';

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
                    <img className="App-logo" src={logo} />
                    <h1 className="App-title">LegenDiary</h1>
                </div>

              {this.props.isLoggedIn &&
                  (<User handlerLogout={this.props.handlerLogout} />)
              }

              {this.props.isLoggedIn &&
                  <Menu selectedItem="0" isLoggedIn={this.props.isLoggedIn} />
              }

            </header>
        )
    }
}
