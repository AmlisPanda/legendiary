import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export interface DatePickerFieldProps {
    onChange: (ev: React.ChangeEvent<HTMLElement>) => void;
}
export interface DatePickerFieldState {
    date: Date;
}

export class DatePickerField extends React.Component<DatePickerFieldProps, DatePickerFieldState> {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
        this.onChange = this.onChange.bind(this);

    }

    onChange = date => this.setState({ date })

    render() {

        return (
            <DatePicker
                locale="fr-FR"
                onChange={this.onChange}
                selected={moment(this.state.date)}
            />
        );
    }
}