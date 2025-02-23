import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types';

interface SelectedState {
  selectedCharacters: Character[];
}

const initialState: SelectedState = {
  selectedCharacters: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const exists = state.selectedCharacters.some(
        (item) => item.id === character.id
      );

      if (exists) {
        state.selectedCharacters = state.selectedCharacters.filter(
          (item) => item.id !== character.id
        );
      } else {
        state.selectedCharacters.push(character);
      }
    },
    unselectAll: (state) => {
      state.selectedCharacters = [];
    },
  },
});

export const { toggleItem, unselectAll } = selectedSlice.actions;
export default selectedSlice.reducer;
