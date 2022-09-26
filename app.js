const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const cardRouter = require("./routes/cardRoutes");
const userRouter = require("./routes/userRoutes");
const classRouter = require("./routes/classRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const reviewRouter = require("./routes/reviewRoutes");

// 1. Tạo ứng dụng express
const app = express();
// app.use(cors());

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

// 2. Ktra xem môi trường hiện tại mk đang code là môi trường j
// console.log(process.env.NODE_ENV);

// A. MIDDLEWARES
// A-0: morgan => ghi nhật ký request
app.use(morgan("dev"));

// A-1. Data đc gửi từ client sẽ đc
// chuyển đổi sang kiểu json()
app.use(express.json({ limit: "10kb" }));

// E. CookieParser
app.use(cookieParser());

// E-1:(Hàm in ra cookie mỗi khi login)
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

// B. ROUTES
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/reviews", reviewRouter);

// C. Bắt lỗi các routes ko dc xử lý
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// D. Error Handling Middleware
app.use(globalErrorHandler);
module.exports = app;
