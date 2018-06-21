import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './sass/site.scss';

// Add the sessionReducer
const reducer = combineReducers({
    session: sessionReducer
});

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));

// Init the session service
sessionService.initSessionService(store);

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <AppContainer>
                    <App />
                </AppContainer>
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
//if (module.hot) {
//    module.hot.accept('./routes', () => {
//        routes = require<typeof RoutesModule>('./routes').routes;
//        renderApp();
//    });
//}
