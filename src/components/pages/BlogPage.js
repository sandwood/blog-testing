import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  Modal,
  Button,
  Icon,
  Header,
  Divider,
  Loader,
  Statistic
} from "semantic-ui-react";
import { fetchPosts, createPost, editPost } from "../../actions/posts";
import { allPostsSelector } from "../../reducers/posts";
import BlogWriteForm from "./BlogWriteForm";
import BlogPostEditModal from "./BlogPostEditModal";

class PostsList extends React.Component {
  state = {
    moreBlog: 6,
    clickCounter: 1,
    open: false,
    foundPost: {},
    loading: true,
    editModalOpen: false
  };

  componentDidMount = () =>
    this.props.fetchPosts().then(() => this.setState({ loading: false }));

  onClickMore = () => {
    const loadMore = this.state.moreBlog + 6;
    const counter = this.state.clickCounter + 1;
    this.setState({ moreBlog: loadMore, clickCounter: counter });
  };

  onClickPost = e => {
    const postToFind = e.currentTarget.dataset.title;
    this.setState({
      open: true,
      foundPost: this.props.posts.filter(post => post.title === postToFind)
    });
  };

  onClickEditPost = () => {
    this.setState({ open: false, editModalOpen: true });
  };

  submitPost = data =>
    this.props.createPost(data).then(() => window.location.reload());

  submitEdit = data => 
    this.props.editPost(data).then(() => window.location.reload());

  close = () => this.setState({ open: false });

  render() {
    const { posts } = this.props;
    const { open, foundPost, loading } = this.state;
    return (
      <div className="container_ centerAligned">
        <div className="headerWrapper">
          <Header floated="left" as="h2">
            블로그
          </Header>
          <Modal
            size={"large"}
            trigger={
              <Button.Group
                floated="right"
                size="mini"
                role="button"
                tabIndex={0}
                color="blue"
              >
                <Button animated="vertical">
                  <Button.Content visible>글쓰기</Button.Content>
                  <Button.Content hidden>
                    <Icon fitted name="write" />
                  </Button.Content>
                </Button>
              </Button.Group>
            }
          >
            <Modal.Content>
              <h3>글쓰기</h3>
              <BlogWriteForm submit={this.submitPost} />
            </Modal.Content>
          </Modal>
        </div>
        <Divider />
        <Card.Group>
          {loading && <Loader active />}
          {posts.slice(0, this.state.moreBlog).map(post => (
            <Card
              centered
              key={post._id}
              link
              data-title={post.title}
              onClick={this.onClickPost}
            >
              <Card.Content textAlign="left" header={post.title} />
              <Card.Content
                textAlign="left"
                description={post.content.substring(0, 15).concat("..")}
              />
              <Card.Content textAlign="left" extra>
                <Icon name="time" />
                {post.updatedAt.slice(0, -5).replace("T", " ")}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        {foundPost[0] && (
          <Modal className="modalPost" open={open} size={"large"}>
            <Icon link name="close" floated="right" onClick={this.close} />
            <Modal.Header className="centerAligned">
              <Statistic size="small">
                <Statistic.Label>
                  {foundPost[0].updatedAt.slice(0, -5).replace("T", " ")}
                </Statistic.Label>
                <Statistic.Value>{foundPost[0].title}</Statistic.Value>
              </Statistic>
            </Modal.Header>
            <Modal.Content scrolling>{foundPost[0].content}</Modal.Content>
            <Modal.Actions>
              <Button
                content="수정하기"
                primary
                icon="edit"
                labelPosition="right"
                onClick={this.onClickEditPost}
              />
            </Modal.Actions>
          </Modal>
        )}
        {this.state.editModalOpen && (
          <BlogPostEditModal
            open={this.state.editModalOpen}
            pass={this.state.foundPost}
            submit={this.submitEdit}
          />
        )}
        <br />
        {this.state.clickCounter > Math.floor(this.props.posts.length / 5) ? (
          <span>{}</span>
        ) : (
          <Button onClick={this.onClickMore}>더보기</Button>
        )}
        <br />
        <br />
      </div>
    );
  }
}

PostsList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  createPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: allPostsSelector(state)
  };
}

export default connect(mapStateToProps, { fetchPosts, createPost, editPost })(PostsList);
