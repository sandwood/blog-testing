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
  Image,
  Dimmer
} from "semantic-ui-react";
import {
  fetchPosts,
  createPost,
  editPost,
  deletePost
} from "../../actions/posts";
import BlogWriteForm from "./BlogWriteForm";
import BlogPostEditModal from "./BlogPostEditModal";

class PostsList extends React.Component {
  state = {
    posts: {
      docs: [],
      total: 0
    },
    foundPost: {},
    loading: true,
    confirm: false,
    createModalOpen: false,
    detailModalOpen: false,
    editModalOpen: false,
    dimmer: true,
    getTitlesOptions: {
      page: 1,
      pageNumber: 6
    }
  };

  // Fetch all posts
  componentWillMount = () => {
    this.props.fetchPosts(this.state.getTitlesOptions).then(() => {
      this.setState({
        loading: false,
        posts: {
          ...this.props.posts,
          docs: this.props.posts.docs,
          total: this.props.posts.total
        }
      });
    });
  };

  // Show more posts

  onClickMore = () => {
    this.setState(
      {
        getTitlesOptions: {
          ...this.state.getTitlesOptions,
          page: this.state.getTitlesOptions.page + 1
        },
        loading: true
      },
      () => {
        this.props.fetchPosts(this.state.getTitlesOptions).then(() => {
          this.setState({
            loading: false,
            posts: {
              ...this.state.posts,
              docs: this.state.posts.docs.concat(this.props.posts.docs)
            }
          });
        });
      }
    );
  };

  // Detail Post Modal handler
  onClickDetailPostOpen = e => {
    const { docs } = this.state.posts;
    const postToFind = e.currentTarget.dataset.title;
    this.setState({
      detailModalOpen: true,
      foundPost: docs.filter(post => post.title === postToFind)
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
    const {
      detailModalOpen,
      createModalOpen,
      foundPost,
      loading,
      posts
    } = this.state;
    return (
      <div className="container_ centerAligned">
        {loading && (
          <Dimmer active>
            <Loader>로딩중..</Loader>
          </Dimmer>
        )}
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
          {/* ////////// Map posts to Cards ////////// */}
          {posts.docs ? (
            posts.docs.map(post => (
              <Card
                centered
                key={post._id}
                link
                data-title={post.title}
                onClick={this.onClickDetailPostOpen}
              >
                <Card.Content textAlign="left" extra>
                  <Icon name="time" />
                  {post.updatedAt.slice(0, -5).replace("T", " ")}
                </Card.Content>
                {post.imgURL && (
                  <Image
                    src={post.imgURL.split(",")[0]}
                    key={post.imgURL.split(",")[0]}
                  />
                )}
                <Card.Content textAlign="left" header={post.title} />
                <Card.Content
                  textAlign="left"
                  description={post.content.substring(0, 50).concat(" ..")}
                />
              </Card>
            ))
          ) : (
            <div>포스트가 없습니다.</div>
          )}
        </Card.Group>

        {/* //////// Deatail Modal ////////// */}
        {foundPost[0] && (
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
            <Modal.Content scrolling>
              {foundPost[0].imgURL &&
                foundPost[0].imgURL
                  .split(",")
                  .map(img => <Image src={img} key={img} />)}
              <br />
              {foundPost[0].content}
            </Modal.Content>
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

        {/* ////////// Confirmation for delete ///////// */}
        {this.state.confirm && (
          <Confirm
            open={this.state.confirm}
            content="확실하세요?"
            cancelButton="아니요, 됐어요"
            confirmButton="네, 지워주세요"
            onCancel={this.onClickConfirmationClose}
            onConfirm={this.onSubmitDeletion}
          />
        )}

        {/* ////////// Post Edit Modal ////////// */}
        {this.state.editModalOpen && (
          <BlogPostEditModal
            open={this.state.editModalOpen}
            get={this.getEditModalOpen}
            pass={this.state.foundPost}
            submit={this.submitEdit}
          />
        )}
        <br />

        {/* ////////// Loading more posts  ////////// */}
        {this.state.posts.total -
          this.state.getTitlesOptions.pageNumber *
            this.state.getTitlesOptions.page <=
        0 ? (
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
  posts: PropTypes.shape({
    docs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      }).isRequired
    ),
    total: PropTypes.number
  }).isRequired,
  createPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  createPost,
  editPost,
  deletePost
})(PostsList);
