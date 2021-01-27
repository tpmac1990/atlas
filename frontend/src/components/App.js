import React, { Component, Fragment, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './layout/header';
import SuspenseFallback from './attributions/SuspenseFallback';
import { Provider } from 'react-redux';
import store from '../redux/store';

import MapContent from './map/MapContent';
// import Attribution from './attributions/Attribution';

// const MapContent = lazy(() => import('./map/MapContent'));
const Attribution = lazy(() => import('./attributions/Attribution'));


class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <Suspense fallback={<SuspenseFallback />}>
                            <Switch>
                                <Route exact path="/" component={MapContent} />
                                <Route exact path="/attribution" component={Attribution} />
                            </Switch>
                        </Suspense>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('app'));
