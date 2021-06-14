import {
  DadataSuggestion,
  FindCategoriesByQueryResult,
  FindPostsByQueryResult,
  FindTagsByQueryResult,
} from "./types";
import { Guide, LoginResult, RegisterResult, Tour } from "./types";
import { GuideForm, InlineGuideForm, LoginForm, RegisterForm } from "../types";
import {
  getAmazonEndpoint,
  getDadataSuggestionsEndpoint,
  getToursAPIEndpoint
} from "./endpoints";

import { TokenStorage } from "../classes/TokenStorage";
import { nanoid } from "nanoid";

const mockHttpRequest = <T>(response: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 + Math.round(Math.random() * 2000), response);
  });
};

export class ApiClient {
  private accessTokenStorage: TokenStorage;
  private refreshTokenStorage: TokenStorage;

  constructor(
    accessTokenStorage: TokenStorage,
    refreshTokenStorage: TokenStorage
  ) {
    this.accessTokenStorage = accessTokenStorage;
    this.refreshTokenStorage = refreshTokenStorage;
  }

  async login(form: LoginForm): Promise<LoginResult> {
    const resp = await fetch(`${getToursAPIEndpoint()}/auth/login`, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(form)
    });
    return resp.json();
  }

  async register(form: RegisterForm): Promise<RegisterResult> {
    const resp = await fetch(`${getToursAPIEndpoint()}/auth/register`, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(form)
    });
    return resp.json();
  }

  async getGuides(): Promise<Guide[]> {
    const token = await this.getAccessToken();
    const resp = await fetch(`${getToursAPIEndpoint()}/guides`, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return resp.json();
  }

  async createGuide(guide: GuideForm | InlineGuideForm): Promise<Guide> {
    const token = await this.getAccessToken();
    const resp = await fetch(`${getToursAPIEndpoint()}/guides`, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(guide)
    });
    return resp.json();
  }

  async getGuideById(guideId: string): Promise<Guide> {
    const token = await this.getAccessToken();
    const resp = await fetch(`${getToursAPIEndpoint()}/guides/${guideId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return resp.json();
  }

  async updateGuideById(guideId: string, guide: Guide): Promise<Guide> {
    const token = await this.getAccessToken();
    const resp = await fetch(`${getToursAPIEndpoint()}/guides/${guideId}`, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(guide)
    });
    return resp.json();
  }

  createGuideInline({ name }: InlineGuideForm): Promise<Guide> {
    return mockHttpRequest<Guide>({
      id: nanoid(),
      name,
      description: ""
    });
  }

  async getTours(): Promise<Tour[]> {
    const token = await this.getAccessToken();
    const resp = await fetch(`${getToursAPIEndpoint()}/tours`, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return resp.json();
  }

  async createTour(tour: Tour): Promise<Tour> {
    const token = await this.getAccessToken();
    const resp = await fetch(`${getToursAPIEndpoint()}/tours`, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(tour)
    });
    return resp.json();
  }

  async getTourById(tourId: string): Promise<Tour> {
    const token = await this.getAccessToken();
    const resp = await fetch(`${getToursAPIEndpoint()}/tours/${tourId}`, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return resp.json();
  }

  async updateTourById(tourId: string, tour: Tour): Promise<Tour> {
    const token = await this.getAccessToken();
    const resp = await fetch(`${getToursAPIEndpoint()}/tours/${tourId}`, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(tour)
    });
    return resp.json();
  }

  async suggestAddress(query: string): Promise<DadataSuggestion[]> {
    const resp = await fetch(
      `${getDadataSuggestionsEndpoint()}/suggestions/api/4_1/rs/suggest/address`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token b7e9201cc5c0dd98fca112bbb1ed4c84a7ece97e"
        },
        body: JSON.stringify({ query })
      }
    );
    const {
      suggestions
    }: { suggestions: DadataSuggestion[] } = await resp.json();
    return suggestions;
  }

  async findPostsByQuery(query: string): Promise<FindPostsByQueryResult[]> {
    const resp = await fetch(`${getAmazonEndpoint()}/find-posts-by-query`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ query })
    });
    return await resp.json();
  }

  async findCategoriesByQuery(
    query: string
  ): Promise<FindCategoriesByQueryResult[]> {
    const resp = await fetch(
      `${getAmazonEndpoint()}/find-categories-by-query`,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ query })
      }
    );
    return await resp.json();
  }

  async findTagsByQuery(query: string): Promise<FindTagsByQueryResult[]> {
    const resp = await fetch(`${getAmazonEndpoint()}/find-tags-by-query`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ query })
    });
    return await resp.json();
  }

  private async getAccessToken(): Promise<string | undefined> {
    let accessToken = this.accessTokenStorage.getToken();
    if (accessToken) {
      return accessToken;
    } else {
      accessToken = await this.refreshAccessToken();
      if (accessToken) {
        return accessToken;
      } else {
        // TODO: Implement
      }
    }
  }

  private async refreshAccessToken(): Promise<string | undefined> {
    const refreshToken = this.refreshTokenStorage.getToken();
    if (refreshToken) {
      const resp = await fetch(`${getToursAPIEndpoint()}/auth/refresh_token`, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ refreshToken })
      });
      const { accessToken } = await resp.json();
      this.accessTokenStorage.setToken(accessToken);
    } else {
      return undefined;
    }
  }
}
