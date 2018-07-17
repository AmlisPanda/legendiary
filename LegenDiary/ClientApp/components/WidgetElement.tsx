import * as React from 'react';
import { TextWidget } from './widgetContent/TextWidget';
import { ImageWidget } from './widgetContent/ImageWidget';
import { Widget } from './Models';
import { CreateWidgetForm } from './CreateWidgetForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export interface WidgetProps {
    widget: Widget;
    w?: number;
    h?: number;
    isLoggedIn: boolean;
    deleteWidgetHandler: (id: number) => void;
    openWidget: (ev: React.MouseEvent<HTMLElement>, w: Widget) => void;
    closePopup: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface WidgetState {
    isFavourite: boolean;
    openConfirm: boolean;
}
export class WidgetElement extends React.Component<WidgetProps, WidgetState> {
	constructor(props) {
		super(props);
		this.state = {
            isFavourite: false,
            openConfirm: false
		}
		this.handleFavClick = this.handleFavClick.bind(this);
        this.handleFavMouseOver = this.handleFavMouseOver.bind(this);
        this.closeConfirm = this.closeConfirm.bind(this);
        this.editWidget = this.editWidget.bind(this);
	}

    delete(event, needsConfirm: boolean) {
        if (needsConfirm)
            this.setState({ openConfirm: true });
        else
            this.props.deleteWidgetHandler(this.props.widget.WidgetId);
    }

    closeConfirm() {
        this.setState({ openConfirm: false });
    }

	handleFavClick() {
		const isFav = this.state.isFavourite;
		this.setState({
			isFavourite: !isFav
		});
	}

	handleFavMouseOver() {

    }

    editWidget(e) {
        console.log("WidgetElement");
        this.props.openWidget(e, this.props.widget);
    }

    getWidgetContent() {
        switch (this.props.widget.WidgetTypeId) {
            case 0:
                return <TextWidget html={this.props.widget.WidgetData} />;
            case 1:
                return <ImageWidget path={this.props.widget.WidgetData} />
            default:
                return <TextWidget html={"Contenu non géré pour l'instant"} />;
        }
    }

	render() {
        const isFav = this.state.isFavourite;
        const actions = [
            <FlatButton
                label="Non"
                secondary={true}
                onClick={this.closeConfirm}
            />,
            <FlatButton
                label="Oui"
                primary={true}
                onClick={(e) => this.delete(e, false)}
            />,];

        const w = this.props.widget;

        return (
            <div className="widget" data-wid={this.props.widget.WidgetId} >
				<div className="grip">
					<i className="fas fa-expand-arrows-alt" title="Agrandir"></i>
					{ this.props.isLoggedIn &&
                        <div className="widgetAdminIcons">
                            <i className="fas fa-cog" title="Configurer" onClick={this.editWidget}></i>
                            <i className="fas fa-trash" title="Supprimer" onClick={(e) => this.delete(e, true)}></i>
						</div>
					}

				</div>
                <header>
                    <h2 onClick={this.handleFavClick}>{w.Title}</h2>
                    <p className="description">{w.Subtitle}</p>

					<div className="widgetFav" onClick={this.handleFavClick} onMouseOver={this.handleFavMouseOver}>
						{isFav ?
							(<i className="fa-heart fa-lg fas"></i>) : (<i className="fa-heart fa-lg far"></i>)
						}
					</div>

				</header>
                <div className="widgetContent">
                    {this.getWidgetContent()}
                </div>

                <Dialog
                    title="Confirmation nécessaire"
                    actions={actions}
                    modal={false}
                    open={this.state.openConfirm}
                    onRequestClose={this.closeConfirm}
                >
                    Es-tu sûr de vouloir supprimer ce widget ?
                </Dialog>
			</div>
		)
	}
}
