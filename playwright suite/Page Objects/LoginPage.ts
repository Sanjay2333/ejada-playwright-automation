
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  get username() {
    return this.page.getByPlaceholder('Username');
  }

  get password() {
    return this.page.getByPlaceholder('Password');
  }

  get loginButton()  {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
