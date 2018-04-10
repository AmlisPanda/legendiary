import * as React from 'react';
import { FormField } from './FormField';
import { RouteComponentProps } from 'react-router';
import { Subscriber } from './Models';
/** Material UI */
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export interface SubscribeFormState {
    subscriber: Subscriber;
    openDialog: boolean;
    dialogMsg: string;
}

export class SubscribeForm extends React.Component<{}, SubscribeFormState> {

    constructor(props) {
        super(props);
        this.state = {
            subscriber: {
                Login: "",
                Email: "",
                Password: "",
                PasswordConfirm: ""
            },
            openDialog: false,
            dialogMsg: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.subscriber.Password) {
                return false;
            }
            return true;
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        const user = this.state.subscriber;
        this.setState({ subscriber: user });


        let thisForm = this;

        fetch('api/Users/',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.subscriber)
            })
            .then(function (response) { return response.json(); })
            .then(function (data) {
                console.log(data);
                let dialogMsg = data.Message;
                return dialogMsg;
            }).then(function (dialogMsg) {
                thisForm.setState({ openDialog: true, dialogMsg: dialogMsg });
            });

    }

    handleChange(event) {
        //if (event.target.name !== "PasswordConfirm") {
        const { subscriber } = this.state;
        subscriber[event.target.name] = event.target.value;
        this.setState({ subscriber });
        //}

    }

    handleClose(event) {
        this.setState({ openDialog: false });
    }

    render() {

        const requiredText = "Ce champ est obligatoire";

        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleClose}
            />,];

        return (
            <ValidatorForm
                id="subscribeForm"
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <h2>Inscris-toi pour commencer ton Bujo !</h2>
                <TextValidator
                    name="Login"
                    fullWidth={true}
                    floatingLabelText="Login"
                    value={this.state.subscriber.Login}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={[requiredText]}
                />
                <TextValidator
                    name="Email"
                    fullWidth={true}
                    floatingLabelText="Adresse mail"
                    value={this.state.subscriber.Email}
                    onChange={this.handleChange}
                    validators={['required', 'isEmail']}
                    errorMessages={[requiredText, 'L\'adresse mail n\'est pas valide']}
                />
                <TextValidator name="Password" type="password" fullWidth={true} floatingLabelText="Mot de passe"
                    value={this.state.subscriber.Password}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={[requiredText]}
                />
                <TextValidator name="PasswordConfirm" type="password" fullWidth={true} floatingLabelText="Confirme ton mot de passe"
                    value={this.state.subscriber.PasswordConfirm}
                    onChange={this.handleChange}
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['Les mots de passe ne sont pas identiques', requiredText]}
                />
                <RaisedButton type="submit" primary={true} fullWidth={true} label="S'inscrire" />

                <Dialog
                    title="Inscription"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}
                >
                    {this.state.dialogMsg}
                </Dialog>
            </ValidatorForm>


        );
    }
}
