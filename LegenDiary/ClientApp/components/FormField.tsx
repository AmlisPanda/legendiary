import * as React from 'react';
import { DatePickerField } from './DatePickerField'

export interface FormFieldProps {
    id?: string;
    name?: string;
    label: string;
    type: string;
    value?: string;
    changeHandler?: (ev: React.ChangeEvent<HTMLElement>) => void;
    required?: boolean;
}

export class FormField extends React.Component<FormFieldProps, {}> {

    render() {

        let input = null;

        if (this.props.type === "text")
            input = (<input type="text" onChange={this.props.changeHandler} id={this.props.id} name={this.props.name} />);
        else if (this.props.type === "password")
            input = (<input type="password" onChange={this.props.changeHandler} id={this.props.id} name={this.props.name} />);
        else if (this.props.type === "select") {
            input = (
                <select value={this.props.value} onChange={this.props.changeHandler} id={this.props.id} name={this.props.name} >
                    {this.props.children}
                </select>

            );
        }
        else if (this.props.type === "datepicker") {
            input = (<DatePickerField onChange={this.props.changeHandler}></DatePickerField>);
        }
        else if (this.props.type === "email") {
            input = <input type="email" onChange={this.props.changeHandler} id={this.props.id} name={this.props.name}  />;
        }

        return (
            <div className="field">
                <label>
                    {this.props.label}
                    {input}
                </label>
            </div>

        );
    }
}
