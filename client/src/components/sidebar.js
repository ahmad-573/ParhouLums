import React from 'react';
// import InboxIcon from '@material-ui/icons/InboxIcon';
// import MailIcon from '@material-ui/icons/MailIcon';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import InboxIcon from '@material-ui/icons/RemoveCircle';
import { AppBar, Drawer, Toolbar, List, ListItemText, CssBaseline, ListItem, ListItemIcon, Typography, Box, Divider, Button } from '@material-ui/core'
import { LogoIcon, LogoBigIcon } from './CustomIcons'

const drawerWidth = 248;

function Sidebar(props) {
    const { href, icon, title, ...others } = props;
    return (
    
    <div>
            <Drawer
                PaperProps={{
                    sx: {
                      backgroundColor: 'neutral.900',
                      color: '#FFFFFF',
                      width: 280
                    }
                  }}
                sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                variant="permanent"
                anchor="left"
            >
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                    }}
                >
                    <div>
                        {/* <Box sx={{ p: 0 }}>
                        </Box> */}
                        <Box sx={{ mx: 0 }}>
                            <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                // px: 1,
                                py: '7px',
                                borderRadius: 1
                            }}
                            >
                                <div>
                                    <List>
                                        <ListItem button key="toolbar">
                                            <ListItemIcon >
                                                <LogoIcon />
                                            </ListItemIcon>
                                            <Typography
                                            color="inherit"
                                            variant="subtitle1"
                                            >
                                            Salam Anwar!
                                            </Typography>
                                            <FormatListBulletedOutlinedIcon
                                                sx={{
                                                color: 'neutral.500',
                                                width: 14,
                                                height: 14
                                                }}
                                            />
                                        </ListItem>
                                    </List>
                                </div>
                            </Box>
                        </Box>
                    </div>
                    <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <List>
                            <ListItem button key="chat">
                                <ListItemIcon >
                                    <ChatBubbleOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="chat" />
                            </ListItem>
                            <ListItem button key="task-list">
                                <ListItemIcon>
                                    <FormatListBulletedOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="task-list" />
                            </ListItem>
                            <ListItem button key="notes">
                                <ListItemIcon>
                                    <NoteOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="notes" />
                            </ListItem>
                            <ListItem button key="resources">
                                <ListItemIcon>
                                    <FolderOpenOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="resources" />
                            </ListItem>
                        </List>
                    </Box>
                    <Box position="absolute" bottom="0px" sx={{flexGrow: 1}}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem button key="bottom" disablePadding>
                                <ListItemIcon >
                                 <ExitToAppOutlinedIcon/>
                                </ListItemIcon>
                                <Typography
                                color="inherit"
                                variant="subtitle1"
                                >
                                Salam Anwar!
                                </Typography>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Drawer>
    </div>
  );
}

export default Sidebar;
