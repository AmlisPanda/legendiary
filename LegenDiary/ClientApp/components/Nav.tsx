import * as React from 'react';
import { NavItem } from './NavItem'
import { UserSession } from './UserSession'
import { Component } from 'react';
import { CreateWidgetForm } from './CreateWidgetForm';

interface NavProps {
    createWidget: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    closePopup: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    handlerLogout: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    active: boolean;
    toggleNav: (event: React.MouseEvent<HTMLElement>, show: boolean) => void;
}
interface NavState {
    active: boolean;
}
export class Nav extends React.Component<NavProps, NavState> {

    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active
        }

        this.onNavLeave = this.onNavLeave.bind(this);
    }

    onNavLeave(e) {
        this.setState({ active: false });
    }

    toggleSubMenu(e) {
        var target = e.target;
        var ul = target.parentElement.parentElement.querySelector("ul");
        if (ul.style.display == "none") {
            // Opening
            ul.style.display = "block";
            target.className = "active";
        }
        else {
            // Closing
            ul.style.display = "none";
            target.className = "";
        }
            
    }

    render() {
        return (
            <ul id="toolsNav" className={this.props.active ? 'active' : 'inactive' }>
                <NavItem iconCn="fas fa-plus fa-lg" label="Nouveau widget" handlerClick={this.props.createWidget} />
                <NavItem iconCn="fas fa-file-alt fa-lg" label="Affichage" >
                    <NavItem label="Jour"></NavItem>
                    <NavItem label="Mois"></NavItem>
                    <NavItem label="Semaine"></NavItem>
                    <NavItem label="Année"></NavItem>
                </NavItem>
                <NavItem iconCn="fas fa-user-circle fa-lg" label="Mon profil" />
                <NavItem iconCn="far fa-star fa-lg" label="Préférences" />
                <NavItem iconCn="fas fa-share-alt fa-lg" label="Partager" />
                <NavItem iconCn="fas fa-sign-out-alt fa-lg red" label="Se déconnecter" handlerClick={this.props.handlerLogout} />
            </ul>
        );
    }
}
