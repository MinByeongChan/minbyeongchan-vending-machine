import { useEffect, useState } from "react"
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import type { Product } from "./types/schema"

function App() {
  const [productList, setProductList] = useState<Product[]>([])
  const [money, setMoney] = useState(0)
  const [step, setStep] = useState(0)

  const validMoeny = ['10000', '5000', '1000', '500', '100']

  const handleClickMoneyItem = (value: string) => {
    setMoney((prev) => prev + Number(value))
  }

  const handleClickSubmitButton = () => {
    if (!money) {
      alert('금액을 넣어주세요.')
      return
    }
    if (money < 600) {
      alert('최소 금액은 600원 입니다.')
      return
    }
    setStep(1)
  }

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/products')
    const data = await response.json()
    setProductList(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      {step === 0 && (
        <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Please put in the money, {money}
          </Typography>
          <List sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2
          }}>
            {validMoeny.map((item) => (<ListItemButton key={item} onClick={() => handleClickMoneyItem(item)}>{item}</ListItemButton>))}
          </List>
          <Box display="flex" flexDirection="row" gap={2} justifyContent="center" alignItems="center">
            <Button variant="contained" size="large" color="primary" onClick={handleClickSubmitButton} sx={{ height: '100%' }}>
              Submit
            </Button>
          </Box>

        </Box>
      )}

      {step === 1 && (
        <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Choose a drink which you want
          </Typography>

          <List sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2
          }}>
            {productList.map((item) => (
              <ListItem key={item.id} sx={{
                display: "flex",
                width: 200,
                flexDirection: "column",
                gap: 1,
                border: "1px solid black",
                padding: 2,
                borderRadius: 2,
                transition: "0.1s ease-in-out",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "lightgray"
                }
              }}>
                <ListItemText primary={item.name} />
                <ListItemText secondary={`₩${item.price}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

    </Stack >
  )
}

export default App
