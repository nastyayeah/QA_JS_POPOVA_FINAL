import { createBodyRequest } from '../framework/fixtures/request-body/create-body'
import cloneDeep from 'lodash/cloneDeep'
import { addObject, deleteObject } from '../framework/services/object-services'


describe('Objects API endpoints', () => {
  let objectId

  afterEach(async () => {
    if (objectId) {
      await deleteObject(objectId)
      objectId = null
    }
  })
  test('Should add new object', async () => {
    const requestBody = cloneDeep(createBodyRequest)
    const response = await addObject(requestBody)
    objectId = response.data.id
    expect(response.status).toBe(200)
    expect(response.data.id).not.toBe(undefined)
  })

  test('Should not add new object w/o data', async () => {
    const requestBody = ""
    const response = await addObject(requestBody)
    expect(response.status).toBe(400)
    expect(response.data.error).toBe(
      '400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.'
    )
  })
})

