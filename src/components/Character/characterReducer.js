import { createAction, createReducer } from "@reduxjs/toolkit";

export const setActiveCharacter = createAction("setActiveCharacter");

const reducer = createReducer({}, (builder) => {
  builder
    .addCase(setActiveCharacter, (state, action) => {
      return action.payload;
    })
    .addDefaultCase(() => {});
});

export default reducer;
