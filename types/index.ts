export interface Titles {
  isbn: Array<ISBNCode> | ISBNCode
}

export interface ISBNCode {
  $ : string;
}

export interface Work {
  authorweb: string;
  titles: Titles;
  onsaledate: Date;
  titleAuth: string;
  titleSubtitleAuth: string;
  titleshort: string;
  titleweb: string;
  workid: string;
}