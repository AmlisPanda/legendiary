import * as React from 'react';

export interface ImageWidgetProps {
    path: string;
}
export class ImageWidget extends React.Component<ImageWidgetProps> {

    render() {
        return (
            <img className="widgetImg" src={"images/" + this.props.path} alt="Image" title="Image" />
        );
    }
}
