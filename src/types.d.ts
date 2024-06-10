export interface User {
  email: string;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
  location: {
    country: string;
  };
}

export default interface ApiResponse {
  results: User[];
  info: {
    page: number;
    results: number;
  };
}

export enum SortField {
  NONE = "none",
  FIRST = "first",
  LAST = "last",
  COUNTRY = "country",
}
