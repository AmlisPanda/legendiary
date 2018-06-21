import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from './Models';
/** Material UI */
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

interface LoginFormProps {
    onSuccess: (ev: React.MouseEvent<HTMLButtonElement>, data: object) => void;
}
interface LoginFormState {
    user: User;
    openDialog: boolean;
    dialogMsg: string;
}
export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {


    constructor(props) {
        super(props);
        this.state = {
            user: {
                Email: "",
                Password: ""
            },
            openDialog: false,
            dialogMsg: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    

    handleSubmit(e) {
        e.preventDefault();

        const user = this.state.user;
        this.setState({ user: user });

        let thisForm = this;

        const onSuccessFct = this.props.onSuccess;

        fetch('api/Users/Login',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.user)
            })
            .then(function (response) { return response.json(); })
            .then(function (data) {
                console.log(data);
                let dialogMsg = data.Message;
                if (!data.Success) {
                    thisForm.setState({ openDialog: true, dialogMsg: dialogMsg });
                }
                else {
                    onSuccessFct(e, data);
                }
            });
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

        //const { redirectToUserHome } = this.state

        //if (redirectToUserHome === true)
        //{
        //    <Redirect to='/user' />
        //}


        return (

            <ValidatorForm id="loginForm" ref="form"
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
                    {this.state.dialogMsg}
                </Dialog>
            </ValidatorForm>

        );
    }
}