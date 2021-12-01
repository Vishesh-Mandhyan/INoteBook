import React, { useContext, useEffect} from "react";
import notesContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
function Notes() {
  const context = useContext(notesContext);
  const { notes, getnotes } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnotes();
    } else {
      navigate("/login");
    }
  });
  return (
    <div>
      <AddNote />
      <Box ml={5} mt={4}> <h4>
      {notes.length===0 && "No Notes to Display"}
      </h4>
      </Box>
      <Grid container direction="row" spacing={2} width="100%">
        {notes.map((note) => {
          return ( 
            <NotesItem key={note._id} note={note} />
          );
        })}
      </Grid>
    </div>
  );
}

export default Notes;
