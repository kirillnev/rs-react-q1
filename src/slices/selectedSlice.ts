import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types.ts';

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
      if (state.selectedCharacters[character.id]) {
        state.selectedCharacters = state.selectedCharacters.filter(
          (item: Character) => item.id !== character.id
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
