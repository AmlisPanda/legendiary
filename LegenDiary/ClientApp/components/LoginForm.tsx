import * as React from 'react';
import { User } from './Models';
/** Material UI */
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export interface LoginFormProps {
    handlerLogin: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface LoginFormState {
    user: User;
    openDialog: boolean;
}
export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {


    constructor(props) {
        super(props);
        this.state = {
            user: {
                Email: "",
                Password: ""
            },
            openDialog: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        this.setState({ openDialog: true });
    }

    handleClose() {
        this.setState({ openDialog: false });
    }

    handleChange(event) {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    render() {
        const requiredText = "Ce champ est obligatoire";
        const actions = [
            <FlatButton
                label="OK, je ré-essaie !"
                primary={true}
                onClick={this.handleClose}
            />,];

        return (
            <ValidatorForm id="loginForm"
                onSubmit={this.handleSubmit}>
                <h2>Déjà inscrit ? Connecte-toi !</h2>

                <TextValidator name="Email" fullWidth={true} floatingLabelText="E-mail"
                    value={this.state.user.Email}
                    onChange={this.handleChange}
                    validators={['required', 'isEmail']}
                    errorMessages={[requiredText, 'L\'adresse mail n\'est pas valide']}
                />
                <TextValidator name="Password" type="password" fullWidth={true} floatingLabelText="Mot de passe"
                    value={this.state.user.Password}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={[requiredText]}
                />
                <RaisedButton id="BtnSignin" type="submit" primary={true} fullWidth={true} label="Se connecter" />

                <Dialog
                    title="Connexion impossible"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}
                >
                    E-mail et/ou mot de passe incorrect :(
                </Dialog>
            </ValidatorForm>

        );
    }
}
