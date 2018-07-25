import * as React from 'react';
import CKEditor from "react-ckeditor-component";
import { FormField } from './FormField'
import { TextWidgetForm } from './widgetContentForms/TextWidgetForm';
import { ImageWidgetForm } from './widgetContentForms/ImageWidgetForm';
import { ListWidgetData, Widget } from './Models';

export interface WidgetContentFormProps {
    widget: Widget;
    updateDataHandler: (ev: React.MouseEvent<HTMLElement>, data: string) => void;
}

export interface WidgetContentFormState {
    content: string;
    listType: string;
}

export class WidgetContentForm extends React.Component<WidgetContentFormProps, WidgetContentFormState> {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.widget.WidgetData,
            listType: "0"
        }

        if (props.contentType === 2) {
            const data = JSON.parse(this.state.content);
            this.setState({ listType: data.ListType });
        }

        this.listTypeChange = this.listTypeChange.bind(this);
    }

    listTypeChange(e) {
        const data: ListWidgetData = {
            ListType: Number(e.target.value),
        };
        
        this.props.updateDataHandler(e, JSON.stringify(data));

        this.setState({ listType: data.ListType.toString() });
    }

    render() {
        const contentType = this.props.widget.WidgetTypeId;

        let content = null;
        if (contentType === 0) {
            content = <TextWidgetForm data={this.state.content} updateDataHandler={this.props.updateDataHandler} />
        }
        else if (contentType === 1) {
            content = <ImageWidgetForm data={this.state.content} updateDataHandler={this.props.updateDataHandler} />
        }
        else if (contentType === 2 && this.props.widget.WidgetId == 0) {
            content =
                <FormField label="Type de liste" type="select" changeHandler={this.listTypeChange} value={this.state.listType}>
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
