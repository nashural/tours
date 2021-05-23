export type LoginResult = LoginSuccess | LoginFail;

export interface LoginSuccess {
  accessToken: string;
  refreshToken: string;
}

export interface LoginFail {
  error: string;
}

export interface Guide {
  id: string;
  name: string;
  description: string;
}

export interface Tour {
  id: string;
  name: string;
  date: string;
  price: string;
  count: string;
  description: string;
  details: string;
  shedule: string;
  guide: string;
  pickpoint: Pickpoint;
  placement: Placement;
}

export interface Pickpoint {
  address: string;
  comment: string;
  coordinates: Coordinates;
  time: string;
}

export type Coordinates = [number, number];

export interface Placement {
  id: string;
  placements: PlacementItem[];
}

export interface PlacementItem {
  id: string;
  type: string;
  link?: string;
  postId?: number;
  title?: string;
  categoryId?: number;
  tagId?: number;
  name?: string;
  query?: string;
}

export interface DadataSuggestion {
  value: string;
}

export interface FindPostsByQueryResult {
  title: string;
  postId: number;
}

export interface FindCategoriesByQueryResult {
  name: string;
  categoryId: number;
}

export interface FindTagsByQueryResult {
  name: string;
  tagId: number;
}
