
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactLogo from '../assets/svg/logo.svg';
import { IAuth } from '../models/auth.model';
import MenuPopover from './menu-popover.component';


function Header(){

    const [auth, setAuth] = useState<IAuth>({});

    useEffect(() => {
        const authData: IAuth = JSON.parse(localStorage.getItem('auth') as string);
        setAuth({...authData});

        return () => {
            setAuth({});
        }
    }, [])


    const handleLogOut = () => {
        localStorage.removeItem('auth');
        window.location.reload();
    }
    

    return (
        <header className={'header'}>
            <div className="header-left">
                <img src={ReactLogo} width={50} height={50}
                className="header-logo" alt='logo' />
                <Link to="/home">
                    <div className={'header-title'}>
                        <h2>React Test</h2>
                    </div>
                </Link>
            </div>

            <div className='header-right'>
                <div className='profile'>

                    <MenuPopover
                    name='header-menu'
                    title={`${auth.email}`}
                    items={[{
                        text: 'Cerrar sesión',
                        icon: <LogoutIcon fontSize="small" />,
                        onClick: handleLogOut
                    }]}
                    />
                </div>
            </div>

        </header>
    )
}   

export default Header;