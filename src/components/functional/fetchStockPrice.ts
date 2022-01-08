import axios from "axios"

export const fetchStockPrice = (selectedCode: string) => {
  const code = selectedCode.split(" ")[0]
  let data = {}
  axios
    // .get(`http://192.168.11.87:8000/api/stockprice/?code=${code}`)
    .get(`http://localhost:8000/api/stock_data/?code=${code}`)
    .then((res) => {
      console.log("res.status " + res.status)
      const ks: Array<string> = []
      const vs: Array<unknown> = []
      for (const [key, value] of Object.entries(res.data.Close)) {
        ks.push(key)
        vs.push(value)
      }
      data = {
        labels: ks,
        datasets: [
          {
            label: selectedCode.split(" ")[1],
            borderColor: "rgba(35,200,153,1)",
            data: vs,
            borderWidth: 1,
          },
        ],
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      return data
    })
}
