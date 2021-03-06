import * as React from 'react';

export interface TextWidgetProps {
    html: string;
}
export class TextWidget extends React.Component<TextWidgetProps> {
	static cn = "textWidget";
	render() {
		return (
			<p dangerouslySetInnerHTML={{__html: this.props.html}}></p>

		);
	}
}
