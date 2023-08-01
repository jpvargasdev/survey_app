import { ApiResponse, ApisauceInstance, create } from "apisauce";
import { SurveyResponse } from "./api.types";

const CONFIG = {
  url: 'http://localhost:8000',
  timeout: 10000,
};

export class Api {
  apisauce: ApisauceInstance;
  config = CONFIG;

  constructor() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }

  async getSurveyQuestions(): Promise<{kind: string, data?: SurveyResponse}> {
    const response: ApiResponse<SurveyResponse> = await this.apisauce.get("/survey");

    if (!response.ok) {
      console.error(response);
      throw new Error('Error getting survey');
    }

    try {
      const data = response.data;
      if (data) {
        return { kind: "ok", data};
      }
      return { kind: "error"};
    } catch (e) {
      console.error(e);
      return { kind: "error" };
    }
  }
}

export const api = new Api()

