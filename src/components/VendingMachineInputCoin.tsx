import { Box, Button, List, ListItemButton, Typography } from "@mui/material"
import { VALID_MONEY } from "../constants"

interface InputCoinProps {
    sumOfMoney: number
    onMoneyClick: (value: string) => void
    onSubmit: () => void
}

export const VendingMachineInputCoin = ({ sumOfMoney, onMoneyClick, onSubmit }: InputCoinProps) => {
    return (
        <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
            <Typography variant="h4" component="h1" gutterBottom>
                Please put in the money, {sumOfMoney}
            </Typography>
            <List sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2
            }}>
                {VALID_MONEY.map((item) => (
                    <ListItemButton key={item} onClick={() => onMoneyClick(item)}>
                        {item}
                    </ListItemButton>
                ))}
            </List>
            <Box display="flex" flexDirection="row" gap={2} justifyContent="center" alignItems="center">
                <Button variant="contained" size="large" color="primary" onClick={onSubmit} sx={{ height: '100%' }}>
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default VendingMachineInputCoin