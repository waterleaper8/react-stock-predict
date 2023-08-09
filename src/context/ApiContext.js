import React, { createContext, useState, useEffect, useCallback } from "react"
import axios from "axios"

export const ApiContext = createContext()

const ApiContextProvider = (props) => {
  const data = {
    labels: [0],
    datasets: [
      {
        label: "銘柄",
        borderColor: "rgba(35,200,153,1)",
        data: [0],
        borderWidth: 1,
      },
    ],
  }

  const [selectedCode, setSelectedCode] = useState("")
  const [price, setPrice] = useState(data)
  const [predict, setPredict] = useState(0)
  const [yesterday, setYesterday] = useState(0)
  const [errorData, setErrorData] = useState("")
  const [errorPredict, setErrorPredict] = useState("")
  const [predictIsLoading, setPredictIsLoading] = useState(false)

  const fetchStockPrice = useCallback(
    (code) => {
      setPredictIsLoading(true)
      axios
        // .get(`http://127.0.0.1:8000/api/stock_data/?code=${code}`)
        // .get(`https://stock-api.waterleaper.net/fetch_stock_data?code=${code}`)
        .get(`https://waterleaper.net/api/stock/fetch_stock_data?code=${code}`)
        .then((res) => {
          console.log(res.status)
          console.log(res.Close)
          const ks = []
          const vs = []
          for (const [key, value] of Object.entries(res.data.Close)) {
            ks.push(key)
            vs.push(value)
          }
          const data = {
            labels: ks,
            datasets: [
              {
                label: selectedCode.split(" ")[1],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                data: vs,
                borderWidth: 1,
              },
            ],
          }
          setPrice(data)
          setYesterday(vs[vs.length - 1])
        })
        .catch((error) => {
          console.log(error)
          setErrorData("株価データの取得に失敗しました")
        })
    },
    [selectedCode]
  )

  const fetchPredict = useCallback((code) => {
    axios
      // .get(`http://127.0.0.1:8000/api/predict/?code=${code}`)
      // .get(`https://stock-api.waterleaper.net/fetch_predict_value?code=${code}`)
      .get(`https://waterleaper.net/api/stock/fetch_predict_value?code=${code}`)
      .then((res) => {
        console.log(res.status)
        setPredict(res.data)
        setPredictIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setErrorPredict("予測値の取得に失敗しました")
      })
  }, [])

  useEffect(() => {
    let unsub = false
    if (!unsub) {
      if (selectedCode == null) {
      } else if (selectedCode.indexOf(" ") !== -1) {
        const code = selectedCode.split(" ")[0]
        console.log(code)
        fetchStockPrice(code)
        fetchPredict(code)
      }
    }
    return () => {
      unsub = true
    }
  }, [selectedCode, fetchStockPrice, fetchPredict])

  return (
    <ApiContext.Provider
      value={{
        selectedCode,
        setSelectedCode,
        price,
        setPrice,
        predict,
        setPredict,
        yesterday,
        setYesterday,
        errorData,
        errorPredict,
        predictIsLoading,
        setPredictIsLoading,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  )
}

export default ApiContextProvider
