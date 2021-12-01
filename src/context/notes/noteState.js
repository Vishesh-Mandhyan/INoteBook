import NotesContext from "./noteContext";
import { useState } from "react";
export default function NotesState  (props) {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNote] = useState(notesInitial)
  const getnotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNote(json);
  };
  const addnote = async (title, description) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "authtoken": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const note = await response.json();
    setNote(notes.concat(note))
  };
  const editnote = async (id, title, description) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
       "authtoken": localStorage.getItem("token"),
       "Content-Type": "application/json",
      },
      body: JSON.stringify({title, description})
    });
    const json = await response.json();
    console.log(json)

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description; 
        break; 
      }
    }  
    setNote(newNotes);
  }
  let deletenote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "authtoken": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNote(newNotes);
  }
  return (
    <NotesContext.Provider value={{ notes,addnote,  deletenote,getnotes ,editnote}}>
      {props.children}
    </NotesContext.Provider>
  );
};

