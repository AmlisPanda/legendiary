import * as React from 'react';
import { FormField } from './FormField'
/** Material UI */
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export interface LoginFormProps {
    handlerLogin: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
export class LoginForm extends React.Component<LoginFormProps, {}> {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form id="loginForm">
                <h2>Déjà inscrit ? Connecte-toi !</h2>

                <TextField name="SigninEmail" fullWidth={true} floatingLabelText="wewe" />
                <TextField name="SigninPw" fullWidth={true} floatingLabelText="Mot de passe" />
                <RaisedButton id="BtnSignin" type="submit" primary={true} fullWidth={true} label="Se connecter" onClick={this.props.handlerLogin} />

            </form>

        );
    }
}
