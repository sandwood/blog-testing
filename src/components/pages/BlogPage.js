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
  Confirm,
  Statistic,
  Dimmer
} from "semantic-ui-react";
import {
  fetchPosts,
  createPost,
  editPost,
  deletePost
} from "../../actions/posts";
import { allPostsSelector } from "../../reducers/posts";
import BlogWriteForm from "./BlogWriteForm";
import BlogPostEditModal from "./BlogPostEditModal";

class PostsList extends React.Component {
  state = {
    moreBlog: 6,
    clickCounter: 1,
    foundPost: {},
    loading: true,
    confirm: false,
    createModalOpen: false,
    detailModalOpen: false,
    editModalOpen: false
  };

  // Fetch all posts
  componentDidMount = () =>
    this.props.fetchPosts().then(() => this.setState({ loading: false }));

  // Show more posts
  onClickMore = () => {
    const loadMore = this.state.moreBlog + 6;
    const counter = this.state.clickCounter + 1;
    this.setState({ moreBlog: loadMore, clickCounter: counter });
  };

  // Detail Post Modal handler
  onClickDetailPostOpen = e => {
    const postToFind = e.currentTarget.dataset.title;
    this.setState({
      detailModalOpen: true,
      foundPost: this.props.posts.filter(post => post.title === postToFind)
    });
  };
  onClickCloseDetailModal = () => this.setState({ detailModalOpen: false });

  // Create Post Modal handler
  onClickOpenCreatePostModal = () => this.setState({ createModalOpen: true });
  onClickCloseCreatePostModal = () => this.setState({ createModalOpen: false });

  // Confirmation Modal handler
  onClickConfirmationOpen = () => this.setState({ confirm: true });
  onClickConfirmationClose = () => this.setState({ confirm: false });

  // Edit Post Modal handler
  onClickOpenEditPost = () =>
    this.setState({ detailModalOpen: false, editModalOpen: true });

  // On Submit Deletion
  onSubmitDeletion = () => this.submitDelete(this.state.foundPost[0]);

  // Brought event from child component
  getEditModalOpen = event => {
    this.setState({
      editModalOpen: !event,
      detailModalOpen: event
    });
  };

  // Submits from actions
  submitPost = data =>
    this.props.createPost(data).then(() => window.location.reload());
  submitEdit = data =>
    this.props.editPost(data).then(() => window.location.reload());
  submitDelete = data =>
    this.props.deletePost(data).then(() => window.location.reload());

  render() {
    const { posts } = this.props;
    const { detailModalOpen, createModalOpen, foundPost, loading } = this.state;
    return (
      <div className="container_ centerAligned">
        <div className="headerWrapper">
          <Header floated="left" as="h2">
            블로그
          </Header>
          <Button.Group
            floated="right"
            size="mini"
            role="button"
            tabIndex={0}
            color="blue"
            onClick={this.onClickOpenCreatePostModal}
          >
            <Button animated="vertical">
              <Button.Content visible>글쓰기</Button.Content>
              <Button.Content hidden>
                <Icon fitted name="write" />
              </Button.Content>
            </Button>
          </Button.Group>

          {/* ////////// Create Modal ////////// */}
          <Modal open={createModalOpen} size={"small"}>
            <Icon
              link
              className="whiteIcon"
              name="close"
              floated="right"
              onClick={this.onClickCloseCreatePostModal}
            />
            <Modal.Content>
              <h3>글쓰기</h3>
              <BlogWriteForm submit={this.submitPost} />
            </Modal.Content>
          </Modal>
        </div>
        <Divider />
        <Card.Group>
          {loading && (
            <Dimmer active>
              <Loader>로딩중..</Loader>
            </Dimmer>
          )}
          {/* ////////// Map posts to Cards ////////// */}
          {posts.slice(0, this.state.moreBlog).map(post => (
            <Card
              centered
              key={post._id}
              link
              data-title={post.title}
              onClick={this.onClickDetailPostOpen}
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
          // //////// Deatail Modal ////////// //
          <Modal className="modalPost" open={detailModalOpen} size={"small"}>
            <Icon
              link
              className="whiteIcon"
              name="close"
              floated="right"
              onClick={this.onClickCloseDetailModal}
            />
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
                content="지우기"
                color="red"
                icon="delete"
                labelPosition="right"
                onClick={this.onClickConfirmationOpen}
              />
              <Button
                content="수정하기"
                primary
                icon="edit"
                labelPosition="right"
                onClick={this.onClickOpenEditPost}
              />
            </Modal.Actions>
          </Modal>
        )}

        {this.state.confirm && (
          // ////////// Confirmation for delete ///////// //
          <Confirm
            open={this.state.confirm}
            content="확실하세요?"
            cancelButton="아니요, 됐어요"
            confirmButton="네, 지워주세요"
            onCancel={this.onClickConfirmationClose}
            onConfirm={this.onSubmitDeletion}
          />
        )}

        {this.state.editModalOpen && (
          // ////////// Post Edit Modal ////////// //
          <BlogPostEditModal
            open={this.state.editModalOpen}
            get={this.getEditModalOpen}
            pass={this.state.foundPost}
            submit={this.submitEdit}
          />
        )}
        <br />
        {/* ////////// Loading more posts  ////////// */}
        {this.state.clickCounter > Math.floor(this.props.posts.length / 5) ? (
          <span>- 끝 -</span>
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
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: allPostsSelector(state)
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  createPost,
  editPost,
  deletePost
})(PostsList);
