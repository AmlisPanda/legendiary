import * as React from 'react';
import { MenuItem } from './MenuItem'

export interface MenuProps {
    selectedItem: number;
    isLoggedIn: boolean;
}
export interface MenuState {
    selectedIndex: number;
}

export class Menu extends React.Component<MenuProps, MenuState> {

	constructor(props) {
		super(props);
		this.state = {
		  selectedIndex: props.selectedItem
		}
	  }

	render() {
		return (
			<nav id="nav">
				<MenuItem label="Accueil" isSelected={this.state.selectedIndex === 0} />
				<MenuItem label="Mes widgets" isSelected={this.state.selectedIndex === 1} />
				<MenuItem label="Rechercher un bujo" isSelected={this.state.selectedIndex === 2} />
			</nav>
		);
	}
}
