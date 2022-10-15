import {
  Autocomplete,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import React, { useContext } from "react"
import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"
import json_text from "../model/companylist.json"
import { ApiContext } from "../../context/ApiContext"
import { pink, blue } from "@mui/material/colors"

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
  const {
    price,
    setSelectedCode,
    predict,
    yesterday,
    errorData,
    errorPredict,
    predictIsLoading,
  } = useContext(ApiContext)

  return (
    <Grid container sx={{ px: 5 }} justifyContent="space-evenly">
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ my: 5 }}>
          株価予測AI
        </Typography>
      </Grid>

      <Grid item xs={12} md={3} sx={{ mb: 3 }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={names}
          renderInput={(params) => (
            <TextField {...params} label="銘柄やコードを入力" />
          )}
          onChange={(e, codename) => {
            setSelectedCode(codename)
          }}
        />

        <Typography variant="h6" sx={{ color: "red" }}>
          {errorData}
        </Typography>
        <Typography variant="h6" sx={{ color: "red" }}>
          {errorPredict}
        </Typography>
      </Grid>

      <Grid container gap={{ md: 10 }} justifyContent="center">
        <Grid item xs={12} md={3} sx={{ mb: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                前日の終値
              </Typography>
              <Typography variant="h5" component="div" color={blue[400]}>
                {predictIsLoading ? (
                  <CircularProgress
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "6px",
                    }}
                  />
                ) : (
                  yesterday
                )}
                円
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3} sx={{ mb: 3 }}>
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
                {predictIsLoading ? (
                  <CircularProgress
                    color="error"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "6px",
                    }}
                  />
                ) : (
                  predict
                )}
                円
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {price && (
        <Grid sm={12} md={10} lg={8} xl={6} sx={{ mb: 10 }}>
          <Line data={price} options={options} height={600} />
        </Grid>
      )}
    </Grid>
  )
}

export default Home
