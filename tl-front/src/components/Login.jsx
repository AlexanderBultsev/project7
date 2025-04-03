import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { withWrapper } from "../wrappers/withWrapper";


class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  };

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  login() {
    var data = {
      username: this.state.username,
      password: this.state.password
    };

    UserDataService.authorize(data)
      .then(response => {
        this.props.login(response.data.user)
        console.log(response.data);
        this.props.navigate("/posts", { replace: true });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="container w-50 d-flex flex-column align-items-center gap-3">
        <form className="card" onSubmit={(e) => {e.preventDefault()}}>
          <div className="card-body d-flex flex-column gap-2">
            <h5 className="card-title">Вход</h5>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Имя пользователя</label>
              <input type="text" className="form-control" id="username" name="username" required value={this.state.username} onChange={this.onChangeUsername} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Пароль</label>
              <input type="password" className="form-control user-select-none" id="password" name="password" required value={this.state.password} onChange={this.onChangePassword} />
            </div>
            <button onClick={this.login} className="btn btn-success">Войти</button>
          </div>
        </form>
      </div>
    );
  }
}


export default withWrapper(Login)