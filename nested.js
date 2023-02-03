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

const usersDataToIndex = [
  {
    id: '1',
    name: 'John',
    email: 'john@email.com',
    address: {
      street: 'elm street 12',
      postalCode: 452122,
    },
    favoritePets: [
      { name: 'fufy', species: 'dog' },
      { name: 'ronaldo', species: 'cat' },
      { name: 'nemo', species: 'fish' },
    ],
  },
  {
    id: '2',
    name: 'Alice',
    email: 'alice@email.com',
    address: {
      street: 'gran vía 12',
      postalCode: 123456,
    },
    favoritePets: [
      { name: 'ananda', species: 'cat' },
      { name: 'geronima', species: 'cat' },
    ],
  },
  {
    id: '3',
    name: 'Jane',
    email: 'Jane@email.com',
    address: {
      street: 'elm street 12',
      postalCode: 452122,
    },
    favoritePets: [
      { name: 'spurkle', species: 'dog' },
      { name: 'dori', species: 'fish' },
    ],
  },
];

const schema = {
  name: 'users',
  enable_nested_fields: true,
  fields: [
    {
      name: 'id',
      type: 'string',
      facet: false,
    },
    {
      name: 'email',
      type: 'string',
      facet: true,
    },
    {
      name: 'name',
      type: 'string',
      facet: true,
    },
    {
      name: 'address',
      type: 'object',
      facet: true,
    },
    {
      name: 'favoritePets',
      type: 'object[]',
      facet: true,
    },
  ],
  // default_sorting_field: 'name',
};

/*
// create collection
(async () => {
  try {
    await client.collections().create(schema);
  } catch (error) {
    console.log('Error: ', error);
  }
})();
*/

// index users

usersDataToIndex.forEach(async (document) => {
  await client.collections('users').documents().create(document);
});
