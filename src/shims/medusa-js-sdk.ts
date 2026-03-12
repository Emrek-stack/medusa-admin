export class FetchError extends Error {
  statusText: string
  status: number

  constructor(message: string, statusText = "Error", status = 500) {
    super(message)
    this.name = "FetchError"
    this.statusText = statusText
    this.status = status
  }
}

export type FetchInput = string | URL | Request

export type FetchArgs = Omit<RequestInit, "body"> & {
  query?: Record<string, unknown>
  body?: unknown
}
