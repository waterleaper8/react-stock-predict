import {
  Autocomplete,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext } from "react"
import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"
import json_text from "../model/companylist.json"
import { ApiContext } from "../../context/ApiContext"
import { pink } from "@mui/material/colors"

const codenames = JSON.parse(json_text).codename
const names = Object.keys(codenames).map(function (key) {
  return codenames[key]
})
const options = {
  maintainAspectRatio: false,
  // responsive: false,
}
Chart.register(CategoryScale)

const Home: React.FC = () => {
  const { price, setSelectedCode, predict } = useContext(ApiContext)

  return (
    <Box sx={{ maxWidth: "1200px", minWidth: "960px", margin: "auto" }}>
      <Typography variant="h4" sx={{ my: 5 }}>
        株価予測AI
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={names}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="銘柄やコードを入力" />
          )}
          onChange={(e, codename) => {
            setSelectedCode(codename)
          }}
        />

        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                次回の終値予測
              </Typography>
              <Typography variant="h5" component="div" color={pink[400]}>
                {predict}円
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {price && (
        <Box sx={{ px: 10 }}>
          <Line data={price} options={options} height={600} />
        </Box>
      )}
    </Box>
  )
}

export default Home
