import { createBodyRequest, newBodyRequest } from '../framework/fixtures/request-body/create-body'
import cloneDeep from 'lodash/cloneDeep'
import { addObject, deleteObject, updateObject } from '../framework/services/object-services'


describe('Objects API endpoints', () => {
  let objectId

  afterEach(async () => {
    if (objectId) {
      await deleteObject(objectId)
      objectId = null
    }
  })
  test('should update existed object', async () => {
    const requestBody = cloneDeep(createBodyRequest)
    const response = await addObject(requestBody)
    objectId = response.data.id
    const updateResponse = await updateObject(objectId, newBodyRequest)

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.data.id).toBe(objectId)
  })

  test('should not update new object with unexisted id', async () => {
    const requestBody = cloneDeep(createBodyRequest)
    const response = await updateObject("111111", requestBody)

    expect(response.status).toBe(404)
    expect(response.data.error).toContain(`The Object with id = 111111 doesn't exist`)

  })
})

