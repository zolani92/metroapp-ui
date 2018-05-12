import React, { Component } from 'react'
import MetroMain from './components/MetroMain'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

class App extends Component {
    render() {
        const store = createStore(
            reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <MetroMain />
            </Provider>
        )
    }
}

export default App