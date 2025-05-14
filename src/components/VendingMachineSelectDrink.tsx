import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material"
import type { Product } from "../types/schema"
import { useEffect, useState } from "react"

interface SelectDrinkProps {
    selectedProduct: Product | null
    sumOfMoney: number
    onClickItem: (product: Product) => void
    onNext: () => void
}

export const VendingMachineSelectDrink = ({
    selectedProduct,
    sumOfMoney,
    onClickItem: handleClickProductItem,
    onNext: handleNext
}: SelectDrinkProps) => {
    const [productList, setProductList] = useState<Product[]>([])


    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/products')
        const data = await response.json()
        setProductList(data)
    }

    // 물품 아이템 리스트를 가져온다.
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
            <Typography variant="h4" component="h1" gutterBottom>
                Choose a drink which you want
            </Typography>

            {selectedProduct && (
                <Typography variant="h5" component="h1" gutterBottom>
                    Selected Drink: {selectedProduct?.name}
                </Typography>
            )}

            <List sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2
            }}>
                {productList.map((item) => (
                    <ListItem key={item.id} onClick={() => handleClickProductItem(item)} sx={{
                        display: "flex",
                        width: 200,
                        flexDirection: "column",
                        gap: 1,
                        border: "1px solid black",
                        padding: 2,
                        borderRadius: 2,
                        transition: "0.1s ease-in-out",
                        cursor: "pointer",
                        backgroundColor: "white",
                        ...(sumOfMoney < item.price && {
                            opacity: 0.5,
                            cursor: "not-allowed"
                        }),
                        ...(selectedProduct?.id === item.id && {
                            fontWeight: "bold",
                            backgroundColor: "primary.main"
                        }),
                        "&:hover": {
                            opacity: 0.7
                        },
                    }}>
                        <ListItemText primary={item.name} />
                        <ListItemText primary={`₩${item.price}`} />
                    </ListItem>
                ))}
            </List>

            {selectedProduct && (
                <Box display="flex" flexDirection="row" gap={2} justifyContent="center" alignItems="center">
                    <Button variant="contained" size="large" color="primary" onClick={handleNext} sx={{ height: '100%' }}>
                        Next
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default VendingMachineSelectDrink