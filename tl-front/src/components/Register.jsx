import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { withWrapper } from "../wrappers/withWrapper";


class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeStaff = this.onChangeStaff.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      username: "",
      password: "", 
      staff: false
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

  onChangeStaff(e) {
    this.setState({
      staff: !this.state.staff
    });
  }

  register() {
    UserDataService.register(this.state)
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
            <h5 className="card-title">Регистрация</h5>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Имя пользователя</label>
              <input type="text" className="form-control" id="username" name="username" required value={this.state.username} onChange={this.onChangeUsername} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Пароль</label>
              <input type="password" className="form-control user-select-none" id="password" name="password" required value={this.state.password} onChange={this.onChangePassword} />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input user-select-none" id="staff" name="staff" required value={this.state.staff} onChange={this.onChangeStaff} />
              <label htmlFor="staff" className="form-check-label">Администратор</label>
            </div>
            <button onClick={this.register} className="btn btn-success">Зарегистрироваться</button>
          </div>
        </form>
      </div>
    );
  }
}


export default withWrapper(Register)