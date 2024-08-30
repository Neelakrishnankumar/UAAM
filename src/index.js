import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import listViewReducer from './store/reducers/Listviewreducer';
import Listviewapireducer from './store/reducers/Listviewapireducer';
import Globalurl from './global';
import LoginReducer from './store/reducers/LoginReducer';
import Formapireducer from './store/reducers/Formapireducer';
import Imguploadreducer from './store/reducers/Imguploadreducer';
import Comboreducer from './store/reducers/Comboreducer';
import Lookupapireducer from './store/reducers/Lookupapireducer';
import Explorelitviewapireducer from './store/reducers/Explorelitviewapireducer';
import screenRightsreducer from './store/reducers/screenRightsreducer';




const store = configureStore({
  reducer:{
    listViewData:listViewReducer,
    listviewApi: Listviewapireducer,
    loginApi:LoginReducer,
    globalurl:Globalurl,
    formApi: Formapireducer,
    imageApi:Imguploadreducer,
    comboApi:Comboreducer,
    lookupApi:Lookupapireducer,
    exploreApi:Explorelitviewapireducer,
     screenRights:screenRightsreducer,
  },
 
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    {/* <main className="content"> */}
    <BrowserRouter>
    <Provider store={store}>
     <App/>
     </Provider>
    </BrowserRouter>
    {/* </main> */}
  </React.Fragment>
);
export default store

