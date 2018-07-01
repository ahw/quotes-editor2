import React from 'react';

export default function AuthBanner({ user }) {
    if (user === null) {
        return null;
    }

    return (
        <div className="auth-banner">
            {user.displayName} | {user.email}
        </div>
    );
}