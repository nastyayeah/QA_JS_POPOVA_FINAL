import { objectsApi } from './api'
import { objectConfig } from '../config/config'
import { objectsApiEndpoints } from '../config/endpoints'

export async function addObject(requestBody) {
  const response = await objectsApi.post(
    objectsApiEndpoints.addObject,
    requestBody
  )
  return { status: response.status, data: response.data }
}

export async function updateObject(Id, requestBody) {
  const response = await objectsApi.put(
    objectsApiEndpoints.updateObjectById(Id),
    requestBody
  )
  return { status: response.status, data: response.data }
}

export async function deleteObject(Id) {
  const response = await objectsApi.delete(
    objectsApiEndpoints.deleteObjectById(Id)
  )
  return { status: response.status, data: response.data }
}

export async function partiallyUpdateObject(Id, requestBody) {
  const response = await objectsApi.patch(
    objectsApiEndpoints.partiallyUpdateObjectById(Id),
    requestBody
  )
  return { status: response.status, data: response.data }
}

export async function getObjectsList() {
  const response = await objectsApi.get(objectsApiEndpoints.getObjectsList)
  return { status: response.status, data: response.data }
}

export async function getObjectsById(ids = []) {
  const query = ids.map(id => `id=${id}`).join('&');
  const response = await objectsApi.get(objectsApiEndpoints.getObjectsById(query))
  return { status: response.status, data: response.data }
}

export async function getObject(Id) {
  const response = await objectsApi.get(
    objectsApiEndpoints.getSingleObjectById(Id)
  )
  return { status: response.status, data: response.data }
}
