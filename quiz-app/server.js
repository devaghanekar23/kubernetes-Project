const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    app: "QuizMaster"
  });
});

app.listen(PORT, () => {
  console.log(`QuizMaster running on port ${PORT}`);
});