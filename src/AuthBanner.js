import React, { Component } from 'react';

export default class AuthBanner extends Component {
    constructor() {
        super();
        this.state = {
            displayName: null,
            email: null,
            emailVerified: null,
            photoURL: null,
            isAnonymous: null,
            uid: null,
            providerData: null,
            error: null,
        };
    }

    componentDidMount() {
        const firebase = window.firebase;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const {
                    displayName,
                    email,
                    emailVerified,
                    photoURL,
                    isAnonymous,
                    uid,
                    providerData,
                } = user;
                // User is signed in.
                this.setState({
                    displayName,
                    email,
                });
            } else {
                this.setState({ error: true });
            }
        });
    }

    render() {
        return (
            <div className="auth_banner" style={{ background: '#FFF7E5', padding: 4 }}>
                {this.state.displayName} | {this.state.email}
            </div>
        );
    }
}