import * as React from 'react';


export interface ImageWidgetProps {
    imageUrl: string;
    title: string;
}
export class ImageWidget extends React.Component<ImageWidgetProps> {
	static cn = "imageWidget";
	render() {
		return (
			<img src={this.props.imageUrl} alt={this.props.title} title={this.props.title}  />
		);
	}
}
