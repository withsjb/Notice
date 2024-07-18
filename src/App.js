import React from 'react';
import { BrowserRouter as Router,Routes ,Route } from 'react-router-dom';
import Mainpage from './components/main/mainpage';
import Navbar from './components/main/navbar';
import Footer from './components/main/footer';
import Login from './components/login/login';
import RegionList from './components/region/list';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { GlobalProvider } from './components/GlobalContext';
// import {getIP, getCopyright} from './components/Tool';

// import Issue_Find_all from './issue/Find_all'; // ./issue/Find_all.js
import Home from './components/Home';
import Issue_Create from './components/issue/Create'; // ./issue/Create.js
import Issue_Read from './components/issue/Read'; // ./issue/Read.js
import Issue_Update from './components/issue/Update'; // ./issue/Update.js
import Issue_Delete from './components/issue/Delete'; // ./issue/Delete.js
import Info from './components/Info'; // ./components/Info.js

// 페이징, ./issue/Find_all_paging.js
import Issue_Find_all from './components/issue/Find_all_paging'; 

const App = () => {
  return (
    <GlobalProvider>
    <Router>
      <div className="App">
      <div className="container_main">
          <div className="navbarimgroom">
            <Navbar />
          </div>

          <div className="content_body">
            
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account/login" element={<Login />} />
      <Route path="/issue/find_all" element={<Issue_Find_all />} /> {/* <Link to="/issue/find_all"> */}
            <Route path="/issue/create" element={<Issue_Create />} /> {/* <Link to="/issue/create"> */}
            <Route path="/issue/:issueno" element={<Issue_Read />} /> {/* <Link to="/issue/1"> */}
            <Route path="/issue/update/:issueno" element={<Issue_Update />} /> {/* <Link to="/issue/update/1"> */}
            <Route path="/issue/delete/:issueno" element={<Issue_Delete />} /> {/* <Link to="/issue/delete/1"> */}
            <Route path="/info" element={<Info />} /> {/* <Link to="/info"> */}
        
      </Routes>
      
      <div className="bottom_menu">
            <Footer />
          </div>

      </div>
      </div>
      </div>
    </Router>
    </GlobalProvider>
  );
};

export default App;
