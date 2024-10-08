import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from '@graphql-tools/merge';

const resolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`, {recursive: true });
const mergedResolvers = mergeResolvers(resolvers);

export default mergedResolvers;