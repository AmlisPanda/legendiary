import * as React from 'react';
import { TextWidget } from './TextWidget';


export interface WidgetProps {
    id: number;
    title: string;
    description: string;
    widgetType: number;
    data: string;
    cn?: string;
    w?: number;
    h?: number;
    isLoggedIn: boolean;
}
export interface WidgetState {
    isFavourite: boolean;
    cn: string;
}
export class WidgetElement extends React.Component<WidgetProps, WidgetState> {
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

    getWidgetContent() {
        switch (this.props.widgetType) {
            case 0:
                return <TextWidget html={this.props.data} />;
            default:
                return <TextWidget html={"Contenu non géré pour l'instant"} />;
        }
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
                <div className="widgetContent">
                    {this.getWidgetContent()}
                </div>
			</div>
		)
	}
}
