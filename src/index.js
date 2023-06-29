import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import Thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './Models/index';
import { persistConfig } from './Configs/ReduxPersistConfig';
import Routerpage from './Routerpage';
import LoaderMainPage from './Components/Loader/LoaderMainPage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

//개발용
// const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(Thunk, createLogger())));

//배포용
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(Thunk)));
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        {/* <App /> */}
        <Routerpage></Routerpage>
        
    </Provider>
);
