// so basically App.js getting data from MainComponent.js
import React, {Component} from 'react';
// so here in this way we will get our component
import Main from './components/MainComponent';
// this is for router
import { BrowserRouter } from 'react-router-dom';

// Provider will help to take reduxstore which we make accesiable to all components
import { Provider } from 'react-redux'; 
// so here we import the ConfigureStore which will return the store
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore(); // so here we getting data from the the  Configure store

class App extends Component {
  
  render() {
    return (
      // so provider is used for redux which will provide the data of store to all the components
      <Provider store={store}>
        {/* BrowserRouter will help us to configure router*/}
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

