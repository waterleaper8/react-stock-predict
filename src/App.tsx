import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import React from "react"
import "./App.css"
import Footer from "./components/Footer"
import Home from "./components/page/Home"

const theme = createTheme({
  typography: {
    fontFamily: [
      "M PLUS 1p",
      "Helvetica Neue",
      "Arial",
      "Hiragino Kaku Gothic ProN",
      "Hiragino Sans",
      "Meiryo",
      "sans-serif",
    ].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
