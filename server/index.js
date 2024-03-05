const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, createGoal, deleteGoal, updateGoal } = require('./controller')



app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.post("/api/goals", createGoal);
app.delete(`/api/goals/delete/:id`, deleteGoal);
app.put(`/api/goals/update/:id`, updateGoal);
app.listen(4000, () => console.log("Server running on 4000"));
