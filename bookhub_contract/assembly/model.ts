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
  up_votes: PersistentSet<string>;
  down_votes: PersistentSet<string>;
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
    book.up_votes = payload.up_votes;
    book.down_votes = payload.down_votes;
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
  // public vote(voteType: u8): bool {
  //   const senderAccount = context.sender;
  //   assert(!this.down_votes.has(senderAccount), 'already voted');
  //   assert(!this.up_votes.has(senderAccount), 'already voted');
  //   assert(voteType == 0 || voteType == 1, 'not a valid vote');
  //   switch (voteType) {
  //     case 0:
  //       this.down_votes.add(senderAccount);
  //       return true;

  //     case 1:
  //       this.up_votes.add(senderAccount);
  //       return true;
  //   }
  //   return false;
  // }
}

// A key value dataStructure used to store purchased book
export const listedBooks = new PersistentUnorderedMap<string, Book>(
  'LISTED_BOOKS'
);
