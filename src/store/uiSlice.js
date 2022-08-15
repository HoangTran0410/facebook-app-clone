export const createUiSlice = (set, get) => ({
  uiSlice: {
    reactionPopupPosition: null,
  },
  uiSliceAction: {
    setReactionPopupPosition: position =>
      set(state => {
        state.uiSlice.reactionPopupPosition = position;
      }),
  },
});

export const uiSelectors = {
  reactionPopupPosition: state => state.uiSlice.reactionPopupPosition,
  setReactionPopupPosition: state =>
    state.uiSliceAction.setReactionPopupPosition,
};
