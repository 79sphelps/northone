import { mergeResolvers } from "merge-graphql-schemas";

import Todo from "./Todo/";
//import Post from "./Post/";
//import Comment from "./Comment/";

//const resolvers = [User, Post, Comment];
const resolvers = [Todo];

export default mergeResolvers(resolvers);
