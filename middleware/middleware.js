import user from "../models/user.js";
const user = await user.findOne({username});
if (!user) {
  return res.status(401).json({ message: "Invalid credentials" });
}
const match = await user.comparePassword(loginPassword);
if (!match) {
  return res.status(401).json({ message: "Invalid credentials" });
}