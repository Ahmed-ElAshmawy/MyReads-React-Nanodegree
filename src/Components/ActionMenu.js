import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const options = [
    'Move to...',
    'Currently Reading',
    'Want To Read',
    'Read',
    'None'
];

const ITEM_HEIGHT = 48;

export default function ActionMenu(props) {

    let selectedShelfIndex = options.findIndex(item => item.toLowerCase() === props.currentBookShelf.toLowerCase());

    if (selectedShelfIndex === -1) {
        selectedShelfIndex = 4;
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(selectedShelfIndex);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        handleClose();
        props.onItemClicked(options[index]);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem className="actionMenuItem" key={option} disabled={index === 0 || index === selectedIndex} selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}>
                        {index === selectedIndex && <CheckCircleIcon fontSize="small" />}
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
