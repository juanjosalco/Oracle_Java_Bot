// Regex patterns for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/;
const nameRegex = /^[A-Za-z0-9\s._%\-!@#\$&\*\(\)]{1,64}$/;
const taskDescriptionRegex = /^[A-Za-z0-9\s._%\-!@#\$&\*\(\)]{1,300}$/;
const priorityRegex = /^[123]$/;
const dueDateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/;
const statusRegex = /^(ToDo|Ongoing|Done|Cancelled)$/;
const commentsRegex = /^[A-Za-z0-9\s._%\-!@#\$&\*\(\)]{1,120}$/;
const creationDateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/;
const userRoleRegex = /^(Developer|Manager)$/;

// Sanitization for HTML injection patterns
const sanitizeHTML = (input) =>
  input.replace(/[<>&'"]/g, (match) =>
    ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;'
    }[match])
  );

// Sanitization for SQL injection patterns
const sanitizeSQL = (input) => {
  const sqlInjectionPatterns = [
    /--/g,       // SQL comment
    /\/\*/g,     // SQL multi-line comment start
    /\*\//g,     // SQL multi-line comment end
    /\\'/g,      // SQL escape single quote
    /\\\x1a/g,   // ASCII 26 (EOF character)
    /OR\s+\d+\s*=\s*\d+/gi,  // OR 1=1, OR 1=2, etc.
    /UNION\s+SELECT/gi,  // UNION SELECT
  ];

  let sanitized = input;
  sqlInjectionPatterns.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, '');
  });

  return sanitized;
};

const sanitizeInput = (input) => {
  let sanitized = sanitizeHTML(input);
  sanitized = sanitizeSQL(sanitized);
  return sanitized;
};

module.exports = {
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
  sanitizeInput
};




