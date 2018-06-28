import * as React from 'react';
import { Widget } from './Models';
import { FormField } from './FormField'
import { WidgetContentForm } from './WidgetContentForm'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { sessionService } from 'redux-react-session';

export interface CreateWidgetFormState {
    widget: Widget;
    openDialog: boolean;
    dialogMsg: string;
}

export class CreateWidgetForm extends React.Component<{}, CreateWidgetFormState> {

    constructor(props) {
        super(props);
        const userData = sessionService.loadUser();
        this.state = {
            widget: {
                Title: "",
                Subtitle: "",
                WidgetData: "",
                AppuserId: userData.UserId,
                WidgetTypeId: 0
            }
            ,
            openDialog: false,
            dialogMsg: ""
        }
        this.changeValue = this.changeValue.bind(this);
        this.typeChange = this.typeChange.bind(this);
        this.createWidget = this.createWidget.bind(this);
    }


    typeChange(e) {
        //this.setState({ widget: { WidgetTypeId: e.target.value } })
    }

    changeValue(event) {
        const { widget } = this.state;
        widget[event.target.name] = event.target.value;
        this.setState({ widget });
    }

    createWidget() {
        let thisForm = this;
        fetch('api/Widgets',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.widget)
            })
            .then(function (response) { return response.json(); })
            .then(function (data) {
                console.log(data);
                let dialogMsg = data.Message;
  
                thisForm.setState({ openDialog: true, dialogMsg: "Widget créé" });

            });
    }

    render() {
        return (

            <ValidatorForm id="widgetForm" ref="form"
                onSubmit={this.createWidget}>

                <h2>Crée ton widget</h2>

                <TextValidator name="Title" fullWidth={true} floatingLabelText="Titre"
                    value={this.state.widget.Title}
                    onChange={this.changeValue}
                />

                <TextValidator name="Subtitle" fullWidth={true} floatingLabelText="Description"
                    value={this.state.widget.Subtitle}
                    onChange={this.changeValue}
                />

                <section>
                    <FormField label="Type de widget" type="select" value={this.state.widget.WidgetTypeId.toString()} changeHandler={this.typeChange}>
                        <option value="0">Texte</option>
                        <option value="1">Image</option>
                        <option value="2">Liste</option>
                        <option value="3">Mood tracker</option>
                    </FormField>
                    <FormField label="Date" type="datepicker"></FormField>
                    <FormField label="Confidentialité" type="select">
                        <option value="0">Seulement moi</option>
                        <option value="1">Public</option>
                    </FormField>
                </section>

                <WidgetContentForm contentType={this.state.widget.WidgetTypeId} />

                <button className="buttonForm">Créer</button>
            </ValidatorForm>
        );
    }
}
