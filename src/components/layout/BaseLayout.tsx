import { Box } from '@mui/material'
import { Stack } from '@mui/material'
import { type PropsWithChildren } from 'react'

const BaseLayout = ({ children }: PropsWithChildren) => {
    return (
        <Box sx={{ backgroundColor: "lightgray" }}>
            <Stack alignItems="center" height="100vh" maxWidth={800} margin="0 auto" position='relative'>
                {children}
            </Stack>
        </Box >
    )
}

export default BaseLayout