export const createUiSlice = (set, get) => ({
  uiSlice: {
    isReactionPopupVisible: true,
  },
  uiSliceAction: {
    toggleReactionPopup: () =>
      set(state => {
        state.isReactionPopupVisible = !state.isReactionPopupVisible;
      }),
  },
});

export const uiSelectors = {
  isReactionPopupVisible: state => state.uiSlice.isReactionPopupVisible,
  toggleReactionPopup: state => state.uiSliceAction.toggleReactionPopup,
};
