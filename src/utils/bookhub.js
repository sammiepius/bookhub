import { v4 as uuid4 } from 'uuid';
import { parseNearAmount } from 'near-api-js/lib/utils/format';

const GAS = 100000000000000; //gas fee

export function createBook(book) {
  book.id = uuid4();
  book.price = parseNearAmount(book.price + '');
  return window.contract.setBook({ book });
}

export function getBooks() {
  return window.contract.getBooks();
}

export async function buyBook({ id, price }) {
  await window.contract.buyBook({ bookId: id }, GAS, price);
}

// export async function voteBook({id, voteType}){
//   const isSuccess = await window.contract.voteBook({bookId: id, voteType: voteType}, GAS);
//   if (isSuccess){
//      return Promise.resolve(isSuccess);
//   } else{
//     return Promise.reject();
//   }
// }

export function deleteBookById(id) {
  return window.contract.deleteBookById({id});
}