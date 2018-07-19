import * as React from 'react';
import CKEditor from "react-ckeditor-component";
import { FormField } from './FormField'
import { TextWidgetForm } from './widgetContentForms/TextWidgetForm';
import { ImageWidgetForm } from './widgetContentForms/ImageWidgetForm';
import { ListWidgetData } from './Models';

export interface WidgetContentFormProps {
    data: string;
    contentType: number;
    updateDataHandler: (ev: React.MouseEvent<HTMLElement>, data: string) => void;
}

export interface WidgetContentFormState {
    content: string;
}

export class WidgetContentForm extends React.Component<WidgetContentFormProps, WidgetContentFormState> {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data
        }

        this.listTypeChange = this.listTypeChange.bind(this);
    }

    listTypeChange(e) {
        const data: ListWidgetData = {
            WidgetId: 0,
            ListType: Number(e.target.value),
            Items: []
        };
        this.props.updateDataHandler(e, JSON.stringify(data));
    }

    render() {
        const contentType = this.props.contentType;
        let content = null;
        if (contentType === 0) {
            content = <TextWidgetForm data={this.state.content} updateDataHandler={this.props.updateDataHandler} />
        }
        else if (contentType === 1) {
            content = <ImageWidgetForm data={this.state.content} updateDataHandler={this.props.updateDataHandler} />
        }
        else if (contentType === 2) {
            content =
                <FormField label="Type de liste" type="select" changeHandler={this.listTypeChange}>
                    <option value="0">Liste simple</option>
                    <option value="1">Todo-list</option>
                    <option value="2">Liste avec notation</option>
                    <option value="3">Liste de priorités</option>
                </FormField>;
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}
