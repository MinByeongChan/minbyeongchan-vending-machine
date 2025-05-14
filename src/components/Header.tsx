import { Box, Button, Typography } from "@mui/material"

interface HeaderProps {
    sumOfMoney: number
    onBackClick: () => void
    onResetClick: () => void
    step: number
}

export const Header = ({ sumOfMoney, onBackClick, onResetClick, step }: HeaderProps) => {
    return (
        <Box width="100%" display="flex" justifyContent="space-between" marginTop={2}>
            <Box display="flex" gap={2}>
                <Button variant="contained" color="primary" onClick={onBackClick} disabled={step === 0}>
                    ⬅
                </Button>
                <Button variant="contained" color="primary" onClick={onResetClick} disabled={sumOfMoney === 0}>
                    <Typography variant="h5">⟳</Typography>
                </Button>
            </Box>

            <Typography variant="h4" component="h4">
                넣은 금액 : {sumOfMoney}
            </Typography>
        </Box>
    )
}

export default Header