import * as React from 'react';
import CKEditor from "react-ckeditor-component";

export interface TextWidgetFormProps {
    data: string;
    updateDataHandler: (ev: React.MouseEvent<HTMLElement>, data: string) => void;
}

export interface TextWidgetFormState {
    content: string;
}

export class TextWidgetForm extends React.Component<TextWidgetFormProps, TextWidgetFormState> {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data
        }
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(evt) {
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        })
        this.props.updateDataHandler(evt, newContent);
    }

    render() {

        return <CKEditor
            content={this.state.content}
            events={{
                "change": this.onChange
            }}
        />;
      
    }
}
