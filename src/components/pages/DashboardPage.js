import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Image, Sidebar, Menu } from "semantic-ui-react";
import * as actions from "../../actions/auth";
import mainLogo from "../../img/11.png";
import HomePage from "./HomePage";

class DashboardPage extends React.Component {
  state = {
    visible: false,
    sideBarNav: 1
  };

  onClickLogout = () => {
    this.props.logout();
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <Container className="DashboardPageContent">
        <div className="ui top fixed fluid three labeled icon menu item small topMenu">
          <a
            role="button"
            className="item"
            tabIndex="0"
            onClick={this.toggleVisibility}
          >
            <i className="sidebar icon" />
            메뉴
          </a>
          <Link to="/" role="button" className="item">
            <Image src={mainLogo} size="mini" centered circular />
          </Link>
          <a
            className="item"
            onClick={this.onClickLogout}
            role="button"
            tabIndex="0"
          >
            <i className="sign out icon" />
            로그아웃
          </a>
        </div>

        <Sidebar
          as={Menu}
          className="sideBarMenu"
          animation="overlay"
          width="thin"
          visible={visible}
          icon="labeled"
          vertical
        >
          <a className="item" role="button" tabIndex="0">
            블로그
          </a>
          <a className="item" role="button" tabIndex="0">
            메뉴2
          </a>
          <a className="item" role="button" tabIndex="0">
            메뉴3
          </a>
        </Sidebar>
        <Sidebar.Pusher className="innerDashboardPageContent">
          <HomePage />
        </Sidebar.Pusher>
      </Container>
    );
  }
}

DashboardPage.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, {
  logout: actions.logout
})(DashboardPage);
