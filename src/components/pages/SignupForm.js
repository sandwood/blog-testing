import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
import { signup } from "../../actions/auth";

class SignupForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .signup(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        )
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "잘못된 이메일이에요";
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
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          <span style={{ fontSize: 12 }}>신중하게 기재해주세요</span>
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>가입하기</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupForm);
