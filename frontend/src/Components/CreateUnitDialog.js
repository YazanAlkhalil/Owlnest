import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({addUnit}) {
  const [open, setOpen] = React.useState(false);
  const [text,setText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className='text-xl btn-inner border border-solid border-secondary px-3 py-2 hover:bg-secondary hover:text-white rounded  text-secondary' onClick={handleClickOpen}>
        add unit
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            addUnit(text)
            handleClose();
          },
        }}
      >
        <DialogTitle>Unit name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Unit name to add it to the course.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Unit name"
            type="text"
            fullWidth
            variant="standard"
            value={text}
            onChange={e=>setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
