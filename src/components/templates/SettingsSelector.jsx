import React, { useState, useEffect } from 'react';

import SettingButton from '../atoms/SettingButton'

function SettingsSelector() {
    return (
        <>
            <SettingButton title="Your account" selected={true}/>
            <SettingButton title="User options" selected={false}/>
            <SettingButton title="lists options" selected={false}/>
            <SettingButton title="Display" selected={false}/>
            <SettingButton title="Language" selected={false}/>
        </>
    )
}

export default SettingsSelector