import tokens from "../utils/tokens";

const extractUserInfo = (req, res, next) => {
  const userInfoToken = req.cookies.userInfo;

  if (!userInfoToken) return res.status(401).json({ message: "No user info" });

  try {
    const decoded = tokens.verifyUserInfo(userInfoToken); // your JWT verify
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid user info token" });
  }
};

export default extractUserInfo;
