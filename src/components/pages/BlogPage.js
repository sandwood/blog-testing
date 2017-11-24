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
  Statistic
} from "semantic-ui-react";
import { fetchPosts } from "../../actions/posts";
import { allPostsSelector } from "../../reducers/posts";
import BlogWriteForm from "./BlogWriteForm";

class PostsList extends React.Component {
  state = {
    moreBlog: 6,
    clickCounter: 1,
    open: false,
    foundPost: {}
  };

  componentDidMount = () => this.props.fetchPosts();

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

  onClickEditPost = () => {};

  close = () => this.setState({ open: false });

  render() {
    const { posts } = this.props;
    const { open, foundPost } = this.state;
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
                compact
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
              <BlogWriteForm />
            </Modal.Content>
          </Modal>
        </div>
        <Divider />
        <Card.Group>
          {posts.slice(0, this.state.moreBlog).map(post => (
            <Card
              key={post._id}
              link
              data-title={post.title}
              onClick={this.onClickPost}
            >
              <Card.Content header={post.title} />
              <Card.Content
                description={post.content.substring(0, 15).concat("..")}
              />
              <Card.Content extra>
                <Icon name="time" />
                {post.updatedAt.slice(0, -5).replace("T", " ")}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        {foundPost[0] && (
          <Modal open={open} size={"large"}>
            <Modal.Header className="centerAligned">
              <Statistic size="small">
                <Statistic.Label>{foundPost[0].updatedAt.slice(0, -5).replace("T", " ")}</Statistic.Label>
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
              <Button
                content="닫기"
                color="red"
                icon="window close"
                labelPosition="right"
                onClick={this.close}
              />
            </Modal.Actions>
          </Modal>
        )}
        <br />
        {this.state.clickCounter > Math.floor(this.props.posts.length / 5) ? (
          <span>{}</span>
        ) : (
          <Button onClick={this.onClickMore}>더보기
          </Button>
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
  ).isRequired
};

function mapStateToProps(state) {
  return {
    posts: allPostsSelector(state)
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
