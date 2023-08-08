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
  // assert that book with given id exists
  assert(listedBooks.contains(id), "This book doesn't exist");
  return listedBooks.get(id);
}

// function that gets all the listed book
export function getBooks(): Book[] {
  return listedBooks.values();
}

// function that delete a book with a particular id
export function deleteBookById(id: string): void {
  Book.deleteBook(id);
}

export function getBookVotes(bookId: string) : Array<u32> | null {    
  const book = listedBooks.get(bookId);
  //check if book is null, in case book is null we can't access its properties
  if(book == null){
     return null;
  } else {
      let votes_length_array = new Array<u32>(2);
      votes_length_array[0] = book.down_votes.size;
      votes_length_array[1] = book.up_votes.size;
      return votes_length_array;
  } 
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
