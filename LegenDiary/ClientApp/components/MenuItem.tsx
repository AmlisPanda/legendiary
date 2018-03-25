import * as React from 'react';

export interface MenuItemProps {
    label: string;
    isSelected: boolean;
}
export interface MenuItemState {
    isSelected: boolean;
}

export class MenuItem extends React.Component<MenuItemProps, MenuItemState> {
	constructor(props) {
		super(props);
		this.state = {
		  isSelected: props.isSelected || false
		}
	}
	render() {
		const selected = this.state.isSelected;
		return (
			<a className={selected ? 'active' : ''}>{this.props.label}</a>
		);
	}
}
