import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Image,
  Sidebar,
  Menu
} from "semantic-ui-react";
import * as actions from "../../actions/auth";
import mainLogo from "../../img/11.png";
import profileImage from "../../img/sa.png";

class NavBarsPage extends React.Component {
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
      <Container className="NavBarsPageContent">
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
          <div className="item" role="button" tabIndex="0">
            <Image src={profileImage} size="tiny" centered circular />
            <br/>
            {this.props.user.email}
          </div>

          <Link to="/" role="button" className="item">
          홈
          </Link>
          <Link to="/blog" className="item" role="button" tabIndex="0">
            블로그
          </Link>
        </Sidebar>
      </Container>
    );
  }
}

NavBarsPage.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {
  logout: actions.logout
})(NavBarsPage);
