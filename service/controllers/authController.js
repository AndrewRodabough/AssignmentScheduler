import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import { UserService } from '../services/userService.js';

export class AuthController {
  constructor(dataStore) {
    this.userService = new UserService(dataStore);
  }

  async createUser(req, res) {
    // Validate input (already done in middleware)
    try {
      const { username, password } = req.body;
      const saltRounds = 6;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await this.userService.createUser(username, hashedPassword);
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      if (error.message === 'User already exists') {
        return res.status(409).json({ error: error.message });
      }
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
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = uuid();
      await this.userService.storeToken(token, username);
      return res.status(200).json({ token });
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
