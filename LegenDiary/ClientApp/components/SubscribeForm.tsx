import * as React from 'react';
import { FormField } from './FormField';
import { RouteComponentProps } from 'react-router';
import { Subscriber } from './Models';
import * as models from './Models';
/** Material UI */
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export interface SubscribeFormState {
    subscriber: Subscriber;
}

export class SubscribeForm extends React.Component<{}, SubscribeFormState> {

    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
    }

    formToJson = elements => [].reduce.call(elements, (data, element) => {
        if (element.id)
            data[element.id] = element.value;
        data["Subscription_Date"] = new Date();
        return data;
    }, {});


    handleCreate(e) {
        e.preventDefault();
        let form: Element = document.getElementById('subscribeForm');
        fetch('api/AppUsers/',
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.formToJson(form))
            }).then(function (response) {
                return console.log(response);
            });
    }

    render() {

        return (
            <form id="subscribeForm">
                <h2>Inscris-toi pour commencer ton Bujo !</h2>
                <TextField id="AppUserLogin" fullWidth={true}  floatingLabelText="Login" />
                <TextField id="Email" fullWidth={true}  floatingLabelText="Adresse mail" />
                <TextField id="EncryptedPassword" fullWidth={true}  floatingLabelText="Mot de passe" />
                <TextField id="PasswordConfirm" fullWidth={true}  floatingLabelText="Confirme ton mot de passe" />
                <RaisedButton type="submit" primary={true}  fullWidth={true}  label="S'inscrire" onClick={this.handleCreate} />
            </form>
        );
    }
}
