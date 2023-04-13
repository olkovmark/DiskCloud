const DOWNLOAD = "DOWNLOAD";

const stateDefault = {
  isDownload: false,
};

export default function modalReducer(state = stateDefault, action) {
  switch (action.type) {
    case DOWNLOAD:
      return { ...state, isDownload: !state.isDownload };

    default:
      return state;
  }
}

export const changeIsDownload = () => ({ type: DOWNLOAD });
