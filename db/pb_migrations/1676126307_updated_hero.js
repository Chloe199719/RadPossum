migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kzqi1pz2z7sd625")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvuayz1q",
    "name": "titleSec",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wbknxw1q",
    "name": "titleFirst",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kzqi1pz2z7sd625")

  // remove
  collection.schema.removeField("jvuayz1q")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
