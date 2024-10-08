import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typeDefs = loadFilesSync(`${__dirname}/*.graphql`, {recursive: true});
const mergedTypeDefs = mergeTypeDefs(typeDefs);

export default mergedTypeDefs;