import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
const { vw, vh, vmin, vmax } = require('react-native-viewport-units')

function SettingsDropDown () {
  const [setting, setSettings] = React.useState('')

  const handleChange = (event) => {
    setSettings(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel style={{ position: 'float', transform: 'none' }}>{'Settings'}</InputLabel>
        <Select
          value={setting}
          label="Setting"
          onChange={handleChange}
        >
          <MenuItem value={'profile'}>User Profile</MenuItem>
          <MenuItem value={'subscription'}>Subscription</MenuItem>
          <MenuItem value={'reportBug'}>Report Bug</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SettingsDropDown
