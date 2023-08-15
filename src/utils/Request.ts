import { GenericI } from "@/types";

/**
 * A generic function to make HTTP requests using the fetch API.
 *
 * @param {string} url - The URL to make the request to.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {object} data - The data to send in the request body (for POST and PUT).
 * @param {object} headers - Custom headers to include in the request.
 * @returns {Promise<object>} - A Promise that resolves to the response data or rejects with an error.
 */

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

export async function Request(
  url: string,
  method = RequestMethod.GET,
  data: GenericI = {},
  headers = {}
) {
  const config: any = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Include the body only for POST and PUT requests
  if (
    method === RequestMethod.POST ||
    method === RequestMethod.PUT ||
    method === RequestMethod.PATCH
  ) {
    // create the config body
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(baseURL + url, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "An error occurred.");
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}
