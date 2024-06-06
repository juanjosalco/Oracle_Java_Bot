// Email Regex to ensure:
// There are no spaces (^\s).
// The local part and domain can have any character except spaces and @.
// There is at least one . in the domain part.
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password Regex to ensure:
// Ensure at least one letter.
// Ensure at least one digit.
// Ensure at least one special character from the set @$!%*#?&.
// Ensure the password length is at least 8 characters.
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Task Title Regex to ensure:
// Allow letters, numbers, dots, underscores, percent signs, and hyphens.
// Ensure a minimum length of 3 characters.
export const taskTitleRegex = /^[A-Za-z0-9._%-]{3,}$/;
export const taskNameRegex = /^[A-Za-z0-9\s._%-]{3,}$/;
export const taskDescriptionRegex = /^[A-Za-z0-9\s._%\-!@#\$&\*\(\)]+$/;
export const commentsRegex = /^[A-Za-z0-9\s._%\-!@#\$&\*\(\)]+$/;
export const priorityRegex = /^[123]$/;
export const dueDateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/;
export const statusRegex = /^(ToDo|Ongoing|Done|Cancelled)$/;

// Most critical characters for preventing HTML injection: <, >, &, ', and ".
export const sanitizeInput = (input) =>
  input.replace(
    /[<>&'"]/g,
    (match) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      }[match])
    );

// Uncomment these if you need validation functions
export const validateEmail = (_email) => emailRegex.test(_email);
export const validatePassword = (_password) => passwordRegex.test(_password);
export const validateTaskTitle = (_taskTitle) => taskTitleRegex.test(_taskTitle);
export const validateTaskName = (_taskName) => taskNameRegex.test(_taskName);
export const validateTaskDescription = (_taskDescription) => taskDescriptionRegex.test(_taskDescription);
export const validateComments = (_comments) => commentsRegex.test(_comments);
export const validatePriority = (_priority) => priorityRegex.test(_priority);
export const validateDueDate = (_dueDate) => dueDateRegex.test(_dueDate);
export const validateStatus = (_status) => statusRegex.test(_status);