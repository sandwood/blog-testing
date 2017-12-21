import {DETAIL_MODAL_OPENED, UPDATE_MODAL_OPENED, CONFIRMATION_MODAL_OPENED, CREATE_MODAL_OPENED} from "../types";

const detailModalOpened = data => ({
  type: DETAIL_MODAL_OPENED,
  data: {
    'detail': data
  }
});

const updateModalOpened = data => ({
  type: UPDATE_MODAL_OPENED,
  data: {
    'update': data
  }
});

const confirmationModalOpened = data => ({
  type: CONFIRMATION_MODAL_OPENED,
  data: {
    'confirmation': data
  }
});

const createModalOpened = data => ({
  type: CREATE_MODAL_OPENED,
  data: {
    'create': data
  }
});

export const showDetailModal = data => dispatch => dispatch(detailModalOpened(data));

export const showConfirmationModal = data => dispatch => dispatch(confirmationModalOpened(data));

export const showUpdateModal = data => dispatch => dispatch(updateModalOpened(data));

export const showCreateModal = data => dispatch => dispatch(createModalOpened(data));