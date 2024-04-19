import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useStateInitializer from '../custom_hooks/useStateInitializer';

const EditBookForm = ({books, setBooks, handleLogout}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    
    const params = useParams();

    const { book_id } = params;

    const [book, setBook] = useStateInitializer([]);
    const [isbn, setIsbn] = useStateInitializer('');
    const [title, setTitle] = useStateInitializer('');
    const [author, setAuthor] = useStateInitializer('');
    const [length, setLength] = useStateInitializer('');
    const [isHardCover, setIsHardCover] = useStateInitializer('');

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/edit_book/${book_id}`)
        .then(res => res.json())
        .then(book => {
            setBook(book);
            setIsbn(book.isbn);
            setTitle(book.title);
            setAuthor(book.author);
            setLength(book.length);
            setIsHardCover(book.hardcover);
        })
    }, [])

    const navigate = useNavigate();

    const onSubmit = () => {
        // Prevent default page refresh to preserve state
        // e.preventDefault();

        // Create a new JS object with its values
        // derived from the values of states at the
        // moment of form submission
        const updated_book = {
            isbn: parseInt(isbn),
            title: title,
            author: author,
            length: parseInt(length),
            hardcover: isHardCover.toString()
        }

        fetch(`http://127.0.0.1:5000/edit_book/${book.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            // Python <= JSON => JavaScript
            body: JSON.stringify(updated_book)
        })
        .then(res => res.json())
        .then(updatedBooksList => {
            
            // Update "books" state with most up-to-date list
            // of books...
            setBooks(updatedBooksList);
            
            // ... before navigating the User back to "/manage_books"
            navigate('/manage_books');
        });
    }

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            
            <h1>EditBook Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>ISBN</p>
                <input value={isbn} type="number" {...register("isbn")}  onChange={(e) => setIsbn(e.target.value)} />
                <p>Title</p>
                <input value={title} type="text" {...register("title")} onChange={(e) => setTitle(e.target.value)}/>
                <p>Author</p>
                <input value={author} type="text"  {...register("author")} onChange={(e) => setAuthor(e.target.value)}/>
                <p>Length</p>
                <input value={length} type="number" {...register("length")}  onChange={(e) => setLength(e.target.value)}/>
                <p>Hard Cover</p>
                <input value={isHardCover} checked={isHardCover} {...register("hardcover")} type="checkbox" onChange={() => setIsHardCover(!isHardCover)}/>        
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default EditBookForm;