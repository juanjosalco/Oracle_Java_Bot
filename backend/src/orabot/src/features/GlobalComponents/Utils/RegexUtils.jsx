
export const emailRegex = /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const taskTitleRegex = /^[A-Za-z0-9._%-]{3,}$/;

// const validateEmail = (_email) => emailRegex.test(_email);
// const validatePassword = (_password) => passwordRegex.test(_password);
// const validateTaskTitle = (_taskTitle) => taskTitleRegex.test(_taskTitle);

export const sanitizeInput = (input) =>
  input.replace(
    /[<>&]/g,
    (match) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
      }[match])
  );
