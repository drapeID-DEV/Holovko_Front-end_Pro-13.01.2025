import React, { Component } from "react";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSession: ``,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const currentUser = this.state.currentSession;
    if (!currentUser) {
      console.log("Empty string");
      return;
    }
    if (localStorage.getItem(currentUser)) {
      const userInLocal = JSON.parse(localStorage.getItem(currentUser));
      const password = userInLocal.password;
      if (this.state.password !== password) {
        console.log("Incorrect password!");
        return;
      }
      this.props.onLogin(currentUser);
      return;
    }
    localStorage.setItem(
      currentUser,
      JSON.stringify({ password: this.state.password })
    );
    this.props.onLogin(currentUser);
  }

  handleLoginChange(event) {
    if (!event.target.value.trim()) return;
    this.setState({
      currentSession: event.target.value.trim(),
    });
  }

  handlePasswordChange(event) {
    if (!event.target.value.trim()) return;
    this.setState({
      password: event.target.value.trim(),
    });
  }

  render() {
    return (
      <>
        <form className="register-form" onSubmit={this.handleSubmit}>
          <h3>Register new account or Login</h3>
          <label htmlFor="login-input">Login</label>
          <input
            id="login-input"
            type="text"
            onChange={this.handleLoginChange}
          />
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="text"
            onChange={this.handlePasswordChange}
          />
          <button className="control-btn login-btn" type="submit">
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default RegisterForm;
