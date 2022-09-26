const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Xử lý uncaught exception

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.MONGO.replace("<PASSWORD>", process.env.MONGO_PASSWORD);

// B. Kết nối vào Mongo Compass
mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});
// C. START SERVER
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Xử lý các promise bị reject (từ chối)
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION! Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
