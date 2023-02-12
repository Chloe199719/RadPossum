migrate((db) => {
  const collection = new Collection({
    "id": "oiokmcyryx77gjm",
    "created": "2023-02-11 02:45:33.744Z",
    "updated": "2023-02-11 02:45:33.744Z",
    "name": "questions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pn82naoc",
        "name": "question",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "gkmyrhog",
        "name": "awnser",
        "type": "text",
        "required": false,
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
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("oiokmcyryx77gjm");

  return dao.deleteCollection(collection);
})
