const DOWNLOAD = "DOWNLOAD";

const stateDefault = {
  downloadModal: {
    isShow: false,
    file: null,
  },
};

export default function modalReducer(state = stateDefault, action) {
  switch (action.type) {
    case DOWNLOAD:
      return {
        ...state,
        downloadModal: {
          isShow: !state.downloadModal.isShow,
          file: action.payload,
        },
      };
    default:
      return state;
  }
}

export const changeIsDownload = (file) => ({ type: DOWNLOAD, payload: file });
