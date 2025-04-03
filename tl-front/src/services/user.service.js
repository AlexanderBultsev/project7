import http from "../http-common";

class UserDataService {

  register(data) {
    return http.post("/users/register", data);
  }

  authorize(data) {
    return http.post(`/users/authorize`, data);
  }
}

const userDataService = new UserDataService();
export default userDataService;