/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/book.dto';
import { Book } from 'src/Mongo/Interfaces/book.interface';
import { BookRepository } from 'src/Mongo/Repository/book.repository';

@Injectable()
export class BooksService {

  constructor(
    private readonly bookRepository: BookRepository
  ) { }

  async getAllBooks(): Promise<Book[]> {
    const allBooks = await this.bookRepository.getAllBooks();

    if (!allBooks.length)
      throw new BadRequestException('There are no books registered yet');

    return allBooks;

  }

  async getBookById(bookID: string): Promise<Book> {
    try {
      return await this.bookRepository.getBookById(bookID);
    } catch (error) {
      throw new BadRequestException('There are no results!')
    }
  }

  async getBookByName(bookName: string): Promise<Book[]>{

    const foundBooks = await this.bookRepository.getBookByName(bookName);

    if (!foundBooks.length)
      throw new BadRequestException('No results for this name!')

    return foundBooks;
  }

  async getBookByAuthorName(authorName: string): Promise<Book[]> {

    const splitedAuthorName = authorName.split(' ')

    const foundBooks = await this.bookRepository.getBookByAuthorName(splitedAuthorName);

    if (!foundBooks.length)
      throw new BadRequestException('No results for this author!')

    return foundBooks;
  }

  async saveBook(newBook: BookDTO): Promise<Book> {
    return await this.bookRepository.saveBook(newBook)
  }

  async deleteBookById(bookID: string): Promise<Book> {

    try {
      const existbook = await this.bookRepository.deleteBookById(bookID);

      if (!existbook)
        throw new BadRequestException('There are no results!')

      return existbook;

    } catch (error) {
      throw new BadRequestException('This book does not exists!')
    }
  }

  async updateBook(bookID: string, newBook: BookDTO): Promise<Book> {

    const existbook = await this.bookRepository.getBookById(bookID);

    if (!existbook)
      throw new BadRequestException('There are no results with this id!')

    const updatedBook = await this.bookRepository.updateBook(bookID, newBook);

    if (updatedBook)
      return this.bookRepository.getBookById(bookID);
    else
      throw new BadRequestException('Error in update!')
  }
}
