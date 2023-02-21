import React, { Component } from "react";

import { Outlet, Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Face5Icon from '@mui/icons-material/Face5';
import ElderlyIcon from '@mui/icons-material/Elderly';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './HomePage.css'
import marvelIcon from "../../images/marvel-icon.jpg";

export default class HomePage extends Component {

  drawerWidth = 240;

  render() {
    return (
      <div className="App">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={
              {
                width: `calc(100% - ${this.drawerWidth}px)`,
                ml: `${this.drawerWidth}px`,
              }}>
            <Toolbar sx={{
              ' &.MuiToolbar-root': {
                backgroundColor: 'red'
              }
            }}>
              <Typography variant="h6" noWrap component="div">
                Marvel App
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: this.drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: this.drawerWidth,
                boxSizing: 'border-box'
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar>
              <img alt="marvelIcon" src={marvelIcon} style={{ width: '100%', height: '100%' }} />
            </Toolbar>
            <Divider />
            <List>
              { /* TODO Map a listitem in order to generate it individually */}
              <ListItem key={'character'} component={Link} to="/character" disablePadding>
                <ListItemButton  >
                  <ListItemIcon>
                    <Face5Icon />
                  </ListItemIcon>
                  <ListItemText primary={'Characters'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={'comic'} component={Link} to="/comics" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Comics'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={'creator'} component={Link} to="/creator" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ElderlyIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Creator'} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem key={'account'} component={Link} to="/account" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Account'} />
                </ListItemButton>
              </ListItem>
              <ListItem key={'dc'} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LinkOffIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Disconnect'} />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Toolbar />
            <Outlet />

          </Box>
        </Box>
      </div >
    );
  }
}