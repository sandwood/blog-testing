import React from "react";
import PropTypes from "prop-types";
import { Container, Message, Icon, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirm } from "../../actions/auth";

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;

    return (
      <Container>
        <Grid verticalAlign="middle" columns={3} centered>
          <Grid.Row>
            <Grid.Column>{" "}</Grid.Column>
            <Grid.Column>
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
                      <Link to="/">홈페이지로 가기</Link>
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
            </Grid.Column>
            <Grid.Column>{" "}</Grid.Column>
          </Grid.Row>
        </Grid>
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
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);
