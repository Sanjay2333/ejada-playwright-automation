
import { test, expect } from '@playwright/test';

const baseURL = 'https://simple-books-api.click';

test.describe('Simple Books API - GET requests', () => {
  test('should check API status', async ({ request }) => {
    const response = await request.get(`${baseURL}/status`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.status).toBe('OK');
  });

  test('should retrieve all books', async ({ request }) => {
    const response = await request.get(`${baseURL}/books`);

    expect(response.status()).toBe(200);

    const books = await response.json();

    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0);

    for (const book of books) {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('name');
      expect(book).toHaveProperty('type');
    }
  });

  test('should retrieve fiction books', async ({ request }) => {
    const response = await request.get(`${baseURL}/books`, {
      params: {
        type: 'fiction',
      },
    });

    expect(response.status()).toBe(200);

    const books = await response.json();

    expect(Array.isArray(books)).toBe(true);

    for (const book of books) {
      expect(book.type).toBe('fiction');
    }
  });

  test('should retrieve a book by ID', async ({ request }) => {
    const response = await request.get(`${baseURL}/books/1`);

    expect(response.status()).toBe(200);

    const book = await response.json();

    expect(book.id).toBe(1);
    expect(book).toHaveProperty('name');
  });
});