import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useStateInitializer from '../custom_hooks/useStateInitializer';

const AddBookForm = ({books, booksSetter, handleLogout}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [isbn, isbnSetter] = useStateInitializer('')
    const [title, titleSetter] = useStateInitializer('')
    const [author, authorSetter] = useStateInitializer('')
    const [length, lengthSetter] = useStateInitializer('')
    const [isHardCover, isHardCoverSetter] = useStateInitializer(false)

    const navigate = useNavigate();

    const onSubmit = () => {
        // Prevent default page refresh to preserve state
        // e.preventDefault();

        // Create a new JS object with its values
        // derived from the values of states at the
        // moment of form submission
        const new_book = {
            id: books.length + 1,
            isbn: parseInt(isbn),
            title: title,
            author: author,
            length: parseInt(length),
            hardcover: isHardCover.toString()
        }

        fetch('http://127.0.0.1:5000/add_book', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            // Python <= JSON => JavaScript
            body: JSON.stringify(new_book)
        })
        .then(res => res.json())
        .then(data => {
            
            // Once we get a successful response from the
            // back end, we update the "books" state to reflect
            // this newest book...
            booksSetter([...books, new_book]);
            
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
            <h1>AddBook Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>ISBN</p>
                <input value={isbn} type="number" {...register("isbn")}  onChange={(e) => isbnSetter(e.target.value)} />
                <p>Title</p>
                <input value={title} type="text" {...register("title")} onChange={(e) => titleSetter(e.target.value)}/>
                <p>Author</p>
                <input value={author} type="text"  {...register("author")} onChange={(e) => authorSetter(e.target.value)}/>
                <p>Length</p>
                <input value={length} type="number" {...register("length")}  onChange={(e) => lengthSetter(e.target.value)}/>
                <p>Hard Cover</p>
                <input value={isHardCover} checked={isHardCover} {...register("hardcover")} type="checkbox" onChange={() => isHardCoverSetter(!isHardCover)}/>        
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
            <br />
            <button type="button" class="btn btn-primary" onClick={handleLogout}>Log Out</button>
        </>
    )
}

export default AddBookForm;