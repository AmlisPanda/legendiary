import * as React from 'react';


export interface WidgetProps {
    title: string;
    description: string;
    cn?: string;
    w?: number;
    h?: number;
    isLoggedIn: boolean;
}
export interface WidgetState {
    isFavourite: boolean;
    cn: string;
}
export class Widget extends React.Component<WidgetProps, WidgetState> {
	constructor(props) {
		super(props);
		this.state = {
			cn: "widget " + this.props.cn,
			isFavourite: false
		}
		this.handleFavClick = this.handleFavClick.bind(this);
		this.handleFavMouseOver = this.handleFavMouseOver.bind(this);
	}

	handleFavClick() {
		const isFav = this.state.isFavourite;
		this.setState({
			isFavourite: !isFav
		});
	}

	handleFavMouseOver() {

	}

	render() {
		const isFav = this.state.isFavourite;
		return (
			<div className={this.state.cn} >
				<div className="grip">
					<i className="fas fa-expand-arrows-alt" title="Agrandir"></i>
					{ this.props.isLoggedIn &&
						<div className="widgetAdminIcons">
							<i className="fas fa-cog" title="Configurer"></i>
							<i className="fas fa-trash" title="Supprimer"></i>
						</div>
					}

				</div>
				<header>
					<h2 onClick={this.handleFavClick}>{this.props.title}</h2>
					<p className="description">{this.props.description}</p>

					<div className="widgetFav" onClick={this.handleFavClick} onMouseOver={this.handleFavMouseOver}>
						{isFav ?
							(<i className="fa-heart fa-lg fas"></i>) : (<i className="fa-heart fa-lg far"></i>)
						}
					</div>

				</header>
				<div className="widgetContent">{this.props.children}</div>
			</div>
		)
	}
}
