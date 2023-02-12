migrate((db) => {
  const collection = new Collection({
    "id": "blr5adkzypnln87",
    "created": "2023-02-11 14:13:13.577Z",
    "updated": "2023-02-11 14:13:13.577Z",
    "name": "social_media",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hu87s8pk",
        "name": "name",
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
        "id": "jqunwm7u",
        "name": "socialmedia_url",
        "type": "url",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
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
  const collection = dao.findCollectionByNameOrId("blr5adkzypnln87");

  return dao.deleteCollection(collection);
})
