import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Message from "../../views/Chat/Message";

const ListModel = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>
          Apple Tree
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
              <Message/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListModel;
