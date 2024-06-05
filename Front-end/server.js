const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/theater', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const posterSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  genre: String,
  date: String,
  time: String,
  actors: [String],
});

const Poster = mongoose.model('Poster', posterSchema);

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send('Error registering user');
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('User not found');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).send('Invalid password');
  }
  res.send('Login successful');
});

app.get('/posters', async (req, res) => {
  const posters = await Poster.find();
  res.json(posters);
});


const commentSchema = new mongoose.Schema({
  posterId: mongoose.Schema.Types.ObjectId,
  text: String,
  rating: Number,
});

const Comment = mongoose.model('Comment', commentSchema);

app.post('/comments', async (req, res) => {
  const { posterId, text, rating } = req.body;
  try {
    const comment = new Comment({ posterId, text, rating });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send('Error adding comment');
  }
});

app.get('/comments/:posterId', async (req, res) => {
  const { posterId } = req.params;
  try {
    const comments = await Comment.find({ posterId });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send('Error fetching comments');
  }
});
app.get('/actors/:actorName', (req, res) => {
  const actorName = req.params.actorName;
  const actor = actors.find(a => a.name === actorName); 
  res.send(actor);
});

app.get('/performances', (req, res) => {
  const actorName = req.query.actor;
  const performances = posters.filter(poster => poster.actors.includes(actorName));
  res.send(performances);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


