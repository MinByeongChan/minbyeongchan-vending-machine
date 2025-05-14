import { useEffect, useState } from "react"
import { Stack, Typography } from "@mui/material"
import type { Product, RemainedCoin } from "./types/schema"
import VendingMachineInputCoin from "./components/VendingMachineInputCoin"
import Header from "./components/Header"
import VendingMachineSelectDrink from "./components/VendingMachineSelectDrink"
import VendingMachineResult from "./components/VendingMachineResult"
import BaseLayout from "./components/layout/BaseLayout"

function App() {
  const defaultMoney = {
    "100": 0,
    "500": 0,
    "1000": 0,
    "5000": 0,
    "10000": 0
  }

  const [step, setStep] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [money, setMoney] = useState<RemainedCoin>(defaultMoney)
  const [remainedCoin, setRemainedCoin] = useState<RemainedCoin>(defaultMoney)
  const sumOfMoney = Object.entries(money).reduce((acc, [key, value]) => acc + (Number(key) * value), 0)

  const isDisorder = remainedCoin && Object.values(remainedCoin).reduce((acc, value) => acc + value, 0) === 0

  const handleClickBackButton = () => {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const handleClickResetButton = () => {
    if (window.confirm('동전을 반환 하시겠습니까?')) {
      setMoney(defaultMoney)
    }
  }


  const handleClickMoneyItem = (value: string) => {
    setMoney((prev) => ({
      ...prev,
      [value]: prev[value as keyof RemainedCoin] + 1
    }))
  }

  const fetchRemainedCoin = async () => {
    const res = await fetch(`http://localhost:3000/remainedCoin`)
    const fetchedData = await res.json()
    return fetchedData
  }

  const updateRemainedCoin = async (remainedCoin: RemainedCoin) => {
    const res = await fetch(`http://localhost:3000/remainedCoin`, {
      method: 'PUT',
      body: JSON.stringify(remainedCoin)
    })
    const updatedRemainedCoin = await res.json()
    return updatedRemainedCoin
  }


  const handleNext = async () => {
    setStep((prev) => prev + 1)
  }

  const handleClickSubmitButton = () => {
    const isEmptyMoney = Object.values(money).every((value) => value === 0)
    if (isEmptyMoney) {
      alert('금액을 넣어주세요.')
      return
    }
    if (sumOfMoney < 600) {
      alert('최소 금액은 600원 입니다.')
      return
    }
    handleNext()
  }

  const handleClickNextButton = async () => {
    if (!selectedProduct) return;
    let remain = sumOfMoney - selectedProduct.price
    const calculatedRemainedCoin = defaultMoney
    if (remain > 0) {
      while (remain > 0) {
        if (remain >= 10000) {
          remain -= 10000
          calculatedRemainedCoin['10000'] += 1
        } else if (remain >= 5000) {
          remain -= 5000
          calculatedRemainedCoin['5000'] += 1
        } else if (remain >= 1000) {
          remain -= 1000
          calculatedRemainedCoin['1000'] += 1
        } else if (remain >= 500) {
          remain -= 500
          calculatedRemainedCoin['500'] += 1
        } else if (remain >= 100) {
          remain -= 100
          calculatedRemainedCoin['100'] += 1
        }
      }

      const response = await updateRemainedCoin({
        100: remainedCoin['100'] - calculatedRemainedCoin['100'],
        500: remainedCoin['500'] - calculatedRemainedCoin['500'],
        1000: remainedCoin['1000'] - calculatedRemainedCoin['1000'],
        5000: remainedCoin['5000'] - calculatedRemainedCoin['5000'],
        10000: remainedCoin['10000'] - calculatedRemainedCoin['10000']
      })
      console.log('response', response)

      setRemainedCoin(response)
    }

    handleNext()
  }


  const handleClickProductItem = (value: Product) => {
    if (sumOfMoney < value.price) {
      return
    }
    setSelectedProduct(value)
  }

  useEffect(() => {
    (async () => {
      const response = await fetchRemainedCoin()
      setRemainedCoin(response)
    })()
  }, [])

  console.log('remainedCoin', remainedCoin)

  return (
    <BaseLayout>
      {step !== 2 && (
        <Header
          sumOfMoney={sumOfMoney}
          onBackClick={handleClickBackButton}
          onResetClick={handleClickResetButton}
          step={step}
        />
      )}



      <Stack justifyContent="center" alignItems="center" height="100%" maxWidth={800} margin="0 auto" position='relative'>
        {isDisorder && (
          <Typography variant="h4" component="h1" gutterBottom color="error">
            기능 장애( 자판기 동전이 없습니다. )
          </Typography>
        )}
        {!isDisorder && step === 0 && (
          <VendingMachineInputCoin
            sumOfMoney={sumOfMoney}
            onMoneyClick={handleClickMoneyItem}
            onSubmit={handleClickSubmitButton}
          />
        )}

        {!isDisorder && step === 1 && (
          <VendingMachineSelectDrink
            selectedProduct={selectedProduct}
            sumOfMoney={sumOfMoney}
            onClickItem={handleClickProductItem}
            onNext={handleClickNextButton}
          />
        )}

        {!isDisorder && step === 2 && selectedProduct && (
          <VendingMachineResult
            selectedProduct={selectedProduct}
            sumOfMoney={sumOfMoney}
          />
        )}
      </Stack>
    </BaseLayout>
  )
}

export default App
