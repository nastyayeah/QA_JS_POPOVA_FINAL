import Ajv from "ajv";
import fs from 'fs'
const ajv = new Ajv({ allowUnionTypes: true })


export function isResponseGetObjectsValid(response) {
    const schema = JSON.parse(fs.readFileSync('api/framework/schemas/get-objects-response.json', 'utf8'));
    const validate = ajv.compile(schema);
    const isValid = validate(response);
    return isValid
}

export function isResponseGetObjectByIdValid(response) {
    const schema = JSON.parse(fs.readFileSync('api/framework/schemas/get-object-response.json', 'utf8'));
    const validate = ajv.compile(schema);
    const isValid = validate(response);
    return isValid
}

export function isErorResponseGetObjectValid(response) {
    const schema = JSON.parse(fs.readFileSync('api/framework/schemas/get-object-error-reponse.json', 'utf8'));
    const validate = ajv.compile(schema);
    const isValid = validate(response);
    return isValid
}
