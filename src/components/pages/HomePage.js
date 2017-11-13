import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Container, Button, Segment, Grid, Image } from "semantic-ui-react";
import * as actions from "../../actions/auth";
import LoginForm from "./LoginForm";
import sideImage from '../../img/sa.png';
import "./css/main.css";

const HomePage = ({ isAuthenticated, logout, user }) => (
  <div>
    <Container textAlign="center">
      <h2>홈페이지</h2>
      
      <Grid verticalAlign='middle' stackable columns={2}>
        <Grid.Column><Image src={sideImage} size="large" centered circular/></Grid.Column>
        {isAuthenticated ? (
          <Grid.Column>
            <Segment>
              {user.email && <div>반갑습니다 {user.email}</div>}
              <br/>
              <Button onClick={() => logout()}>로그아웃</Button>
            </Segment>
          </Grid.Column>
        ) : (
          <Grid.Column>
            <Segment textAlign="center">
              {!user.email && <div>로그인을 해주세요</div>}
              <br/>
              <Modal dimmer="blurring" size={"mini"} trigger={<Button color="blue">로그인</Button>}>
                <Modal.Content>
                  <h3>계정 로그인</h3>
                  <LoginForm />
                </Modal.Content>
              </Modal>
            </Segment>
            <Segment textAlign="center">
              <p>
                계정이 없으신가요? <Link to="/signup">가입하기</Link>
              </p>
            </Segment>
          </Grid.Column>
        )}
      </Grid>
    </Container>
  </div>
);

HomePage.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, {
  logout: actions.logout
})(HomePage);
