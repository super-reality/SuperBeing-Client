import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Send from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import DialogContentText from "@mui/material/DialogContentText";
import { useStyles } from "../../styles/ui";
import IconButton from "@mui/material/IconButton";

const Message = () => {
  const classes = useStyles();
  return (
    <div>
      <DialogContentText>
        {[...new Array(7)].map((el, i) => {
          return (
            <div>
              {i % 2 === 0 ? (
                <div className={classes.leftMessage}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg"
                    sx={{ width: 56, height: 56 }}
                  />
                  <div className={classes.leftContentMsg}>
                    {" "}
                    Hello! Kimenyi how are you doing?{" "}
                  </div>
                </div>
              ) : (
                <div className={classes.rightMessage}>
                  <div className={classes.rightContentMsg}>
                    {" "}
                    I am doing great!{" "}
                  </div>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg"
                    sx={{ width: 56, height: 56 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </DialogContentText>
      <FormControl
        sx={{ m: 1 }}
        fullWidth
        variant="outlined"
        className={classes.formMessage}
      >
        <OutlinedInput
          id="outlined-adornment-weight"
          placeholder="Who do you want to talk to?"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <Send />
              </IconButton>{" "}
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
      </FormControl>
    </div>
  );
};

export default Message;
