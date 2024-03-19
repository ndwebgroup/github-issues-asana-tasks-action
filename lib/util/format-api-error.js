import { setFailed } from "@actions/core";

/**
 *
 * @param {*} errorResponse error.response object returned from the Asana API
 */
export function formatApiError(errorResponse) {
  // const {message, help} = errorResponse.body;
  const { status, method, path } = errorResponse.error;
  let message, help;
  if (errorResponse.body.errors.length == 1) {
    message = errorResponse.body.errors[0].message;
    help = errorResponse.body.errors[0].help;
  } else {
    errorResponse.body.errors.forEach((err) => {
      help += err.help + "\n";
      message += err.message + "\n";
    });
  }

  // const {message, help} = errorResponse.body.errors.reduce((prev, curr) => {
  //   prev.message.push(curr.message);
  //   prev.help.push(curr.help);
  //   return prev;
  // }, {message: [], help: []})

  console.log({ status, method, path, message, help });
  return `
Error: ${status} ${message}

${method} ${path}

${help}`.trim();
}
