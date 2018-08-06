import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Layout } from './Layout';
import { Home } from './Home';
import { UserHome } from './UserHome';


const App: React.SFC = () => {
    return <BrowserRouter>
        <Layout>
            <PrivateRoute exact path="/user" component={(props) => (
                <UserHome displayMode="month" {...props} />
            )} />
            <PrivateRoute exact path="/user/day" component={(props) => (
                <UserHome displayMode="day" {...props} />
            )} />
            <PrivateRoute exact path="/user/month" component={(props) => (
                <UserHome displayMode="month" {...props}  />
            )} />
            <PrivateRoute exact path="/user/year" component={(props) => (
                <UserHome displayMode="year" {...props} />
            )} />
            <Route exact path="/" component={Home} />
        </Layout>
    </BrowserRouter>
}

export default App;

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