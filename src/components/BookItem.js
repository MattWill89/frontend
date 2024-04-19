import { Link } from 'react-router-dom';

const BookItem = ({book, handleDelete, handleLogout}) => {
    return (
        <li>
            <p>ID: {book.id}</p>
            <p>Title: {book.title}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Author: {book.author}</p>
            <p>Length: {book.length} pages</p>
            <p>Hardcover? {book.hardcover ? 'True' : 'False'}</p>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
            <button><Link to={`/edit_book/${book.id}`}>Edit</Link></button>
        </li>
    );
}

export default BookItem;