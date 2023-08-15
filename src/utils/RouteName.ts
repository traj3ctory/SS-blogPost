// Create a list of all the application routes

import { GenericI } from "@/types";

export const APP_ROUTES: GenericI = {
  postList: "/posts",
  postDetail: "/posts/:id",
  postCreate: "/posts/create",
};