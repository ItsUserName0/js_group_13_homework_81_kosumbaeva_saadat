export class Link {
  constructor(public _id: string, public originalUrl: string, public shortUrl: string) {
  }
}

export interface LinkData {
  originalUrl: string,
}
