const validEmail = 'username@email.com';
const validPassword = 'password123';
const hashedPassword = '$2a$10$C52Amv3qMJlqUHdFZCmF3eelLGdYch/1FgO5joYS4W5GN0KGQzSKS';

const bodyWithoutEmail = { email: '', password: validPassword };
const bodyWithoutPassword = { email: validEmail, password: '' };

const invalidEmailFormatBody = { email: '@exemplo.com', password: validPassword };
const invalidPasswordFormatBody = { email: validEmail, password: '123' };

const bodyWithInvalidUser = { email: 'nouserfound@email.com', password: validPassword };
const bodyWithWrongPassword = { email: validEmail, password: 'invalid_password' };

const validBody = { email: validEmail, password: validPassword };

const existingUser = {
  id: 1,
  username: 'name',
  role: 'admin',
  email: validEmail,
  password: hashedPassword,
};

export default {
  bodyWithoutEmail,
  bodyWithoutPassword,
  bodyWithInvalidUser,
  bodyWithWrongPassword,
  validBody,
  existingUser,
  invalidEmailFormatBody,
  invalidPasswordFormatBody,
}