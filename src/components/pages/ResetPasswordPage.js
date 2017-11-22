import React from "react";
import PropTypes from "prop-types";
import { Container, Message, Form, Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import InlineError from "../messages/InlineError";
import { validateToken, resetPassword } from "../../actions/auth";

class ResetPasswordPage extends React.Component {
  state = {
    data: {
      token: this.props.match.params.token,
      password: "",
      passwordConfirmation: ""
    },
    loading: true,
    errors: {},
    success: false
  };

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

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
        .resetPassword(this.state.data)
        .then(() => this.props.history.push("/"))
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "빈칸일 수 없어요";
    if (data.password !== data.passwordConfirmation)
      errors.password = "비밀번호가 달라요";
    return errors;
  };

  render() {
    const { errors, data, loading, success } = this.state;

    return (
      <Container>
        <Grid verticalAlign="middle" columns={3} centered>
          <Grid.Row>
            <Grid.Column>{"   "}</Grid.Column>
            <Grid.Column>
              {loading && <Message>로딩중..</Message>}
              {!loading &&
                success && (
                  <Form onSubmit={this.onSubmit} loading={loading}>
                    <Form.Field error={!!errors.password}>
                      <label htmlFor="password">새로운 비밀번호</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="새로운 비밀번호를 입력해주세요"
                        value={data.password}
                        onChange={this.onChange}
                      />
                      {errors.password && (
                        <InlineError text={errors.password} />
                      )}
                    </Form.Field>

                    <Form.Field error={!!errors.passwordConfirmation}>
                      <label htmlFor="passwordConfirmation">비밀번호 확인</label>
                      <input
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        placeholder="다시 입력해주세요"
                        value={data.passwordConfirmation}
                        onChange={this.onChange}
                      />
                      {errors.passwordConfirmation && (
                        <InlineError text={errors.passwordConfirmation} />
                      )}
                    </Form.Field>

                    <Button primary>다시설정</Button>
                  </Form>
                )}
              {!loading && !success && <Message>토큰이 틀려요</Message>}
            </Grid.Column>
            <Grid.Column>{"   "}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

ResetPasswordPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { validateToken, resetPassword })(
  ResetPasswordPage
);
