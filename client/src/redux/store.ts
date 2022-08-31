import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import { watcherSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middleWare = [sagaMiddleware];

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleWare),
  devTools: true,
});

// Saga listener
sagaMiddleware.run(watcherSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
