class ServerError extends Error {
  constructor(message: string, public statusCode: number) {}
}

export default ServerError;
