import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

if (typeof window !== 'undefined') {
    const firebase = window.firebase;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC2NBoMVXNoCsI-iGeC6rgUMhb2zgAeCDg",
        authDomain: "quotes-editor.firebaseapp.com",
        databaseURL: "https://quotes-editor.firebaseio.com",
        projectId: "quotes-editor",
        storageBucket: "quotes-editor.appspot.com",
        messagingSenderId: "176170727244"
    };
    firebase.initializeApp(config);

    // FirebaseUI config.
    var uiConfig = {
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

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new window.firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#root', uiConfig);

    // ReactDOM.render(
    //     <App />,
    //     document.getElementById('root')
    // );
}

// That's right, no server-side rendering whatsoever.
