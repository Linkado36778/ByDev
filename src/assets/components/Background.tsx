import { styled } from "@mui/material";
import type { ReactNode } from "react";
import estilo from "../../BackgroundCSS.module.css";

interface BackgroundProps {
    children: ReactNode
}

const BackgroundStyled = styled("body")(() => ({
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#edf4fa",
    display: "flex",
    height: "100vh",
  }));

const Background:React.FC <BackgroundProps> = ({ children }) => {

  return (
    <BackgroundStyled style={estilo}>
        {children}
    </BackgroundStyled>

  )
}  

export default Background;