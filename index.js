import app from "./app.js";
import connectDB from "./lib/db.js";

const PORT = process.env.PORT;

// connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
