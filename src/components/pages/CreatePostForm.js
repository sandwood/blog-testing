import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import upload from "superagent";
import {connect} from "react-redux";
import {
  Form,
  Button,
  Image,
  Segment,
  Modal,
  Icon
} from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import {showCreateModal} from "../../actions/modals";

class WritePostForm extends React.Component {
  state = {
    data: {
      title: "",
      writer: this.props.user.email,
      content: "",
      imgURL: []
    },
    open: this.props.open,
    loading: false,
    errors: {}
  };

  onDrop = files => {
    files.forEach(file => {
      upload
        .post("/api/posts/uploadImages")
        .set({Authorization: `Bearer ${localStorage.sandwBlogJWT}`})
        .attach("file", file)
        .then(res => this.setState({
          data: {
            ...this.state.data,
            imgURL: this
              .state
              .data
              .imgURL
              .concat(res.body.imgURL)
          }
        }))
        .catch(err => console.log(err));
    });
  };

  onChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if (Object.keys(errors).length === 0) {
      this.setState({loading: true});
      this
        .props
        .submit(this.state.data)
        .catch(err => this.setState({errors: err.response.data.errors, loading: false}))
    }
  };

  onClickDeleteImg = index => {
    this.setState(this.state.data.imgURL.splice(index, 1));
  };

  onClickCreateModalClose = () => {
    this
      .props
      .showCreateModal(false);
  };

  validate = data => {
    const errors = {};
    if (!data.title) 
      errors.title = "비워둘 수 없어요";
    if (!data.content) 
      errors.content = "비워둘 수 없어요";
    return errors;
  };

  render() {
    const {data, errors, loading, open} = this.state;

    return (
      <Modal open={open} size={"small"}>
        <Icon
          link
          className="whiteIcon"
          name="close"
          floated="right"
          onClick={this.onClickCreateModalClose}/>
        <Modal.Content>
          <h3>글쓰기</h3>
          <Form className="WritePostForm" loading={loading}>
            <Form.Field error={!!errors.title}>
              <Form.Input
                label="제목"
                id="title"
                name="title"
                value={data.title}
                onChange={this.onChange}/> {errors.title && <InlineError text={errors.title}/>}
            </Form.Field>
            <Segment className="dropzoneWrapper">
              {this.state.data.imgURL && this
                .state
                .data
                .imgURL
                .map((img, index) => (<Image
                  key={img}
                  className="sumnail"
                  label={{
                  as: "a",
                  color: "red",
                  corner: "right",
                  icon: "delete",
                  onClick: () => this.onClickDeleteImg(index)
                }}
                  src={img}/>))}
              <br/>
              <Dropzone className="dropzone" onDrop={this.onDrop}>
                <div>이곳을 클릭 또는 파일을 드랍해서 사진업로드를 하세요.</div>
              </Dropzone>
            </Segment>
            <Form.Field error={!!errors.content}>
              <Form.TextArea
                autoHeight
                label="내용"
                id="content"
                name="content"
                value={data.content}
                onChange={this.onChange}/> {errors.content && <InlineError text={errors.content}/>}
            </Form.Field>
            <Form.Field>
              <Button type="submit" onClick={this.onSubmit} primary>
                올리기
              </Button>
            </Form.Field>
            {errors.global && <InlineError text={errors.global}/>}
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

WritePostForm.propTypes = {
  user: PropTypes
    .shape({email: PropTypes.string.isRequired})
    .isRequired,
  submit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  showCreateModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {user: state.user, posts: state.posts};
}

export default connect(mapStateToProps, {showCreateModal})(WritePostForm);
