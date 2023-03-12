import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Equipment from '@mui/icons-material/DevicesOtherOutlined'
import User from '@mui/icons-material/SupervisedUserCircleOutlined'
import Reserved from '@mui/icons-material/AssignmentOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import EngineeringIcon from '@mui/icons-material/EngineeringOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';

import Data_de_Reserva from '../../../pages/ReservasRealizadas/Data_de_Reservas/Data_de_Reservas';
import Equipamentos_Reservados from '../../../pages/ReservasRealizadas/Equipamentos_Reservados/Equipamentos_Reservados';
import { Users_Menu } from '../UsersMenu';
import Secretaria from '../../../pages/secretaria/Secretaria';
import CreateAdminPassword from '../CreateAdminPassword';

import {  useNavigate } from 'react-router-dom';
import { logout } from '../../utils/Auth';
import Equipamentos_Menu from '../EquipamentosMenu';
import ReservasMenu from '../ReservasMenu';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:5173/#">
        SisReserva
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const mdTheme = createTheme();

function DashboardContent( { disabled = false }) {
  const [name, set_name] = useState<string>('Professores')
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const HandleLogout =  () => {
    logout()
    handleSingIn()

  }
  const navigation = useNavigate();
  const handleSingIn = () => navigation('/login') 

  function apresentarDashboard(name: string){
    if(name == 'Professores'){
      return<Users_Menu disabled={disabled}/>
    }
    if(name == 'Secretaria'){
      return<Secretaria disabled={disabled}/>
    }
    if(name == 'Equipamentos'){
        return<Equipamentos_Menu disabled={disabled} /> 
    }
    if(name == 'Reservas'){
        return<ReservasMenu disabled={disabled} />
    }
    if(name == 'Datas Reservadas'){
        return <Data_de_Reserva />
    }
    if(name == 'Equipamentos Reservados'){
      return <Equipamentos_Reservados />
    }
    if(name == 'Administrador'){
      return(
          <Box display={'flex'}bgcolor="transparent" width={'100%'} height={'80vh'} alignItems={"center"} justifyContent="center">
            
            <CreateAdminPassword disabled={disabled} />
          </Box>
      )
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {name}
            </Typography>
            <IconButton color="inherit" onClick={() => HandleLogout()}>
                <SensorDoorOutlinedIcon />
                <Typography>Sair</Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          {/* Começo do menu lateral */}
          <List component="nav">
            <ListItemButton onClick={() => set_name("Professores")}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Professores"/>
            </ListItemButton>

            <ListItemButton onClick={() => set_name("Secretaria")}>
              <ListItemIcon>
                <EngineeringIcon />
              </ListItemIcon>
              <ListItemText primary="Secretaria"/>
            </ListItemButton>

            <ListItemButton onClick={() => set_name('Equipamentos')}>
              <ListItemIcon>
                <Equipment />
              </ListItemIcon>
              <ListItemText primary="Equipamentos"/>
            </ListItemButton>

            <ListItemButton onClick={() => set_name('Reservas')}>
              <ListItemIcon>
                <Reserved />
              </ListItemIcon>
              <ListItemText primary="Reservas"/>
            </ListItemButton>

            <ListItemButton onClick={() => set_name('Datas Reservadas')}>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Datas Reservadas"/>
            </ListItemButton>

            <ListItemButton onClick={() => set_name('Equipamentos Reservados')}>
              <ListItemIcon>
                <ImportantDevicesIcon />
              </ListItemIcon>
              <ListItemText primary="Equipamentos Res."/>
            </ListItemButton>



            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
            <ListItemButton onClick={() => set_name('Administrador')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Administrador"/>
            </ListItemButton>

            

          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {apresentarDashboard(name)}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard({ disabled = false }) {
  return <DashboardContent disabled = {disabled} />;
}
