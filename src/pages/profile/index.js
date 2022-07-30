import React from 'react';
import SettingsLayout from '../../layouts/Settings';
import EditProfile from './edit-profile';
function Profile() {
    return (
        <>
            <EditProfile />
        </>
    );
}

Profile.Layout = SettingsLayout;

export default Profile;
