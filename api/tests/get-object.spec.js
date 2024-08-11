import { getObjectsList, getObjectsById, getObject } from '../framework/services/object-services'
import { isResponseGetObjectsValid, isResponseGetObjectByIdValid } from '../framework/utils/schema-checker'

describe('Objects API endpoint: Get object', () => {

    // all this objects cannot be ovverriden, thats why you can get object by id w/o creating new one

    test('should get list of all objects', async () => {
        const response = await getObjectsList()
        expect(response.status).toBe(200)
        expect(response.data).not.toBeNull();
        expect(isResponseGetObjectsValid(response.data)).toBe(true)
    })

    test('should get list of objects by ids', async () => {
        const objIds = ["1", "2", "3"]
        const response = await getObjectsById(objIds)
        expect(response.status).toBe(200)
        const responseData = response.data
        responseData.forEach((obj) => {
            expect(objIds).toContain(obj.id);
        });
        expect(isResponseGetObjectsValid(response.data)).toBe(true)
    })

    test('should get object by id', async () =>{
        const response = await getObject("2")
        expect(response.status).toBe(200)
        expect(response.data.id).toBe('2')
        expect(response.data).not.toBeNull()
        expect(isResponseGetObjectByIdValid(response.data)).toBe(true)
    })

    test('should not get object with unexisted id', async () =>{
        const objId = '10002'
        const response = await getObject(objId)
        console.log(response.data)
        expect(response.status).toBe(404)
        expect(response.data.error).toBe(`Oject with id=${objId} was not found.`)
    })
})