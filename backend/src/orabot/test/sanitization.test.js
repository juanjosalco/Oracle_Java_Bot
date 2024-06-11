const {
  emailRegex,
  passwordRegex,
  nameRegex,
  taskDescriptionRegex,
  priorityRegex,
  dueDateRegex,
  statusRegex,
  commentsRegex,
  creationDateRegex,
  userRoleRegex,
  sanitizeInput,
} = require('../src/features/GlobalComponents/Utils/RegexUtils');

// Validations

test('Validates email addresses correctly', () => {
  expect(emailRegex.test('test@example.com')).toBe(true);
  expect(emailRegex.test('invalid-email')).toBe(false);
});

test('Validates passwords correctly', () => {
  expect(passwordRegex.test('Password1!')).toBe(true);
  expect(passwordRegex.test('pass')).toBe(false);
});

test('Validates task name correctly', () => {
  expect(nameRegex.test('Task1')).toBe(true);
  expect(nameRegex.test('')).toBe(false);
});

test('Validates task description correctly', () => {
  expect(taskDescriptionRegex.test('This is a task description')).toBe(true);
  expect(taskDescriptionRegex.test('')).toBe(false);
});

test('Validates priority correctly', () => {
  expect(priorityRegex.test('1')).toBe(true);
  expect(priorityRegex.test('4')).toBe(false);
});

test('Validates due date correctly', () => {
  expect(dueDateRegex.test('2023-12-31 23:59:59.999')).toBe(true);
  expect(dueDateRegex.test('2023-12-31')).toBe(false);
});

test('Validates status correctly', () => {
  expect(statusRegex.test('ToDo')).toBe(true);
  expect(statusRegex.test('InvalidStatus')).toBe(false);
});

test('Validates comments correctly', () => {
  expect(commentsRegex.test('This is a comment')).toBe(true);
  expect(commentsRegex.test('')).toBe(false);
});

test('Validates creation date correctly', () => {
  expect(creationDateRegex.test('2023-12-31 23:59:59.999')).toBe(true);
  expect(creationDateRegex.test('2023-12-31')).toBe(false);
});

test('Validates user role correctly', () => {
  expect(userRoleRegex.test('Developer')).toBe(true);
  expect(userRoleRegex.test('InvalidRole')).toBe(false);
});

// Sanitization | HTML and SQL 

test('Sanitizes input correctly', () => {
  expect(sanitizeInput('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
});

test('Rejects script injection in task name', () => {
  const scriptInjection = '<script>alert("xss")</script>';
  expect(nameRegex.test(scriptInjection)).toBe(false);
});

test('Rejects SQL injection in task description', () => {
  const sqlInjection = "Robert'); DROP TABLE Students;--";
  expect(taskDescriptionRegex.test(sqlInjection)).toBe(false);
});

test('Sanitizes script injection in comments', () => {
  const scriptInjection = '<script>alert("xss")</script>';
  const sanitized = sanitizeInput(scriptInjection);
  expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
});

test('Sanitizes SQL injection in comments', () => {
  const sqlInjection = "Robert'); DROP TABLE Students;--";
  const sanitized = sanitizeInput(sqlInjection);
  expect(sanitized).toBe('Robert&apos;); DROP TABLE Students;');
});

test('Rejects strange characters in task name', () => {
  const strangeCharacters = 'Task#^&*{}[]';
  expect(nameRegex.test(strangeCharacters)).toBe(false);
});

test('Sanitizes strange characters in comments', () => {
  const strangeCharacters = 'Comment with ^&*{}[]';
  const sanitized = sanitizeInput(strangeCharacters);
  expect(sanitized).toBe('Comment with ^&amp;*{}[]');
});

test('Sanitizes SQL injection patterns in task name', () => {
  const sqlInjection = "Robert'); DROP TABLE Students;--";
  const sanitized = sanitizeInput(sqlInjection);
  expect(sanitized).toBe("Robert&apos;); DROP TABLE Students;"); // Adjust expectation based on your sanitization
});

test('Sanitizes combined HTML and SQL injection patterns in input', () => {
  const injection = "<script>alert('xss');</script> Robert'); DROP TABLE Students;--";
  const sanitized = sanitizeInput(injection);
  expect(sanitized).toBe("&lt;script&gt;alert(&apos;xss&apos;);&lt;/script&gt; Robert&apos;); DROP TABLE Students;");
});
