import React from 'react';
import { auth } from '../../../firebase';
function Private({ component: Component, ...rest }) {
    const user = auth.currentUser;
    return <div>Private</div>;
}

export default Private;
