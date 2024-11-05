export class CalculatorError extends Error {
  private errorCode: number

  constructor (errorCode: number, errMessage: string) {
    super(errMessage)
    this.errorCode = errorCode
  }
}