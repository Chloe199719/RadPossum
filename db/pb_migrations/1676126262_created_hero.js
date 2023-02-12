migrate((db) => {
  const collection = new Collection({
    "id": "kzqi1pz2z7sd625",
    "created": "2023-02-11 14:37:42.343Z",
    "updated": "2023-02-11 14:37:42.343Z",
    "name": "hero",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wbknxw1q",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "opofvtrf",
        "name": "highlightText",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "y8m8iti8",
        "name": "mainText",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kzqi1pz2z7sd625");

  return dao.deleteCollection(collection);
})
