export class ApiResponse<T> {
  status: 'success' | 'error';
  data: T | null;
  error?: string | null;
  statusCode?: 200 | 400 | 401 | 403 | 404 | 502;

  constructor(
    status: 'success' | 'error',
    data: T | null,
    error?: string | null,
    statusCode?: 200 | 400 | 401 | 403 | 404 | 502,
  ) {
    this.status = status;
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
  }
}
