import { styled } from "@mui/material";
import type { ReactNode } from "react";

interface ButtonStyledProps {
    children: ReactNode
}

const StyledButton = styled("button")(() => ({
    backgroundColor: "#bce7f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    paddingBottom: "20px",
    fontWeight: "bold",
    borderRadius: "19px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, background-color 0.3s ease",
    ":hover": {
        transform: "scale(1.1)",
    },
    }));

const ButtonStyled:React.FC <ButtonStyledProps> = ({ children }) => {

    return (
        <StyledButton>
            {children}
        </StyledButton>
    )

}

export default ButtonStyled;