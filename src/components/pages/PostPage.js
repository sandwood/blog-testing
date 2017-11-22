import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Item, Modal, Button } from "semantic-ui-react";
import { fetchPosts } from "../../actions/posts";
import { allPostsSelector } from "../../reducers/posts";
import BlogWriteForm from "./BlogWriteForm";

class PostsList extends React.Component {
  state = {
    moreBlog: 5
  };

  componentDidMount = () => this.props.fetchPosts();

  onClickMore = () => {
    this.setState({ moreBlog: 10 });
  };

  render() {
    const { posts } = this.props;
    return (
      <div>
        <Modal size={"large"} trigger={<Button color="blue">글쓰기</Button>}>
          <Modal.Content>
            <h3>글쓰기</h3>
            <BlogWriteForm />
          </Modal.Content>
        </Modal>
        <Item.Group divided>
          {posts.slice(0, this.state.moreBlog).map(post => (
            <Item key={post._id}>
              <Item.Content verticalAlign="middle">
                <Item.Header content={post.title} />
                <Item.Description content={post.content} />
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
        <Button onClick={this.onClickMore}>더보기</Button>
      </div>
    );
  }
}
PostsList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    posts: allPostsSelector(state)
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
