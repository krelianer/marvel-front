import React, { Component } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axiosInstance from "../../service/AxiosConfig";
import { Navigate } from "react-router-dom";

import './LoginPage.css'

export default class LoginPage extends Component {

  state = {
    email: "",
    password: "",
    submitted: false,
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };


  login = () => {
    axiosInstance.post(`/login`, { email: this.state.email, password: this.state.password })
      .then(res => {
        localStorage.setItem('jwt_token', res.data.token);
        this.setState({ submitted: true });
      })
    console.log("LOGIN");
  }

  render() {
    return (
      <div className="App">
        <form className="form">
          <TextField
            required
            id="email"
            label="Email"
            margin="normal"
            onChange={this.handleChange}
            type="text"
            value={this.state.email}
          />

          <TextField
            required
            id="password"
            label="Password"
            margin="normal"
            onChange={this.handleChange}
            type="password"
            value={this.state.password}
          />

          <Button type="button"
            color="primary"
            className="form__custom-button"
            onClick={this.login}>
            Log in
          </Button>

          {this.state.submitted && <Navigate to={'/'} />}

        </form>
      </div>
    );
  }
}