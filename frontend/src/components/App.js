import 'regenerator-runtime/runtime' // required for using react-table wwith global filter from the map component.
import React, { Component, Fragment, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './layout/header';
import Loading from './loading/Loading';
import { Provider } from 'react-redux';
import store from '../redux/store';
import checkRequests from "./HOC/CheckRequests";

import MapContent from './map/MapContent';
import { PopupTable } from './popups/PopupTable';
import { CoverInactive } from './popups/CoverInactive';

// const MapContent = lazy(() => import('./map/MapContent'));
const Attribution = lazy(() => import('./attributions/Attribution'));
const HomeDetail = lazy (() => import('./detail/HomeDetail'))
const Page404 = lazy (() => import('./errors/Page404'))


const SubApp = () => {
    return (
        <Fragment>
            <PopupTable />
            <CoverInactive /> 
            <Header />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path="/" component={MapContent} />
                    <Route exact path="/attribution" component={Attribution} />
                    <Route path="/detail" component={HomeDetail} />
                    <Route path="/404" component={Page404} />
                </Switch>
            </Suspense>
        </Fragment>
    )
}

const SubAppWithCheckRequests = checkRequests(SubApp)


const App = () => {
    return(
        <Provider store={store}>
            <Router>
                <SubAppWithCheckRequests />
                {/* <Fragment>
                    <Header />
                    <Suspense fallback={<SuspenseFallback />}>
                        <Switch>
                            <Route exact path="/" component={MapContent} />
                            <Route exact path="/attribution" component={Attribution} />
                            <Route path="/detail" component={HomeDetail} />
                        </Switch>
                    </Suspense>
                </Fragment> */}
            </Router>
        </Provider>
    )
}

// const AppWithCheckRequests = checkRequests(App)

ReactDOM.render(<App />,document.getElementById('app'));
