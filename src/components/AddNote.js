import React, { useContext, useState } from "react";
import notesContext from "../context/notes/noteContext";
import {
  TextField,
  Button,
  Grid,
} from "@mui/material";
const AddNote = () => {
  const context = useContext(notesContext);
  const { addnote } = context;
  const [notes, setnote] = useState({ title: "", description: "" });
  const onChange = (e) => {
    setnote({ ...notes, [e.target.name]: e.target.value });
  };
  const HandleClick = (e) => {
    e.preventDefault();
    addnote(notes.title, notes.description);
    setnote({ title: "", description: "" });
  };
  return (
    <div>
      <form>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            sx={{ mt: 3 }}
            fullWidth
            required
            name="title"
            id="outlined title"
            label="Title"
            onChange={onChange}
            value={notes.title}
          />

          <TextField
            sx={{ mt: 3 }}
            fullWidth
            required
            multiline
            rows={4}
            name="description"
            id="outlined description"
            label="description"
            onChange={onChange}
            value={notes.description}
          />

          <Button
            disabled={notes.title.length < 5 || notes.description.length < 5}
            sx={{ mt: 3, width: 1 / 6 }}
            type="submit"
            variant="contained"
            onClick={HandleClick}
          >
            Add Note
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default AddNote;
