
import { test, expect } from '@playwright/test';

const baseURL = 'https://simple-books-api.click';

test.describe('Simple Books API - Order Management', () => {
  test('should create, update, and delete an order', async ({ request }) => {

    // 1. Register API client
    const clientResponse = await request.post(
      `${baseURL}/api-clients/`,
      {
        data: {
          clientName: 'Ejada Automation',
          clientEmail: `ejada-${Date.now()}@example.com`,
        },
      }
    );

    expect(clientResponse.status()).toBe(201);

    const clientData = await clientResponse.json();

    expect(clientData.accessToken).toBeTruthy();

    const token = clientData.accessToken;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // 2. POST  Create an order
    const createResponse = await request.post(
      `${baseURL}/orders`,
      {
        headers,
        data: {
          bookId: 1,
          customerName: 'Sanjay Kumar',
        },
      }
    );

    expect(createResponse.status()).toBe(201);

    const orderData = await createResponse.json();

    expect(orderData.orderId).toBeTruthy();

    const orderId = orderData.orderId;

    // 3. GET  Verify the created order
    const getResponse = await request.get(
      `${baseURL}/orders/${orderId}`,
      { headers }
    );

    expect(getResponse.status()).toBe(200);

    const order = await getResponse.json();

    expect(order.id).toBe(orderId);
    expect(order.customerName).toBe('Sanjay Kumar');

    // 4. PATCH  Update the order
    const updateResponse = await request.patch(
      `${baseURL}/orders/${orderId}`,
      {
        headers,
        data: {
          customerName: 'Sanjay Updated',
        },
      }
    );

    expect(updateResponse.status()).toBe(204);

    // 5. GET Verify the updated order
    const updatedResponse = await request.get(
      `${baseURL}/orders/${orderId}`,
      { headers }
    );

    expect(updatedResponse.status()).toBe(200);

    const updatedOrder = await updatedResponse.json();

    expect(updatedOrder.customerName).toBe('Sanjay Updated');

    // 6. DELETE - Delete the order
    const deleteResponse = await request.delete(
      `${baseURL}/orders/${orderId}`,
      { headers }
    );

    expect(deleteResponse.status()).toBe(204);

    // 7. GET - Verify the order was deleted
    const deletedResponse = await request.get(
      `${baseURL}/orders/${orderId}`,
      { headers }
    );

    expect(deletedResponse.status()).toBe(404);
  });
});
