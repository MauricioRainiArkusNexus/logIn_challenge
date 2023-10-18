import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authSlice } from "./slices/authSlice";
/* import { rootSaga } from "./sagas/sagas"; */

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =
  typeof store.dispatch; /* TODO: research and implement correct approach with saga */
/* sagaMiddleware.run(rootSaga); */
