const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET route to serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/bmi-form.html");
});

// POST route to calculate BMI
app.post("/calculate-bmi", (req, res) => {
  let { weight, height } = req.body;

  // Convert to numbers
  weight = parseFloat(weight);
  height = parseFloat(height);

  // Validate inputs
  if (weight <= 0 || height <= 0) {
    return res.json({
      error: true,
      message: "Weight and height must be positive numbers",
    });
  }

  // Convert height from cm to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);

  // Determine BMI category
  let category;
  let colorClass;

  if (bmi < 18.5) {
    category = "Underweight";
    colorClass = "blue";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
    colorClass = "green";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    colorClass = "yellow";
  } else {
    category = "Obese";
    colorClass = "red";
  }

  res.json({
    error: false,
    bmi: bmi.toFixed(2),
    category,
    colorClass,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
