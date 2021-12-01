const express = require("express");
const router = express.Router();
const Note = require("../models/notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
// ROUTE 1
// adding notes in the database
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.send(savednote);
    } catch (error) {
      console.log(error);
    }
  }
);
// ROUTE 2
// fetch all notes
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    // console.log(note);
    res.json(note);
  } catch (error) {
    console.log(error);
    res.send("you fucked up");
  }
});
// ROUTE 3
// updating notes in the database
router.put("/updatenotes/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() === req.user.id) {
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote });
      return res.json({ note });
    }
    res.send("not allowed");
  } catch (error) {
    res.json({ error: error });
  }
});
// ROUTE 4
// deleting a note 
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() === req.user.id) {
      note = await Note.findByIdAndDelete(req.params.id);
      return res.json({Success:"Note has been deleted",note: note });
    }
    res.send("not allowed");
  } catch (error) {
    res.json({ error: error });
  }
});
module.exports = router;
