import { ArticlePlacement } from "./ArticlePlacement";
import { LinkPlacement } from "./LinkPlacement";
import { CategoryPlacement } from "./CategoryPlacement";
import { TagPlacement } from "./TagPlacement";
import { SearchPlacement } from "./SearchPlacement";
import {
  PlacementType,
  PlacementDescriptor,
  TourPlacementLink,
  TourPlacementArticle,
  TourPlacementCategory,
  TourPlacementTag,
  TourPlacementSearch
} from "../../../types.d";
import { nanoid } from "nanoid";
import { FormikErrors } from "formik";

export const PLACEMENTS: Record<PlacementType, PlacementDescriptor> = {
  link: {
    addButtonText: "Ссылка",
    component: LinkPlacement,
    create() {
      return {
        type: "link",
        id: nanoid()
      };
    },
    validate({ link }: TourPlacementLink): FormikErrors<TourPlacementLink> {
      const errors: FormikErrors<TourPlacementLink> = {};

      if (!link) {
        errors.link = "Ссылка должна быть указана";
      }

      if (link) {
        try {
          const url = new URL(link);
          if (url.hostname !== "nashural.ru") {
            errors.link = "Ссылка должна вести на сайт nashural.ru";
          }
        } catch (error) {
          errors.link = "Ссылка должна быть валидной";
        }
      }

      return errors;
    }
  },
  article: {
    addButtonText: "Статья",
    component: ArticlePlacement,
    create() {
      return {
        type: "article",
        id: nanoid()
      };
    },
    validate({
      postId
    }: TourPlacementArticle): FormikErrors<TourPlacementArticle> {
      const errors: FormikErrors<TourPlacementArticle> = {};

      if (!postId) {
        errors.postId = "Статья должна быть выбрана";
      }

      return errors;
    }
  },
  category: {
    addButtonText: "Категория",
    component: CategoryPlacement,
    create() {
      return {
        type: "category",
        id: nanoid(),
        includeChildren: false
      };
    },
    validate({
      categoryId
    }: TourPlacementCategory): FormikErrors<TourPlacementCategory> {
      const errors: FormikErrors<TourPlacementCategory> = {};

      if (!categoryId) {
        errors.categoryId = "Категория должна быть указана";
      }

      return errors;
    }
  },
  tag: {
    addButtonText: "Тег",
    component: TagPlacement,
    create() {
      return {
        type: "tag",
        id: nanoid()
      };
    },
    validate({ tagId }: TourPlacementTag): FormikErrors<TourPlacementTag> {
      const errors: FormikErrors<TourPlacementTag> = {};

      if (!tagId) {
        errors.tagId = "Тег должен быть указан";
      }

      return errors;
    }
  },
  search: {
    addButtonText: "Поисковый запрос",
    component: SearchPlacement,
    create() {
      return {
        type: "search",
        id: nanoid()
      };
    },
    validate({
      query
    }: TourPlacementSearch): FormikErrors<TourPlacementSearch> {
      const errors: FormikErrors<TourPlacementSearch> = {};

      if (!query) {
        errors.query = "Поисковый запрос должен быть указан";
      }

      return errors;
    }
  }
};
