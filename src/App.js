// import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Card from './components/shared/Card';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
// import FeedbackData from './Data/FeedbackData';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './pages/AboutPage';
import Post from './components/Post';
import {FeedbackProvider} from './context/FeedbackContext'

function App() {

  let activeStyle = {
    textDecoration: "none",
    color: 'green'
  };

  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            }>
            </Route>
            
            <Route exact path='/about' element={<AboutPage />} />
            <Route exact path='/post/*' element={<Post />} />

          </Routes>

          {/* section to demonstrate NavLink tag  */}
          <Card>
            <NavLink to='/' end style={({ isActive }) =>
                isActive ? activeStyle : undefined } 
            >
              Home 
            </NavLink>
            <hr />
            <NavLink to='/about' style={({ isActive }) =>
                isActive ? activeStyle : undefined } 
            >
              About
            </NavLink>
          </Card>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
