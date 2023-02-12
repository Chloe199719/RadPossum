migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frsczjaajbtgwcx")

  // remove
  collection.schema.removeField("its1qv01")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("frsczjaajbtgwcx")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
