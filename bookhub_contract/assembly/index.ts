import { Book, listedBooks } from './model';
import { ContractPromiseBatch, context } from 'near-sdk-as';

export function setBook(book: Book): void {
  let storedBook = listedBooks.get(book.id);

  if (storedBook !== null) {
    // checks if a book with thesame id exist already
    throw new Error(`a book with ${book.id} already exists`);
  }
  listedBooks.set(book.id, Book.fromPayload(book)); // create a new book using `fromPayLoad` method
}

export function getBook(id: string): Book | null {
  // assert that blog with given id exists
  assert(listedBooks.contains(id), "This book doesn't exist");
  return listedBooks.get(id);
}

// function that gets all the listed book
export function getBooks(): Book[] {
  return listedBooks.values();
}

// A function use to buy a particular book using the book id
export function buyBook(bookId: string): void {
  const book = getBook(bookId); // retrieve book
  if (book == null) {
    throw new Error('book is not available at the moment '); // check if book is available
  }
  assert(book.price.toString() == context.attachedDeposit.toString());

  ContractPromiseBatch.create(book.owner).transfer(context.attachedDeposit);
  book.incrementSoldAmount(); //increment soldAmount
  listedBooks.set(book.id, book); //update books
}
