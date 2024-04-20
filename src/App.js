import './App.css';
import Home from './components/Home';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './components/EditBookForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import { useEffect, useContext } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import { auth } from './firebase';
import useStateInitializer from './custom_hooks/useStateInitializer';
import { AuthContext } from './context/AuthContext';

function App() {

  // const [state, setterFunction] = useState(initialValue)
  const [books, setBooks] = useStateInitializer([]);
  const {user, setUser} = useContext(AuthContext);

  const navigate = useNavigate();

  // Responsible for loading up information
  // that's returned to us from the backend
  useEffect(() => {
    fetch('https://stark-fjord-53787-110ae3a2c7f6.herokuapp.com/manage_books')
    .then(res => res.json())
    .then(books => setBooks(books))
  }, []);

  // Responsible for loading Up our "user" state
  useEffect(() => {
    
    // Here, we're determining whether or not a User
    // session still exists from the last login
    const unsubscribe = auth.onAuthStateChanged((user) => {
      
      // Update User state with value of last signed in User before
      // navigating to the Home page.
      setUser(user);
      navigate('/');
    });

    return () => unsubscribe();
  }, []);

  // Callback Functions
  const handleDelete = (bookId) => {
      console.log(bookId)

      fetch(`https://stark-fjord-53787-110ae3a2c7f6.herokuapp.com/delete_book/${bookId}`)
      .then(res => res.json())
      .then(remainingBooks => setBooks(remainingBooks));
  }

  const handleLogout = () => {
    // Close out the current User session in Firebase
    // TBD => Error Catching
    auth.signOut();
    
    // Change value of "user" state back to "null"
    // so that our conditional rendering below kicks in
    setUser(null);
  }

  console.log(user);

  return (
    <div className="App">
      { user ? <NavBar handleLogout={handleLogout} /> : null }
      <Routes>
        <Route exact path="/" element={
          user ? <Home handleLogout={handleLogout} /> : <Navigate to="/login" />
        } />
        <Route exact path="/add_book" element={
          <AddBookForm handleLogout={handleLogout} books={books} setBooks={setBooks}/>
        } />
        <Route exact path="/manage_books" element={
          <BookList handleLogout={handleLogout} books={books} handleDelete={handleDelete}/>
        } />
        <Route exact path="/edit_book/:book_id" element={
          <EditBookForm handleLogout={handleLogout} books={books} setBooks={setBooks}/>
        } />
        <Route exact path="/login" element={
          <LoginForm auth={auth} setUser={setUser} />
        } />
      </Routes>
    </div>
  );
}

export default App;
