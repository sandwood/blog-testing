import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Modal, Button, Segment, Grid, Divider, Image } from "semantic-ui-react";
import * as actions from "../../actions/auth";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import sideImage from '../../img/sa.png';

import "./css/main.css";

const LoginPage = ({ isConfirmed, isAuthenticated, logout, user }) => (
  <Container textAlign="center">
    <h2>홈페이지</h2>
    <Grid verticalAlign="middle" stackable columns={2}>
      <Grid.Column>
        <Image src={sideImage} size="medium" centered circular/>
      </Grid.Column>
      {isAuthenticated ? (
        <Grid.Column>
          <Segment>
            {user.email && <div>반갑습니다 {user.email}</div>}
            <br />
            <Button onClick={() => logout()}>로그아웃</Button>
          </Segment>
          <Segment>
            {!isConfirmed ? <ConfirmEmailMessage /> : <span>블로그 시작하기</span>}
          </Segment>
        </Grid.Column>
      ) : (
        <Grid.Column>
          <Segment textAlign="center">
            {!user.email && <div>로그인을 해주세요</div>}
            <br />
            <Modal
              dimmer="blurring"
              size={"mini"}
              trigger={<Button color="blue">로그인</Button>}
            >
              <Modal.Content>
                <h3>계정 로그인</h3>
                <LoginForm />
              </Modal.Content>
            </Modal>
            <br />
            <Divider horizontal>또는</Divider>
            <Modal
              dimmer="blurring"
              size={"mini"}
              trigger={<span className="hrefTag">비밀번호를 잊으셨나요?</span>}
            >
              <Modal.Content>
                <h3>비밀번호 찾기</h3>
                <ForgotPasswordForm />
              </Modal.Content>
            </Modal>
          </Segment>
          <Segment textAlign="center">
            계정이 없으신가요? {"  "}
            <Modal
              dimmer="blurring"
              size={"mini"}
              trigger={<span className="hrefTag">가입하기</span>}
            >
              <Modal.Content>
                <h3>회원가입</h3>
                <SignupForm />
              </Modal.Content>
            </Modal>
          </Segment>
        </Grid.Column>
      )}
    </Grid>
  </Container>
);

LoginPage.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    isConfirmed: !!state.user.confirmed,
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, {
  logout: actions.logout
})(LoginPage);
