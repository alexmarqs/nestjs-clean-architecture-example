export class Content {
  private readonly content: string;

  constructor(value: string) {
    const isValid = this.validateContentLength(value);

    if (!isValid) {
      throw new Error('Content must be between 1 and 255 characters');
    }

    this.content = value;
  }

  private validateContentLength(value: string) {
    return value.length > 0 && value.length <= 255;
  }

  public get value(): string {
    return this.content;
  }
}
