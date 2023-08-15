import { Request, RequestMethod } from "@/utils";
import { GenericI } from "@/types";

/**
 * @function makeApiCall
 * @param {string} url
 * @param {RequestMethod} method
 * @param {GenericI} data
 */
export const makeApiCall = async (
  url: string,
  method: RequestMethod = RequestMethod.GET,
  data?: GenericI
) => {
  const response = await Request(url, method, data);
  return response.data;
};
