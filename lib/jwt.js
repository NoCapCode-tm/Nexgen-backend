import jwt from "jsonwebtoken";

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});

res.cookie("token", token, {
  httpOnly: true,
  secure: false, // true in production
  sameSite: "lax",
});

res.json({ success: true });
