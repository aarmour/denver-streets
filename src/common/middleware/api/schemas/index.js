import { arrayOf } from 'normalizr';
import searchResultSchema from './searchResult';

export default {
  SEARCH_RESULT: searchResultSchema,
  SEARCH_RESULT_LIST: arrayOf(searchResultSchema)
};
