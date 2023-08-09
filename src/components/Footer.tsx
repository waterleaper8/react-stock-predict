import { Link } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const Footer = () => {
  return (
    <Box mb={5}>
      <small className="footer__link">
        © Copyright 2022. Made by{" "}
        <Link href="https://next.waterleaper.net/">waterleaper</Link>
      </small>
    </Box>
  )
}

export default Footer
