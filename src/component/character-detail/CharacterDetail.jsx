import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}
      maxWidth='xs'>
      <DialogTitle>{selectedValue.name} - Detail</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <img alt="character" src={selectedValue.thumbnail.path + '.' + selectedValue.thumbnail.extension} style={{ maxWidth: "100%", height: 'auto' }} />
          <Typography gutterBottom variant="body2" color="text.secondary">
            {selectedValue.description}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={() => window.open(selectedValue.urls[1].url, '_blank')}>
          <InfoIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired,
};

export default SimpleDialog;
