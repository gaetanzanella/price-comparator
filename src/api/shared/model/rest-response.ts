export type RESTFailureResponse = {
  state: "Failed"
}

export type RESTSuccessResponse<Schema> = {
  state: "Successed"
  content: Schema
}

export type RESTResponse<Schema> = RESTFailureResponse | RESTSuccessResponse<Schema>

export function isSuccess<S>(response: RESTResponse<S>): response is RESTSuccessResponse<S> {
  return response.state === "Successed"
}

export function isFailure<S>(response: RESTResponse<S>): response is RESTFailureResponse {
  return response.state === "Failed"
}
