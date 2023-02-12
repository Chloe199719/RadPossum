migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67lw7e69vqyyxsh")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67lw7e69vqyyxsh")

  collection.createRule = null

  return dao.saveCollection(collection)
})
