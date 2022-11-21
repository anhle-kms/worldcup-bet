import moment from "moment";
import "moment/locale/vi";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { routes } from './routes';
import { configureStore } from './store'

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './assets/main.scss';

import background from './assets/images/background.jpg';
import { PureComponent } from "react";

class App extends PureComponent {
  store;
  constructor(props) {
    super(props);
    this.store = configureStore();
    moment.locale('vi');
  }

  render() {
    return (
      <Provider store={this.store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <div className="wc_container">
            <img className="wc_container__background" alt="back ground" src={background} />
            <RouterProvider router={routes} />
            <ToastContainer />
          </div>
        </LocalizationProvider>
      </Provider>
    );
  }
}

export default App;
