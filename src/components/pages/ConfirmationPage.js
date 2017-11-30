import React from "react";
import PropTypes from "prop-types";
import { Container, Message, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirm } from "../../actions/auth";

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false,
    confirmed: this.props.user.confirmed
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() =>
        this.setState({ loading: false, success: this.state.confirmed })
      );
  }
  checkConfirmed = () => {
    this.setState({});
  };

  render() {
    const { loading, success } = this.state;

    return (
      <Container className="container_ confirmationPage">
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>이메일을 확인중</Message.Header>
          </Message>
        )}

        {!loading &&
          success && (
            <Message success icon>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>감사합니다. 이메일이 인증되었어요.</Message.Header>
                <br/>
                <Link as="a" className="ui button blue" to="/">
                  홈페이지로 가기
                </Link>
              </Message.Content>
            </Message>
          )}

        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>이런. 토근이 틀렸어요.</Message.Header>
              </Message.Content>
            </Message>
          )}
      </Container>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  user: PropTypes.shape({
    confirmed: PropTypes.bool.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { confirm })(ConfirmationPage);
