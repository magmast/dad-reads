/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yeqe5xojlah6v64",
    "created": "2025-03-29 09:29:50.104Z",
    "updated": "2025-03-29 09:29:50.104Z",
    "name": "authors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "w0vynkgg",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("yeqe5xojlah6v64");

  return dao.deleteCollection(collection);
})
