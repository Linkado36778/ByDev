import React, { useEffect, useState } from 'react';
import { Avatar, ListItemAvatar, styled, Typography, Box } from '@mui/material';
import { subscribeToPayload } from "../../services/influxService.ts";
import FabLabLogo from "../images/FabLab.png";
import Placeholder from "../images/Placeholder.png"
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import InfoIcon from '@mui/icons-material/Info';

const RealtimeViewer: React.FC = () => {
  const [values, setValues] = useState<{
    value1: number | null;
    value2: number | null;
    value3: number | null;
  }>({
    value1: null,
    value2: null,
    value3: null
  });

  useEffect(() => {
    subscribeToPayload(({ value1, value2, value3 }) => {
      setValues({ value1, value2, value3 });
    });
  }, []);

  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const avaliarTemperatura = (temp: number | null) => {
  if (temp === null) return "Sem dados";
  if (temp < 18) return "Frio";
  if (temp >= 18 && temp <= 32) return "Confortável";
  return "Quente";
};

  const avaliarUmidade = (umidade: number | null) => {
    if (umidade === null) return "Sem dados";
    if (umidade < 30) return "Seco";
    if (umidade > 60) return "Úmido";
    return "Normal";
  };

  const avaliarGases = (valor: number | null) => {
    if (valor === null) return "Sem dados";
    if (valor === 0) return "OK";
    if (valor === 1) return "Concentração alta";
  };

  const situacaoLocal = (temp: number | null, umidade: number | null, gas: number | null) => {
    let count = 0;

    if(temp != null){
      if (temp >= 32) {
        count+=1;    
      }
      else if (temp < 32) {
        count-=1;
      }
    }

    else if(umidade != null) {
      if (umidade <= 30) {
        count+=1;
      }

      else if (umidade >= 30) {
        count-=1;
      }
    }

    else if(gas != null) {
      if (gas === 1) {
        count+=1;
    } 

      else if (gas == 0) {
        count-=1;
    }
    }

    else if (umidade === null && gas === null && temp === null){
      count = 0;
    }

    console.log(count);

    if (count == 0) return "Estável";
    if (count == 1) return "Baixa possibilidade de foco de incêndio";
    if (count == 2) return "Média possibilidade de foco de incêndio";
    if (count == 3) return "Possibilidade Iminente de incêndio, verificar localidade imediatamente";
  }

  // const Container = styled("div")(() => ({
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: "100vh",
  //   textAlign: "center",
  //   gap: "1.5rem", 
  // }));

  return (
    <Box
      sx={{height: '100%',
          minHeight: '100vh', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,}}
    >
      <Typography style={{color: "#ffffff",
                          fontStyle: "italic",
                          fontSize: "20px",
                          fontWeight: "bold"}
                }>Áreas Monitoradas</Typography>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" />
        }
      >
        <ListItemButton onClick={handleClick1}>
          <ListItemAvatar>
            <Avatar src={FabLabLogo}/>
          </ListItemAvatar>
          <ListItemText primary="InovFabLab (Universidade Santa Cecília - Santos, São Paulo)"/>
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DeviceThermostatIcon />
              </ListItemIcon>
              <ListItemText primary={`Temperatura Local: (${values.value1}°C) - ${avaliarTemperatura(values.value1)}`} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <WaterDropOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={`Umidade Local: (${values.value2}%) - ${avaliarUmidade(values.value2)}`} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalFireDepartmentIcon />
              </ListItemIcon>
              <ListItemText primary={`Concentração de gases: ${avaliarGases(values.value3)}`} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={`Situação atual da área monitorada: ${situacaoLocal(values.value1, values.value2, values.value3)}`} />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClick2}>
          <ListItemAvatar>
            <Avatar src={Placeholder}/>
          </ListItemAvatar>
          <ListItemText primary="Não utilizado..."/>
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DeviceThermostatIcon />
              </ListItemIcon>
              <ListItemText primary="Temperatura Local: Sem informações..." />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <WaterDropOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Umidade Local: Sem informações..." />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalFireDepartmentIcon />
              </ListItemIcon>
              <ListItemText primary="Concentração de gases: Sem informações..." />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={`Situação atual da área monitorada: Sem informações...`} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default RealtimeViewer;
