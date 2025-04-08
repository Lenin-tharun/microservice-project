import jwt from "jsonwebtoken";

const userInfoSecret = process.env.USER_INFO_SECRET;
const tokens = {
  verifyUserInfo: async (token) => {
    return jwt.verify(token, userInfoSecret);
  },
};
export default tokens;
