import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import AddBook from './AddBook';
import Book from './Book';
import Loader from '../utils/Loader';
import { Row } from 'react-bootstrap';
import { NotificationSuccess, NotificationError } from '../utils/Notification';
import {
  getBooks as getBookList,
  buyBook,
  // voteBook,
  createBook,
  deleteBookById,
} from '../../utils/bookhub';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const getBooks = useCallback(async () => {
    try {
      setLoading(true);
      setBooks(await getBookList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addBook = async (data) => {
    try {
      setLoading(true);
      createBook(data).then((resp) => {
        getBooks();
      });
      toast(<NotificationSuccess text="Book added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a Book." />);
    } finally {
      setLoading(false);
    }
  };


  const buy = async (id, price) => {
    try {
      await buyBook({
        id,
        price,
      }).then((resp) => getBooks());
      toast(<NotificationSuccess text="book added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to purchase book." />);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      setDisable(true);
      toast.success("please wait your request is been processed")
      deleteBookById(id).then((resp) => {
        toast.success('Book deleted successfully');
        getBooks();
      });
    } catch (error) {
      setDisable(false);
      toast.error('network error');
    } finally {
      setDisable(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1
              className="fs-4 fw-bold mb-0"
              style={{ color: 'rgb(38, 69, 100)' }}>
              Available books
            </h1>
            <AddBook save={addBook} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {books.map((_book) => (
              <Book
                book={{
                  ..._book,
                }}
                // vote={voteBookItem}
                buy={buy}
                deleteBook={deleteBook}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Books;
