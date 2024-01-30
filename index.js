const express = require("express");
const app = express();

app.use(express.json())

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/info", (req, res) => {
  const currentDate = new Date();
  res.send(
    `<p>Phonebook has info for ${phonebook.length} people</p>${currentDate}<p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("before", phonebook);
  phonebook = phonebook.filter((person) => person.id !== id);
  console.log("after", phonebook);

  res.status(204).end();
});

const genId = () => {
  return Math.ceil(Math.random() * 10000000);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body)

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: genId(),
  };

  phonebook = phonebook.concat(person)

  res.json(person)
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
