export const objectsApiEndpoints = {
    addObject: '/objects',
    getObjectsList: '/objects',
    getObjectsById: query => `/objects?${query}`,
    updateObjectById: id => `/objects/${id}`,
    deleteObjectById: id => `/objects/${id}`,
    partiallyUpdateObjectById: id => `/objects/${id}`,
    getSingleObjectById: id=> `/objects/${id}`
  }