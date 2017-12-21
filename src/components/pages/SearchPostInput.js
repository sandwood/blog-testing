import React from "react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";

class SearchPostInput extends React.Component {
  state = {
    searchKey: "",
    loading: false,
    options: [],
    titles: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    if (data.searchQuery.length === 0) {
      this.timer = setTimeout(500);
    } else {
      this.timer = setTimeout(this.fetchOptions(data.searchQuery), 500);
    }
  };

  onChange = (e, data) => {
    console.log(data.value);
  };

  fetchOptions = data => {
    this.setState({ loading: true });
    axios
      .post("/api/posts/searchPost", { data })
      .then(res => res.data.post)
      .then(res => {
        const options = [];
        const titlesHash = {};
        res.forEach(title => {
          titlesHash[title.title] = title;
          options.push({
            key: title._id,
            value: title.title,
            text: title.title
          });
        });
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
          onChange={this.onChange}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          noResultsMessage="결과가 없어요."
        />
      </div>
    );
  }
}

export default SearchPostInput;
