import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "semantic-ui-react";

class BlogPostEditModal extends React.Component {
  state = {
    loading: false,
    data: {
      _id: this.props.pass[0]._id,
      title: this.props.pass[0].title,
      content: this.props.pass[0].content
    },
    errors: {}
  };

  onChangePost = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = () => {
    this.setState({ loading: true });
    this.props
      .submit(this.state.data)
      .catch(err =>
        this.setState({ errors: err.response.data.errors, loading: false })
      );
  };

  render() {
    const { loading } = this.state;
    const { open } = this.props;
    return (
      <Modal className="modalEditPost" open={open} size={"large"}>
        <Modal.Header>
          <h2>포스트 수정</h2>
        </Modal.Header>
        <Modal.Content scrolling>
          <Form loading={loading}>
            <Form.Input
              name="title"
              value={this.state.data.title}
              label="제목"
              onChange={this.onChangePost}
            />
            <Form.TextArea
              name="content"
              autoHeight
              label="내용"
              value={this.state.data.content}
              onChange={this.onChangePost}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="수정하기"
            primary
            icon="edit"
            labelPosition="right"
            onClick={this.onSubmit}
          />
          <Button
            content="취소"
            color="red"
            icon="window close"
            labelPosition="right"
            onClick={() => window.location.reload()}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

BlogPostEditModal.propTypes = {
  pass: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  open: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
};

export default BlogPostEditModal;
