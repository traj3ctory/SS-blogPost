import { GenericI } from "@/types";
import { Request, RequestMethod } from "@/utils";

export default class PostService {
  static async makeApiCall(
    url: string,
    method: RequestMethod = RequestMethod.GET,
    data?: GenericI
  ) {
    try {
      const response =
        method === RequestMethod.POST ||
        method === RequestMethod.PUT ||
        method === RequestMethod.PATCH
          ? await Request(url, method, data)
          : await Request(url);

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getPosts(url: string) {
    return this.makeApiCall(url);
  }

  static async getPost(url: string, id: string) {
    return this.makeApiCall(`${url}/${id}`);
  }

  static async createPost(url: string, data: GenericI) {
    return this.makeApiCall(url, RequestMethod.POST, data);
  }

  static async updatePost(url: string, data: GenericI) {
    return this.makeApiCall(url, RequestMethod.PUT, data);
  }

  static async deletePost(url: string) {
    return this.makeApiCall(url, RequestMethod.DELETE);
  }
}
