import * as React from 'react';


export interface ImageWidgetFormProps {
    data: string;
    updateDataHandler: (ev: React.MouseEvent<HTMLElement>, data: string) => void;
}

export interface ImageWidgetFormState {
    content: string;
}

export class ImageWidgetForm extends React.Component<ImageWidgetFormProps, ImageWidgetFormState> {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data
        }
        this.updateData = this.updateData.bind(this);
    }

    handleChange(event, selectorFiles: FileList)
    {
        const acceptedTypes = ["image/png", "image/jpeg"];

        const updateData = (data) => {
            this.updateData(event, data);
        }
            
        if (selectorFiles && selectorFiles.length > 0) {

            let file = selectorFiles[0];

            if (file && acceptedTypes.indexOf(file.type) > -1) {

                let reader = new FileReader();
                reader.onloadend = function () {
                    updateData(this.result);
                }
                reader.readAsDataURL(file);
            }

        }

        //var newContent = evt.editor.getData();
        //this.setState({
        //    content: newContent
        //})
        //this.props.updateDataHandler(evt, newContent);
    }

    updateData(event, newContent) {
        this.props.updateDataHandler(event, newContent);
    }

    render() {

        return <input type="file" id="inputImage" onChange={(e) => this.handleChange(e, e.target.files)} />

    }
}
