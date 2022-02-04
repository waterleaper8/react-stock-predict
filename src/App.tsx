import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import React from "react"
import "./App.css"
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
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  )
}

export default App
