export class CheckInLateValidateError extends Error {
  constructor() {
    super('Dont possible to validate check-in after 20 min of his creation.')
  }
}
