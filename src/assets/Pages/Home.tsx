import { Stack, styled } from "@mui/material";
import LogoByDev from "../images/Logo_Bydev 1.png";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import LegendToggleRoundedIcon from '@mui/icons-material/LegendToggleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


const Home = () => {

  const navigate = useNavigate();

  const handleClickAbout = () => {
      navigate("./About");
  };

  const handleClickMonitoring = () => {
      navigate("./Monitoring");
  };

  // const Background = styled("body")(() => ({
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#edf4fa",
  //   display: "flex",
  //   height: "100vh",
  // }));

  const Text = styled("p")(() => ({
    color: "#ffffff",
    fontStyle: "italic",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
  }));

  const ButtonText = styled("p")(() => ({
    color: "#000000",
    fontSize: "12px",
    fontWeight: "bold",
  }));

  const ButtonStyled = styled("button")(() => ({
    backgroundColor: "#bce7f7",
    fontWeight: "bold",
    borderRadius: "19px",
    ":hover": {
      transform: "scale(1.1)",
      transition: "transform 0.2s ease-in-out, background-color 0.3s ease",
    },
  }));

  const Logo = styled("img")(() => ({
    width: "85%",
  }));

  return (
    <Background>  
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Logo src={LogoByDev}></Logo>
        <Text> A System designed for Fire Monitoring </Text>
        <Stack direction="column" paddingTop="10px" alignItems="center" justifyContent="center" gap="8px">
          <ButtonStyled onClick={handleClickMonitoring}> <LegendToggleRoundedIcon fontSize="small"/> Monitored Areas </ButtonStyled>
        </Stack>
      </Stack> 
    </Background>
    
  );
};

export default Home;