import { Link } from 'react-router-dom';
import BookItem from './BookItem';

const BookList = ({books, handleDelete, handleLogout}) => {
    
    const BookItems = books.map((book, index) => {
       return <BookItem book={book} key={index} handleDelete={handleDelete} />
    }); 

    return (
        <> 
            <br />
            <br />
            <br />
            <br />
            <button type="button" class="btn btn-primary" onClick={handleLogout}>Log Out</button>
            <br />
            <br />
            <h1>BookList Component</h1>
            <ul>{BookItems}</ul>
        </>
    );
}

export default BookList;