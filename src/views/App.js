import React, { Component } from 'react';
import {
    updateUser,
} from '../actions';
import AuthBanner from '../containers/AuthBanner';
import CssEditor from '../containers/CssEditor';
import StoryEditor from '../containers/StoryEditor';
import StoryIdEditor from '../containers/StoryIdEditor';
import StoryCanvas from '../containers/StoryCanvas';
import _get from 'lodash/get';
import '../App.css';
import firebaseConfig from '../configs/firebase';
import { getUrl } from '../utils/url';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const firebase = window.firebase;
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // FirebaseUI config.
        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    console.log(`%csign in succcess`, 'background:green; color:white; padding: 4px', authResult, redirectUrl);
                    return false; // Return false so that we don't have to redirect
                },
                signInFailure: function(error) {
                    console.error(`%csign in failure`, 'background:#F3121A; color:white; padding: 4px', error);
                    return error;
                }
            },
            signInSuccessUrl: '',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // Assert: user is signed in.
                // const {
                //     displayName,
                //     email,
                //     emailVerified,
                //     photoURL,
                //     isAnonymous,
                //     uid,
                //     providerData,
                // } = user;
                console.log(`%cUser already signed in`, 'background:green; color:white; padding: 4px');
            } else {
                console.log(`%cUser not signed in`, 'background:#F3121A; color:white; padding: 4px', 'Rendering Firebase login UI at #root');
                // Initialize the FirebaseUI Widget using Firebase.
                var ui = new window.firebaseui.auth.AuthUI(firebase.auth());
                // The start method will wait until the DOM is loaded.
                ui.start('#root', uiConfig);
            }
            this.props.updateUser(user);
        });

        const matches = window.location.search.match(/mode=(\w+)/);
        let mode = matches && matches[1];
        if (mode !== null) {
            if (window.history && window.history.pushState) {
                window.history.pushState({
                    mode,
                }, null, getUrl({ mode }));
            }

            this.props.updateMode(mode);
        }
    }


    render() {
        const newStory = this.props.newStory;
        const isEditMode = this.props.mode === 'edit';
        const userHasWritePermissions = _get(this.props, 'user.uid') === this.props.storyUserId;
        const hasGottenDataFromDatabase = this.props.receivedDataOnce;
        const hasUser = this.props.user !== null;
        if (hasUser && newStory
            || isEditMode && userHasWritePermissions && hasGottenDataFromDatabase) {
            return (
                <React.Fragment>
                    <AuthBanner />
                    <StoryIdEditor
                        setupFirebaseStoreBindings={this.props.setupFirebaseStoreBindings}
                    />
                    <StoryEditor />
                    <CssEditor />
                    <StoryCanvas />
                </React.Fragment>
            );
        } else if (hasUser) {
            return (
                <React.Fragment>
                    <AuthBanner />
                    <StoryIdEditor
                        setupFirebaseStoreBindings={this.props.setupFirebaseStoreBindings}
                    />
                    <StoryCanvas />
                </React.Fragment>
            );
        } else {
            return (<div>loading</div>);
        }
    }
}

export default App;
