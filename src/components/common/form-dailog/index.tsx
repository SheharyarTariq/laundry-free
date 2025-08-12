import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Plus } from 'lucide-react';
import PrimaryButton from '../primary-button';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

interface FormDialogProps {
  title: string;
  buttonText: string;
  saveButtonText: string;
  children: React.ReactNode;
  onSubmit: (formData: Record<string, string>) => Promise<boolean>;
  loading?: boolean;
}

export default function FormDialog({ 
  title, 
  buttonText, 
  saveButtonText, 
  onSubmit,
  loading = false,
  children
}: FormDialogProps) {
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
      <PrimaryButton className="flex items-center gap-x-2 px-4 max-w-max" onClick={handleClickOpen}>
        <Plus /> {buttonText}
      </PrimaryButton>
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
          <PrimaryButton onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : saveButtonText}
          </PrimaryButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
