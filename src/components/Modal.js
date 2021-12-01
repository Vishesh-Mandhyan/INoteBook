import * as React from "react";
import notesContext from "../context/notes/noteContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function BasicModal(props) {
  const { note } = props;
  const context = React.useContext(notesContext);
  const { editnote } = context;
  const [open, setOpen] = React.useState(false);
  const [notes, setnote] = React.useState({ title: "", description: "" });
  const onChange = (e) => {
    setnote({ ...notes, [e.target.name]: e.target.value });
  };
  const HandleClick = (e) => {
    e.preventDefault();
    editnote(note._id, notes.etitle, notes.edescription);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <IconButton color="primary" aria-label="edit" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Note
          </Typography>
          <form>
            <TextField
              fullWidth
              id="standard-basic"
              label="Title"
              variant="standard"
              name="etitle"
              onChange={onChange}
              value={note.title}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id="standard-basic"
              label="Description"
              variant="standard"
              multiline
              rows={3}
              name="edescription"
              onChange={onChange}
              value={note.description}
            />
            <Button
              type="submit"
              sx={{ mt: 2 }}
              onClick={HandleClick}
              variant="outlined"
            >
              Edit Note
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
