import { useState } from "react"
import { Stack } from "@mui/material"
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
  const sumOfMoney = Object.entries(money).reduce((acc, [key, value]) => acc + (Number(key) * value), 0)

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

  const handleNext = () => {
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


  const handleClickProductItem = (value: Product) => {
    if (sumOfMoney < value.price) {
      return
    }
    setSelectedProduct(value)
  }

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
        {step === 0 && (
          <VendingMachineInputCoin
            sumOfMoney={sumOfMoney}
            onMoneyClick={handleClickMoneyItem}
            onSubmit={handleClickSubmitButton}
          />
        )}

        {step === 1 && (
          <VendingMachineSelectDrink
            selectedProduct={selectedProduct}
            sumOfMoney={sumOfMoney}
            onClickItem={handleClickProductItem}
            onNext={handleNext}
          />
        )}

        {step === 2 && selectedProduct && (
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
