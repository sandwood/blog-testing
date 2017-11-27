import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button, Icon } from "semantic-ui-react";

class BlogPostEditModal extends React.Component {
  state = {
    loading: false,
    data: {
      _id: this.props.pass[0]._id,
      title: this.props.pass[0].title,
      content: this.props.pass[0].content
    },
    open: this.props.open,
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
  
  onClickModal = () => {
    this.props.get(this.state.open);
    this.setState({ open: false });
  }

  render() {
    const { loading, open } = this.state;
    return (
      <Modal className="modalEditPost" open={open} size={"small"}>
        <Icon link className="whiteIcon" name="close" floated="right" onClick={this.onClickModal} />
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
  get: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired
};

export default BlogPostEditModal;
