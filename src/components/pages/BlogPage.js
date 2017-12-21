import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  Button,
  Icon,
  Header,
  Divider,
  Loader,
  Confirm,
  Image,
  Dimmer
} from "semantic-ui-react";
import {fetchPosts, createPost, updatePost, deletePost} from "../../actions/posts";
import {showDetailModal, showUpdateModal, showConfirmationModal, showCreateModal} from "../../actions/modals";
import CreatePostForm from "./CreatePostForm";
import UpdatePostModal from "./UpdatePostModal";
import SearchPostInput from "./SearchPostInput";
import DetailPostModal from "./DetailPostModal";

class PostsList extends React.Component {
  state = {
    posts: {
      docs: [],
      total: 0
    },
    foundPost: {},
    loading: true,
    dimmer: true,
    getPostsOptions: {
      page: 1,
      pageNumber: 9
    }
  };

  // Fetch all posts
  componentWillMount = () => {
    this.reloadPosts();
  };

  // Show more posts
  onClickMore = () => {
    this.setState({
      getPostsOptions: {
        ...this.state.getPostsOptions,
        page: this.state.getPostsOptions.page + 1
      },
      loading: true
    }, () => {
      this
        .props
        .fetchPosts(this.state.getPostsOptions)
        .then(() => {
          this.setState({
            loading: false,
            posts: {
              ...this.state.posts,
              docs: this
                .state
                .posts
                .docs
                .concat(this.props.posts.docs)
            }
          });
        });
    });
  };

  // Detail Post Modal handler
  onClickDetailPostOpen = e => {
    const {docs} = this.state.posts;
    const postToFind = e.currentTarget.dataset.title;
    this.setState({
      foundPost: docs.filter(post => post.title === postToFind)
    });
    this
      .props
      .showDetailModal(true);
  };

  // Confirmation Modal handler
  onClickConfirmationModalClose = () => {
    this
      .props
      .showConfirmationModal(false);
    this
      .props
      .showDetailModal(true);
  }

  // Create Post Modal handler
  onClickOpenCreatePost = () => {
    this
      .props
      .showCreateModal(true);
  }

  // On Submit Deletion
  onSubmitDeletion = () => {
    this.submitDelete(this.state.foundPost[0]);
  };

  reloadPosts = () => {
    this.setState({
      loading: true,
      getPostsOptions: {
        ...this.state.getPostsOptions,
        page: 1
      }
    });
    this
      .props
      .fetchPosts(this.state.getPostsOptions)
      .then(() => {
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

  // Submits from actions
  submitPost = data => this
    .props
    .createPost(data)
    .then(() => {
      this
        .props
        .showCreateModal(false);
      this.reloadPosts();
    });

  submitUpdate = data => this
    .props
    .updatePost(data)
    .then(() => {
      this
        .props
        .showUpdateModal(false);
      this.reloadPosts();
    });

  submitDelete = data => this
    .props
    .deletePost(data)
    .then(() => {
      this
        .props
        .showConfirmationModal(false);
      this.reloadPosts();
    });

  render() {
    const {foundPost, loading, posts} = this.state;
    return (
      <div className="container_ centerAligned">
        {loading && (
          <Dimmer inverted active>
            <Loader>로딩중..</Loader>
          </Dimmer>
        )}
        <div className="headerWrapper">
          <Header floated="left" as="h2">
            블로그
          </Header>

          {/* ////////// Search Post Input ////////// */}
          <SearchPostInput/>

          <Button.Group
            floated="right"
            size="mini"
            role="button"
            tabIndex={0}
            color="blue"
            onClick={this.onClickOpenCreatePost}>
            <Button animated="vertical">
              <Button.Content visible>글쓰기</Button.Content>
              <Button.Content hidden>
                <Icon fitted name="write"/>
              </Button.Content>
            </Button>
          </Button.Group>

          {/* ////////// Create Modal ////////// */}
          {this.props.modals.create && (<CreatePostForm open={this.props.modals.create} submit={this.submitPost}/>)}
        </div>

        <Divider/>

        <Card.Group>
          {/* ////////// Map posts to Cards ////////// */}
          {posts.docs
            ? (posts.docs.map(post => (
              <Card
                centered
                key={post._id}
                link
                data-title={post.title}
                onClick={this.onClickDetailPostOpen}>
                <Card.Content textAlign="left" extra>
                  <Icon name="time"/> {post
                    .updatedAt
                    .slice(0, -5)
                    .replace("T", " ")}
                </Card.Content>
                {post.imgURL && (<Image
                  src={post
                  .imgURL
                  .split(",")[0]}
                  key={post
                  .imgURL
                  .split(",")[0]}/>)}
                <Card.Content textAlign="left" header={post.title}/>
                <Card.Content
                  textAlign="left"
                  description={post
                  .content
                  .substring(0, 50)
                  .concat(" ..")}/>
              </Card>
            )))
            : (
              <div>포스트가 없습니다.</div>
            )}
        </Card.Group>

        {/* //////// Deatail Modal ////////// */}
        {foundPost[0] && (<DetailPostModal
          open={this.props.modals.detail}
          pass={this.state.foundPost[0]}/>)}

        {/* ////////// Post Delete Confirmation ///////// */}
        {this.props.modals.confirmation && (<Confirm
          open={this.props.modals.confirmation}
          content="확실하세요?"
          cancelButton="아니요, 됐어요"
          confirmButton="네, 지워주세요"
          onCancel={this.onClickConfirmationModalClose}
          onConfirm={this.onSubmitDeletion}/>)}

        {/* ////////// Post Update Modal ////////// */}
        {this.props.modals.update && (<UpdatePostModal
          open={this.props.modals.update}
          pass={this.state.foundPost}
          submit={this.submitUpdate}/>)}

        {/* ////////// Loading more posts  ////////// */}
        {this.state.posts.total - this.state.getPostsOptions.pageNumber * this.state.getPostsOptions.page <= 0
          ? (
            <div className="seeMore">- 끝 -</div>
          )
          : (
            <Button className="seeMore" onClick={this.onClickMore}>더보기</Button>
          )}
        <br/>
        <br/>
      </div>
    );
  }
}

PostsList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    docs: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string.isRequired, content: PropTypes.string.isRequired}).isRequired),
    total: PropTypes.number
  }).isRequired,
  modals: PropTypes
    .shape({detail: PropTypes.bool, update: PropTypes.bool, confirmation: PropTypes.bool, create: PropTypes.bool})
    .isRequired,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showDetailModal: PropTypes.func.isRequired,
  showConfirmationModal: PropTypes.func.isRequired,
  showUpdateModal: PropTypes.func.isRequired,
  showCreateModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {posts: state.posts, modals: state.modals};
}

export default connect(mapStateToProps, {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  showDetailModal,
  showUpdateModal,
  showConfirmationModal,
  showCreateModal
})(PostsList);
