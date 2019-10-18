import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from "styled-components";


const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SimpleSnackbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Button = styled.button`
  border: none;

  :hover {
opacity: 0.9;
  }

  :focus {
    outline: none;
  }
`;

const Dot = styled.div`
position: relative;
    top: 6px;
    left: 6px;
    color: #F8E71C;
    font-size: 48px;
    line-height: 0px;
`;

const Image = styled.img`
  height: 30px;
`;

  return (
    <div>
      <Button onClick={handleClick}>
        <Dot>•</Dot>
        <Image src={`../images/notificationIcon.svg`} />
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">You successfully invested 100 DAI</span>}
        action={[ 
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      
    </div>
  );
};


