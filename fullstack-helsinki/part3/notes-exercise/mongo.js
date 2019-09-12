const mongoose = require("mongoose");

const password = "clusterPWjudge21!";

const url = `mongodb+srv://tom:${password}@cluster0-bpuy0.mongodb.net/notes?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "shit-tastic",
  date: new Date(),
  important: false
});

note.save().then(res => {
  console.log(res);
  mongoose.connection.close();
});
