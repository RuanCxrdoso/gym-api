export class ResourcesNotFoundError extends Error {
  constructor() {
    super('Resources not found.')
  }
}
