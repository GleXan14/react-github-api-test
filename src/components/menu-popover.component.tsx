import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { IMenuItem } from "../models/menu-item.model";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface Props{
    name:string;
    title:string;
    items:IMenuItem[];
    customButtonClass?:string;
}

function MenuPopover(props:Props){
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const {title, items, name, customButtonClass} = props;

    useEffect(() => {

        return () => {
            setAnchorEl(null);
        }
    }, [])

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {customButtonClass && customButtonClass !== undefined ? 
                <button
                className={customButtonClass}
                id={`basic-button-${name}`}
                aria-controls={open ? `basic-menu-${name}` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuClick}
                >{title} <div className={`${customButtonClass}-icon`}><ExpandMoreIcon fontSize="small" /></div></button> :
                <Button
                id={`basic-button-${name}`}
                aria-controls={open ? `basic-menu-${name}` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuClick}>{title}</Button> 
            }
            <Menu
                id={`basic-menu-${name}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': `basic-button-${name}`,
                }}
            >
                {items.map((item, index) => 
                    <MenuItem key={index} onClick={(event) => item.onClick(event)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText>{item.text}</ListItemText>
                    </MenuItem>
                )}
            </Menu>
        </>
    )
}

export default MenuPopover;