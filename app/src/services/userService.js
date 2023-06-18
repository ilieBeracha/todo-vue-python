import axios from "axios";

class UserService {
  async registerUser(username, email, password) {
    try {
      const response = axios.post("http://127.0.0.1:5000/register", {
        username,
        email,
        password,
      });
      console.log((await response).data);

      return (await response).data;
    } catch (e) {
      console.log(e);
    }
  }

  async loginUser(email, password) {
    try {
      const response = axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
      console.log((await response).data);
      return (await response).data;
    } catch (e) {
      console.log(e);
    }
  }
}

export const userService = new UserService();
