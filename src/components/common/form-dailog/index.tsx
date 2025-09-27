import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '../primary-button';
import DeleteButton from '../delete-button';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface FormDialogProps {
  title: string;
  buttonText: React.ReactNode;
  saveButtonText: string;
  children: React.ReactNode;
  onSubmit: (formData: Record<string, string>) => Promise<boolean>;
  loading?: boolean;
  danger?: boolean;
}

export default function FormDialog({ 
  title, 
  buttonText, 
  saveButtonText, 
  onSubmit,
  loading = false,
  children,
  danger = false,
}: Readonly<FormDialogProps>) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit =async () => {
    const success = await onSubmit({});
    if (success) {
      handleClose();
    }
  };

  return (
    <React.Fragment>
      {buttonText === "Delete" ? (
        <DeleteButton className="flex items-center gap-x-2 px-4 max-w-max" onClick={handleClickOpen}>
          {buttonText}
        </DeleteButton>
      ) : (
      
        <PrimaryButton className="flex items-center gap-x-2 px-4 max-w-max" onClick={handleClickOpen}>
          {buttonText}
        </PrimaryButton>
      )}
      <BootstrapDialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {children}
        </DialogContent>
        <DialogActions>
          {danger ? (
            <DeleteButton onClick={handleSubmit} disabled={loading}>
              {loading ? 'Deleting...' : saveButtonText}
            </DeleteButton>
          ) : (
            <PrimaryButton onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : saveButtonText}
            </PrimaryButton>
          )}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
