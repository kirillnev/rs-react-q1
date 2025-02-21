import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedState {
  selectedIds: { [id: number]: boolean };
}

const initialState: SelectedState = {
  selectedIds: {},
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<number>) => {
      state.selectedIds[action.payload] = !state.selectedIds[action.payload];
    },
    unselectAll: (state) => {
      state.selectedIds = {};
    },
  },
});

export const { toggleItem, unselectAll } = selectedSlice.actions;
export default selectedSlice.reducer;
