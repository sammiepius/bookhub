import {
  PersistentUnorderedMap,
  u128,
  context,
  PersistentSet,
  logging,
} from 'near-sdk-as';

@nearBindgen
export class Book {
  //Define the Book fields and data types
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  price: u128;
  owner: string;
  sold: u32;
  //fromPayload method takes in a payload and returns a new `book` object
  public static fromPayload(payload: Book): Book {
    const book = new Book();
    book.id = payload.id;
    book.name = payload.name;
    book.description = payload.description;
    book.image = payload.image;
    book.id = payload.id;
    book.location = payload.location;
    book.price = payload.price;
    book.owner = context.sender;
    return book;
  }

  
  //incrementSoldAmount method increases the SOLD of the Book
  public incrementSoldAmount(): void {
    this.sold = this.sold + 1;
  }


  // method to delete a book
  public static deleteBook(id: string): void {
    logging.log(`deleting book`);
    const beat = listedBooks.get(id);

    if (beat == null) throw new Error('book not found');
    else {
      listedBooks.delete(beat.id);
    }
  }
}

// A key value dataStructure used to store purchased book
export const listedBooks = new PersistentUnorderedMap<string, Book>(
  'LISTED_BOOKS'
);
