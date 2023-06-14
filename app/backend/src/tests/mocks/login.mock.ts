const validEmail = 'username@email.com';
const validPassword = 'password123';
const hashedPassword = '$2a$10$C52Amv3qMJlqUHdFZCmF3eelLGdYch/1FgO5joYS4W5GN0KGQzSKS';

const bodyWithoutEmail = { password: validPassword };
const bodyWithoutPassword = { email: validEmail };

const bodyWithInvalidUser = { email: 'invalid_email', password: validPassword };
const bodyWithInvalidPassword = { email: validEmail, password: 'invalid_password' };

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
  bodyWithInvalidPassword,
  validBody,
  existingUser,
}