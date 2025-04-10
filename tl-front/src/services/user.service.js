import http from "../http-common";

class UserDataService {

  register(data) {
    return http.post("/users/register", data);
  }

  authorize(data) {
    return http.post(`/users/authorize`, data);
  }

  get(id) {
    return http.get(`/users/${id}`);
  }
}

const userDataService = new UserDataService();
export default userDataService;