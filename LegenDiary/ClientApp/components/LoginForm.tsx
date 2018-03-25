import * as React from 'react';
import { FormField } from './FormField'

export interface LoginFormProps {
    handlerLogin: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
export class LoginForm extends React.Component<LoginFormProps> {
    render() {
        return (
            <form id="loginForm">
                <h2>Déjà inscrit ? Connecte-toi !</h2>
                <FormField label="Adresse mail"  type="text" />
                <FormField label="Mot de passe"  type="password" />
                <a id="lnkForgotPassword">Mot de passe oublié</a>
                <button className="buttonForm" onClick={this.props.handlerLogin}>Se connecter</button>
            </form>

        );
    }
}
