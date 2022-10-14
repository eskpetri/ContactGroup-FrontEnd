import './App.css';
import Login from './Login';

import GroupList from './group/GroupList';
import SelectedGroup from './group/SelectedGroup';
import DeleteGroup from './group/DeleteGroup';
import AddGroup from './group/AddGroup';
import JoinGroup from './group/JoinGroup';
import LeaveGroup from './group/LeaveGroup';
import ShowMembersGroup from './group/ShowMembersGroup';

import UserList from './contacts/UserList';
import Selecteduser from './contacts/SelectedUser';
import Deleteuser from './contacts/DeleteUser';
import Adduser from './contacts/AddUser';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <div>
        <ul>
          <li> <Link to="/login">Login</Link>  </li>
          <li> <Link to="/Grouplist">Groups</Link>  </li>
          <li> <Link to="/userlist">Contacts</Link>  </li>
        </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/login" element={<Login/>} />

        <Route exact path="/grouplist" element={<GroupList/>} />
        <Route exact path="/grouplist/:cid" element={<GroupList/>} />
        <Route exact path="/grouplist/selectedgroup/:id" element={<SelectedGroup/>} />
        <Route exact path="/grouplist/deletegroup/:id" element={<DeleteGroup/>} />
        <Route exact path="/addGroup" element={<AddGroup/>} />
        <Route exact path="/grouplist/joingroup/:id" element={<JoinGroup/>} />
        <Route exact path="/grouplist/leavegroup/:id" element={<LeaveGroup/>} />
        <Route exact path="/grouplist/showmembersgroup/:id" element={<ShowMembersGroup/>} />

        <Route exact path="/userlist" element={<UserList/>} />
        <Route exact path="/userlist/selecteduser/:id" element={<Selecteduser/>} />
        <Route exact path="/userlist/deleteuser/:id" element={<Deleteuser/>} />
        <Route exact path="/adduser" element={<Adduser/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
