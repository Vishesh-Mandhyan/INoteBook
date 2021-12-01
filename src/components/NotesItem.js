import React, { useContext } from "react";
import Card from "@mui/material/Card";
import { IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesContext from "../context/notes/noteContext";
import BasicModal from "./Modal";
const NotesItem = (props) => {
  const { note } = props;
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  }));
  const context = useContext(NotesContext);
  const { deletenote } = context;
  return (
    <div>
      <Grid>
        <Item
          sx={{
            m: 1,
          }}
        >
          <Card style={{ boxShadow: "none" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {note.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {note.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <BasicModal key={note._id} note={note} />
                <IconButton
                  color="primary"
                  aria-label="delete"
                  onClick={() => {
                    deletenote(note._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </CardActions>
          </Card>
        </Item>
      </Grid>
    </div>
  );
};

export default NotesItem;
