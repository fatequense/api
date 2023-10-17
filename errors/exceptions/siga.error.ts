export class SigaError extends Error {
  statusCode = 500;
}

export class AuthError extends SigaError {
  constructor() {
    super("Authentication failed. Please check your credentials and try again.");
  }
}

export class AccessDeniedError extends SigaError {
  statusCode = 401;

  constructor() {
    super("Access denied. Please check your authentication cookie and try again.");
  }
}

export class MissingTokenError extends SigaError {
  statusCode = 403;

  constructor() {
    super("Authorization token is missing. Please include a valid token in your request headers.");
  }
}

export class UnauthorizedError extends SigaError {
  statusCode = 403;

  constructor() {
    super("Invalid or expired authorization token. Please obtain a new token and try again.");
  }
}