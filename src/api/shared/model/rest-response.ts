export type RESTFailureResponse = {
  state: "failure"
}

export type RESTSuccessResponse<Schema> = {
  state: "success"
  content: Schema
}

export type RESTResponse<Schema> = RESTFailureResponse | RESTSuccessResponse<Schema>

export function isSuccess<S>(response: RESTResponse<S>): response is RESTSuccessResponse<S> {
  return response.state === "success"
}

export function isFailure<S>(response: RESTResponse<S>): response is RESTFailureResponse {
  return response.state === "failure"
}
