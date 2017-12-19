import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { fetchTitles, searchTitle } from "../../actions/titles";

class SearchPostInput extends React.Component {
  state = {
    searchKey: "",
    loading: false,
    options: [],
    titles: {}
  };

  onTitleSelect = title => {
    console.log(title);
    this.props.searchTitle(title.title).catch(err => console.log(err));
  };

  onSearchChange = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.fetchOptions, 100);
  };

  onChange = (e, data) => {
    this.onTitleSelect(this.state.titles[data.value]);
  };

  fetchOptions = () => {
    this.setState({ loading: true });
    this.props
      .fetchTitles()
      .then(res => res.titles)
      .then(titles => {
        const options = [];
        const titlesHash = {};
        titles.forEach(title => {
          titlesHash[title.title] = title;
          options.push({
            key: title._id,
            value: title.title,
            text: title.title
          });
        });
        console.log('fetchTitles');
        this.setState({ loading: false, options, titles: titlesHash });
      });
  };

  render() {
    return (
      <div className="searchTitleWrapper">
        <Dropdown
          search
          placeholder="검색"
          selection
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          onChange={this.onChange}
          loading={this.state.loading}
          noResultsMessage='결과가 없어요.'
        />
      </div>
    );
  }
}

SearchPostInput.propTypes = {
  fetchTitles: PropTypes.func.isRequired,
  searchTitle: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    titles: state.titles
  };
}

export default connect(mapStateToProps, { fetchTitles, searchTitle })(
  SearchPostInput
);
