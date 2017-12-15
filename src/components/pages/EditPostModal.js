import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import upload from "superagent";
import { Modal, Segment, Image, Form, Button, Icon } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class EditPostModal extends React.Component {
  state = {
    loading: false,
    data: {
      _id: this.props.pass[0]._id,
      title: this.props.pass[0].title,
      content: this.props.pass[0].content,
      imgURL: this.props.pass[0].imgURL.split(",")
    },
    open: this.props.open,
    errors: {}
  };

  onDrop = files => {
    files.forEach(file => {
      upload
        .post("/api/posts/uploadImages")
        .set({ Authorization: `Bearer ${localStorage.sandwBlogJWT}` })
        .attach("file", file)
        .then(res => {
          this.setState({
            data: {
              ...this.state.data,
              imgURL: this.state.data.imgURL.filter(String).concat(res.body.imgURL)
            }
          });
        })
        .catch(err => console.log(err));
    });
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  onClickDeleteImg = index => {
    this.setState(this.state.data.imgURL.splice(index, 1));
  };

  onClickModal = () => {
    this.props.get(this.state.open);
    this.setState({ open: false });
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "비워둘 수 없어요";
    if (!data.content) errors.content = "비워둘 수 없어요";
    return errors;
  };

  render() {
    const { loading, open, errors } = this.state;
    return (
      <Modal className="modalEditPost" open={open} size={"small"}>
        <Icon
          link
          className="whiteIcon"
          name="close"
          floated="right"
          onClick={this.onClickModal}
        />
        <Modal.Header>
          <h2>포스트 수정</h2>
        </Modal.Header>
        <Modal.Content scrolling>
          <Form loading={loading}>
            <Form.Field>
              <Form.Input
                name="title"
                value={this.state.data.title}
                label="제목"
                onChange={this.onChange}
              />
              {errors.title && <InlineError text={errors.title} />}
            </Form.Field>
            <Segment className="dropzoneWrapper">
              {this.state.data.imgURL &&
                this.state.data.imgURL.map(
                  (img, index) =>
                    img && (
                      <Image
                        key={img}
                        className="sumnail"
                        label={{
                          as: "a",
                          color: "red",
                          corner: "right",
                          icon: "delete",
                          onClick: () => this.onClickDeleteImg(index)
                        }}
                        src={img}
                      />
                    )
                )}
              <br />
              <Dropzone className="dropzone" onDrop={this.onDrop}>
                <div>이곳을 클릭 또는 파일을 드랍해서 사진업로드를 하세요.</div>
              </Dropzone>
            </Segment>
            <Form.Field>
              <Form.TextArea
                name="content"
                autoHeight
                label="내용"
                value={this.state.data.content}
                onChange={this.onChange}
              />
              {errors.content && <InlineError text={errors.content} />}
            </Form.Field>
            {errors.global && <InlineError text={errors.global} />}
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

EditPostModal.propTypes = {
  pass: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      imgURL: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  get: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired
};

export default EditPostModal;
