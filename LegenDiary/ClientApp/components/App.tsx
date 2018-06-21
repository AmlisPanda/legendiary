import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';


import { Layout } from './Layout';
import { Home } from './Home';
import { UserHome } from './UserHome';

interface AppProps {
    authenticated: boolean,
    checked: boolean
};


const App: React.SFC<AppProps> = (props) => {
    return <BrowserRouter>
            <Layout>
                <Route
                    exact
                    path={"/user"}
                    render={renderProps => (
                        props.authenticated ? (
                            React.createElement(UserHome, renderProps)
                        ) : (
                                <Redirect to={{
                                    pathname: '/',
                                    state: { from: renderProps.location }
                                }} />
                            )
                    )}
                />
                <Route exact path="/" component={Home} />
        </Layout>
    </BrowserRouter>
}



const mapState = ({ session }) => ({
    checked: session.checked,
    authenticated: session.authenticated
});

export default connect(mapState)(App);


//export const routes = <Layout>
//    <Route exact path="/" component={Home} />
//    <Route path="/user" render={props => (
//        authenticated ? (
//            React.createElement(UserHome, props)
//        ) : (
//            <Redirect to={{
//                pathname: '/',
//                state: { from: props.location }
//            }} />
//        ) />
//</Layout>;


//const {bool} = PropTypes;

//App.propTypes = {
//        authenticated: bool.isRequired,
//  checked: bool.isRequired
//};

//const mapState = ({session}) => ({
//        checked: session.checked,
//  authenticated: session.authenticated
//});

//export default connect(mapState)(routes);