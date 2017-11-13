import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Message } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
import { resetPasswordRequest } from "../../actions/auth";

class ForgotPasswordFrom extends React.Component {
  state = {
    data: {
      email: ""
    },
    loading: false,
    success: false,
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
        .resetPasswordRequest(this.state.data)
        .then(() => this.setState({ success: true }))
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "잘못된 이메일이에요";
    return errors;
  };

  render() {
    const { errors, data, loading, success } = this.state;
    return (
      <div>
        {success ? (
          <Message>이메일을 보냈어요.</Message>
        ) : (
          <Form onSubmit={this.onSubmit} loading={loading}>
            {!!errors.global && <Message negative>{errors.global}</Message>}
            <Form.Field error={!!errors.email}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={data.email}
                onChange={this.onChange}
              />
              {errors.email && <InlineError text={errors.email} />}
            </Form.Field>
            <Button primary>비밀번호 찾기</Button>
          </Form>
        )}
      </div>
    );
  }
}

ForgotPasswordFrom.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordFrom);
