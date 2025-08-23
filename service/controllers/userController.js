import { UserService } from '../services/userService.js';

export class UserController {
  constructor(dataStore) {
    this.userService = new UserService(dataStore);
  }

  async createUser(req, res) {
    try {
      const { username, password } = req.body;
      await this.userService.createUser(username, password);
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await this.userService.getUser(username);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      const token = await this.userService.createToken(username, password);
      return res.status(200).json({ token: token, userUID: user.userUID });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers.authorization;
      await this.userService.deleteToken(token);
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
