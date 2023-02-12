migrate((db) => {
  const collection = new Collection({
    "id": "frsczjaajbtgwcx",
    "created": "2023-02-11 14:13:35.490Z",
    "updated": "2023-02-11 14:13:35.490Z",
    "name": "aboutme",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "07oo2zq9",
        "name": "desc",
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
        "id": "its1qv01",
        "name": "field",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "blr5adkzypnln87",
          "cascadeDelete": false,
          "maxSelect": null,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("frsczjaajbtgwcx");

  return dao.deleteCollection(collection);
})
