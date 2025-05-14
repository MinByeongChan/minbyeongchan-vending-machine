import { Box, Typography } from "@mui/material"
import type { Product } from "../types/schema"

interface VendingMachineResultProps {
    selectedProduct: Product
    sumOfMoney: number
}

const VendingMachineResult = ({ selectedProduct, sumOfMoney }: VendingMachineResultProps) => {
    return (
        <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
            <Typography variant="h4" component="h1" gutterBottom>
                주문하신 음료가 나왔습니다.
            </Typography>
            <Box display="flex" flexDirection="row" gap={2} justifyContent="center" alignItems="center">
                <Typography variant="h2" component="h1" fontWeight="bold" sx={{
                    color: "primary.main",
                    textDecoration: "underline"
                }}>
                    {selectedProduct.name}
                </Typography>
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
                거스름돈: {sumOfMoney - selectedProduct.price}
            </Typography>
        </Box>
    )
}

export default VendingMachineResult