/*
 *  Our JavaScript client library works on both the server and the browser.
 *  When using the library on the browser, please be sure to use the
 *  search-only API Key rather than the master API key since the latter
 *  has write access to Typesense and you don't want to expose that.
 */

// Create typesense client
const Typesense = require('typesense');

let client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
      port: '8108', // For Typesense Cloud use 443
      protocol: 'http', // For Typesense Cloud use https
    },
  ],
  apiKey: 'local-typesense-api-key',
  connectionTimeoutSeconds: 2,
});
/*
// Create book schema
let booksSchema = {
  name: 'books',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'authors', type: 'string[]', facet: true },

    { name: 'publication_year', type: 'int32', facet: true },
    { name: 'ratings_count', type: 'int32' },
    { name: 'average_rating', type: 'float' },
  ],
  default_sorting_field: 'ratings_count',
};

client
  .collections()
  .create(booksSchema)
  .then(function (data) {
    console.log(data);
  });
*/
// Adding books to the collection

const fs = require('fs/promises');

(async function () {
  const booksInJsonl = await fs.readFile('./sample-data/books.jsonl');
  client.collections('books').documents().import(booksInJsonl);
})();

/*
let searchParameters = {
  q: 'harry potter',
  query_by: 'title',
  filter_by: 'publication_year:<1998',
  sort_by: 'ratings_count:desc',
};
*/

let searchParameters = {
  q: 'experyment',
  query_by: 'title',
  facet_by: 'authors',
  sort_by: 'average_rating:desc',
};

client
  .collections('books')
  .documents()
  .search(searchParameters)
  .then(function (searchResults) {
    console.log(JSON.stringify(searchResults, null, 2));
  });

(async function () {
  const existMyCollection = await client.collections('books').exists();
  console.log({ existMyCollection });
})();
