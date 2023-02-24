import React, { useState, useEffect } from 'react';

import SettingButton from '../atoms/SettingButton'

function SettingsSelector({ setSettingSelection, settingSelection }) {
    return (
        <>
            <SettingButton onClick={()=>setSettingSelection("Your account")} settingSelection={settingSelection} title="Your account" selected={ settingSelection == "Your account" }/>
            <SettingButton onClick={()=>setSettingSelection("User options")} settingSelection={settingSelection} title="User options" selected={ settingSelection == "User options" }/>
            <SettingButton onClick={()=>setSettingSelection("Lists options")} settingSelection={settingSelection} title="Lists options" selected={ settingSelection == "Lists options" }/>
            <SettingButton onClick={()=>setSettingSelection("Display")} settingSelection={settingSelection} title="Display" selected={ settingSelection == "Display" }/>
        </>
    )
}

export default SettingsSelector