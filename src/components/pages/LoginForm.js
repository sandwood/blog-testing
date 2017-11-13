import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import Validator from "validator";
import { login } from "../../actions/auth";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      console.log("onSubmit", this.state.data);
      this.setState({ loading: true });
      this.props
        .login(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "이메일이 적절하지 않아요";
    if (!data.password) errors.password = "비워둘 수 없어요";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호 입력"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field>
          <Button type="submit" primary>로그인</Button>
        </Form.Field>
        {errors.global && <InlineError text={errors.global} />}
      </Form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginForm);
