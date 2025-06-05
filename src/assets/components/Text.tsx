import { styled } from "@mui/material";
import type { ReactNode } from "react";

interface TextProps {
    children: ReactNode
}

const TextStyled = styled("p")(() => ({
    color: "#ffffff",
    fontStyle: "italic",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
}));

const Text:React.FC <TextProps> = ({ children }) => {

    return (
        <TextStyled>
            {children}
        </TextStyled>
    )

}

export default Text;