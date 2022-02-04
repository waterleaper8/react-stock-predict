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

  const fetchStockPrice = useCallback(
    (code) => {
      axios // .get(`http://192.168.11.87:8000/api/stockprice/?code=${code}`)
        // .get(`http://127.0.0.1:8000/api/stock_data/?code=${code}`)
        .get(
          `https://stock-predict-2022.herokuapp.com/api/stock_data/?code=${code}`
        )
        .then((res) => {
          console.log(res.status)
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
        })
        .catch((error) => {
          console.log(error)
        })
    },
    [selectedCode]
  )

  const fetchPredict = useCallback((code) => {
    axios
      // .get(`http://192.168.11.87:8000/api/stockprice/?code=${code}`)
      // .get(`http://127.0.0.1:8000/api/predict/?code=${code}`)
      .get(`https://stock-predict-2022.herokuapp.com/api/predict/?code=${code}`)
      .then((res) => {
        console.log(res.status)
        setPredict(res.data)
      })
      .catch((error) => {
        console.log(error)
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
      }}
    >
      {props.children}
    </ApiContext.Provider>
  )
}

export default ApiContextProvider
