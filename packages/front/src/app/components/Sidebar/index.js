import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom';

import { ROUTES } from '~constants/routes';

import styles from './styles.module.scss';

const MENU_ITEMS = [
  {
    label: 'Crear publicación',
    path: ROUTES.CREATE_ANIMAL
  },
  {
    label: 'Ver publicaciones',
    path: ROUTES.ANIMALS
  },
  {
    label: 'Perfil',
    path: ROUTES.PERSONAL_DATA
  }
];

const Sidebar = ({ open, onClose }) => (
  <Drawer elevation={10} open={open} onClose={onClose}>
    <div className={styles.sidebarContainer}>
      <List>
        {MENU_ITEMS.map(({ label, path }) => {
          console.log(label, path);
          return (
            <Link to={path} className="row middle" key={path}>
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon style={{ fill: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={label} style={{ color: 'white' }} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  </Drawer>
);

export default Sidebar;
