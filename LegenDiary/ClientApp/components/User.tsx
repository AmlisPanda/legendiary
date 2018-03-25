import * as React from 'react';


export interface UserState {
    login: string;
}
export class User extends React.Component<{}, UserState> {

  constructor(props) {
  	super(props);
  	this.state = {
  	  login: "Amlis"
  	}
  }

	render() {

		return (
            <div id="userBlock">
                Bienvenue <span>{this.state.login}</span>
            </div>
		);
	}
}
