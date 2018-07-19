import * as React from 'react';
import { Widget, ListWidgetData } from './Models';
import { FormField } from './FormField'
import { WidgetContentForm } from './WidgetContentForm'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { UserSession } from './UserSession';

export interface CreateWidgetFormProps {
    closePopup: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    widget?: Widget;
}
export interface CreateWidgetFormState {
    widget: Widget;
}

export class CreateWidgetForm extends React.Component<CreateWidgetFormProps, CreateWidgetFormState> {

    constructor(props) {
        super(props);
        const userData = UserSession.getAuthenticatedUser();
        let currentWidget: Widget;
        if (this.props.widget)
            currentWidget = this.props.widget;
        else
            currentWidget = {
                Title: "",
                Subtitle: "",
                WidgetData: "",
                AppuserId: userData.UserId,
                WidgetTypeId: 0,
                X: 0, Y: 0, Width: 1, Height: 1 
            }

        this.state = {
            widget: currentWidget
        }
        this.changeValue = this.changeValue.bind(this);
        this.listTypeChange = this.listTypeChange.bind(this);
        this.createWidget = this.createWidget.bind(this);
        this.updateData = this.updateData.bind(this);
        this.typeChange = this.typeChange.bind(this);
    }


    listTypeChange(e) {
        const data: ListWidgetData = {
            WidgetId: 0,
            ListType: e.target.value,
            Items: []
        };
        this.updateData(e, JSON.stringify(data));
    }

    typeChange(e) {
        const { widget } = this.state;
        widget.WidgetTypeId = Number(e.target.value);
        // Si liste, on crée un WidgetData par défaut
        if (widget.WidgetTypeId == 2) {
            const data: ListWidgetData = {
                WidgetId: 0,
                ListType: Number(e.target.value),
                Items: []
            };
            widget.WidgetData = JSON.stringify(data);
        }
        this.setState({ widget });
    }

    changeValue(event) {
        const { widget } = this.state;
        widget[event.target.name] = event.target.value;
        this.setState({ widget });
    }

    // Mise à jour de la data dans state
    updateData(event, data) {
        const { widget } = this.state;
        widget.WidgetData = data;
        this.setState({ widget });
    }

    createWidget(event) {

        fetch('api/Widgets/Save',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.widget)
            })
            .then(function (response) { return response.json(); })
            .then((data) => {
                let dialogMsg = data.Message;

                this.props.closePopup(event);

            });
    }

    render() {

        let title = (this.props.widget) ? "Modification du widget" : "Crée ton widget";

        return (

            <ValidatorForm id="widgetForm" ref="form"
                onSubmit={this.createWidget}>

                <h2>{title}</h2>

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

                <WidgetContentForm data={this.state.widget.WidgetData} contentType={this.state.widget.WidgetTypeId} updateDataHandler={this.updateData} />

                <button className="buttonForm">Sauvegarder</button>
            </ValidatorForm>
        );
    }
}
