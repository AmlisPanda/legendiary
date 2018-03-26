import * as React from 'react';
import { FormField } from './FormField';
import { RouteComponentProps } from 'react-router';
import { Subscriber } from './Models';
import * as models from './Models';


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
                <FormField id="AppUserLogin" label="Login" type="text"  />
                <FormField id="Email" label="Adresse mail" type="text"  />
                <FormField id="EncryptedPassword" label="Mot de passe" type="password"  />
                <FormField label="Confirme ton mot de passe"  type="password" />
                <button className="buttonForm" onClick={this.handleCreate}>S'inscrire</button>
            </form>
        );
    }
}
