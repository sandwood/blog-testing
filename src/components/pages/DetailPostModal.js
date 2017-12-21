import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Image, Modal, Icon, Statistic} from "semantic-ui-react";
import {showDetailModal, showConfirmationModal, showUpdateModal} from "../../actions/modals";

class DetailPostModal extends React.Component {
  state = {
    foundPost: this.props.pass
  };

  onClickDetailModalClose = () => {
    this
      .props
      .showDetailModal(false);
  }

  onClickDeletePost = () => {
    this
      .props
      .showDetailModal(false);
    this
      .props
      .showConfirmationModal(true);
  }

  onClickUpdatePost = () => {
    this
      .props
      .showDetailModal(false);
    this
      .props
      .showUpdateModal(true);
  }

  render() {
    const {foundPost} = this.state;
    return (
      <Modal className="modalPost" open={this.props.modals.detail} size={"small"}>
        <Icon
          link
          className="whiteIcon"
          name="close"
          floated="right"
          onClick={this.onClickDetailModalClose}/>
        <Modal.Header className="centerAligned">
          <Statistic size="small">
            <Statistic.Label>
              {foundPost
                .updatedAt
                .slice(0, -5)
                .replace("T", " ")}
            </Statistic.Label>
            <Statistic.Value>{foundPost.title}</Statistic.Value>
          </Statistic>
        </Modal.Header>
        <Modal.Content scrolling>
          {foundPost.imgURL && foundPost
            .imgURL
            .split(",")
            .map(img => <Image src={img} key={img}/>)}
          <br/> {foundPost.content}
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="지우기"
            color="red"
            icon="delete"
            labelPosition="right"
            onClick={this.onClickDeletePost}/>
          <Button
            content="수정하기"
            primary
            icon="edit"
            labelPosition="right"
            onClick={this.onClickUpdatePost}/>
        </Modal.Actions>
      </Modal>
    );
  }
}

DetailPostModal.propTypes = {
  pass: PropTypes
    .shape({title: PropTypes.string.isRequired, content: PropTypes.string.isRequired})
    .isRequired,
  modals: PropTypes
    .shape({detail: PropTypes.bool, update: PropTypes.bool})
    .isRequired,
  showConfirmationModal: PropTypes.func.isRequired,
  showUpdateModal: PropTypes.func.isRequired,
  showDetailModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {modals: state.modals};
}

export default connect(mapStateToProps, {showDetailModal, showConfirmationModal, showUpdateModal})(DetailPostModal);
