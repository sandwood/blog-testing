import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTitles } from "../../actions/posts";

class SearchComponent extends React.Component {
  state = {
    titles: this.props.titles
  }
}

SearchComponent.propTypes = {
  titles: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    titles: state.titles
  };
}

export default connect(mapStateToProps, fetchTitles)(SearchComponent);
