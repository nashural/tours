import { ComponentType } from "react";
import { FormikErrors } from "formik";

export interface LoginForm {
  email: string;
  password: string;
}

export interface TourForm {
  id: string;
  name: string;
  date: string;
  price: string;
  count: string;
  description: string;
  details: string;
  shedule: string;
  guide: string;
  phone: string;
  pickpoint: TourPickpoint;
  placement: TourPlacement;
}

export interface TourPickpoint {
  address: string;
  comment: string;
  coordinates: Coordinates;
  time: string;
}

export type Coordinates = [number, number];

export interface TourPlacement {
  id: string;
  placements: TourPlacementItem[];
}

export type TourPlacementItem =
  | TourPlacementLink
  | TourPlacementArticle
  | TourPlacementCategory
  | TourPlacementTag
  | TourPlacementSearch;

export interface TourPlacementLink extends TourPlacementItemBase {
  type: PlacementType.link;
  errors: FormikErrors<TourPlacementLink>;
  link: string;
}

export interface TourPlacementArticle extends TourPlacementItemBase {
  type: PlacementType.article;
  errors: FormikErrors<TourPlacementArticle>;
  postId: number;
  title: string;
}

export interface TourPlacementCategory extends TourPlacementItemBase {
  type: PlacementType.category;
  errors: FormikErrors<TourPlacementCategory>;
  categoryId: number;
  name: string;
  includeChildren: boolean;
}

export interface TourPlacementTag extends TourPlacementItemBase {
  type: PlacementType.tag;
  errors: FormikErrors<TourPlacementTag>;
  tagId: number;
  name: string;
}

export interface TourPlacementSearch extends TourPlacementItemBase {
  type: PlacementType.search;
  errors: FormikErrors<TourPlacementSearch>;
  query: string;
}

export interface TourPlacementItemBase {
  id: string;
  index: number;
  errors: FormikErrors<TourPlacementLink>;
  disabled: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  onRemove: () => void;
  setFieldValue: (name: string, value: any) => void;
}

export enum PlacementType {
  link = "link",
  article = "article",
  category = "category",
  tag = "tag",
  search = "search"
}

export interface PlacementDescriptor {
  component: ComponentType<any>;
  create(): any;
  addButtonText: string;
  validate(placement: TourPlacementItem): FormikErrors<TourPlacementItem>;
}

export interface InlineGuideForm {
  name: string;
}

export interface GuideForm {
  id: string;
  name: string;
  description: string;
}
