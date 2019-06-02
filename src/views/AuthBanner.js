import React from 'react';

export default function AuthBanner({ user }) {
    if (user === null) {
        return null;
    }

    return (
        <div className="AuthBanner">
            {user.displayName} | {user.email}
        </div>
    );
}
