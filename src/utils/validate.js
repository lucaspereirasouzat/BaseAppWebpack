function validator(fields, renamedFields) {
    let errors = [];
    for (const key in fields) {
        if (Object.keys(renamedFields).includes(key)) {

            if (fields[key] === (null || undefined) || fields[key].length === 0) {
                errors.push({ field: key, message: `O ${renamedFields[key]} não foi preenchido` })
            }

            if (key === 'email' && !!!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(fields[key])) {
                errors.push({ field: 'email', message: 'E-mail Inválido' })
            }
        }
        // if (object.hasOwnProperty(key)) {
        //     const element = object[key];

        // }
    }
    return errors;
}

export default validator;