import { test, expect } from '@playwright/test';

const baseURL = 'https://simple-books-api.click';

test.describe('Simple Books API - Authentication', () => {

  test('should reject order creation without an access token', async ({
    request,
  }) => {
    const response = await request.post(`${baseURL}/orders`, {
      data: {
        bookId: 1,
        customerName: 'Test Customer',
      },
    });

    expect([401, 403]).toContain(response.status());
  });

  test('should reject order creation with an invalid token', async ({
    request,
  }) => {
    const response = await request.post(`${baseURL}/orders`, {
      headers: {
        Authorization: 'Bearer invalid-token',
      },
      data: {
        bookId: 1,
        customerName: 'Test Customer',
      },
    });

    expect([401, 403]).toContain(response.status());
  });

  test('should reject order retrieval without an access token', async ({
    request,
  }) => {
    const response = await request.get(`${baseURL}/orders`);

    expect([401, 403]).toContain(response.status());
  });

  test('should reject order deletion without an access token', async ({
    request,
  }) => {
    const response = await request.delete(
      `${baseURL}/orders/nonexistent-order-id`
    );

    expect([401, 403]).toContain(response.status());
  });
});
