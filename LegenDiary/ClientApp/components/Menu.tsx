import * as React from 'react';
import { MenuItem } from './MenuItem'

export interface MenuProps {
    selectedItem: number;
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
				<MenuItem label="Jour" isSelected={this.state.selectedIndex === 0} />
				<MenuItem label="Semaine" isSelected={this.state.selectedIndex === 1} />
                <MenuItem label="Mois" isSelected={this.state.selectedIndex === 2} />
                <MenuItem label="Année" isSelected={this.state.selectedIndex === 3} />
			</nav>
		);
	}
}
