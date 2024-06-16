import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { localStorageKeys } from "../../constants/app.constants";
import { logout } from "../../services/sercurity.service";
import { appActions, appSelectors } from "../../redux/app";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/user.service";

const Header = () => {
  const navigate = useNavigate();
  const user: any = useSelector(appSelectors.getUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    const userStr = localStorage.getItem(localStorageKeys.User);
    const userObj = JSON.parse(userStr);
    if (!userObj) {
      navigate('/login');
    }
    const response = await getUser(userObj.uid);
    if (response) {
      dispatch(appActions.setUser({ ...user, ...response }));
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(localStorageKeys.User);
    logout();
    navigate('/login');
  }

  const renderActivityClass = ({ isActive }: { isActive: boolean}) => `wc-header__right-item ${isActive && 'wc-header__right-item--active'}`;

  return (
    <header className="wc-header">
      <div className="wc-header__left">
        EURO 2024
      </div>
      <div className="wc-header__right">
        <NavLink to="/home/matches" className={renderActivityClass}>Home</NavLink>
        <NavLink to="/home/history" className={renderActivityClass}>History</NavLink>
        <NavLink to="/home/diamond-sponsor" className={renderActivityClass}>Dinamond Sponsor</NavLink>
        {user && user.isAdmin && <NavLink to="/admin/matches" className={renderActivityClass}>Manage matches</NavLink>}
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar src={user && user.photoURL} sx={{ width: 32, height: 32 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  )
}

export default Header;