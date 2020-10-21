const db = require("../../database/connection");

module.exports = {
    getPunches,
    punch
}

function getPunches() {
    return db('punches')
}

async function getPunchById(incomingPunchObj) {
    const { pass_id, user_id } = incomingPunchObj;
    const punch = await db('punches').where({ pass_id, user_id });
    return punch
}

async function checkExisting(incomingPunchObj) {
    const { pass_id, user_id } = incomingPunchObj;
    const existingPunch = await db('punches').where({ pass_id, user_id });
    // console.log(existingPunch)
    // console.log(existingPunch.length)
    if (existingPunch.length > 0) {
        return existingPunch
    } else {
        return false;
    }
}

function checkFreeClass() {

}

function createPunch(incomingPunchObj) {
    return db('punches').insert(incomingPunchObj)
    .then( createRes => {
        return getPunchById(incomingPunchObj)
    })
    .catch( createErr => {
        return createErr
    })
}

function resetPunches() {
    return "reset punches"
}

function incrementPunches(existingPunch) {
    const pass_id = existingPunch.pass_id;
    const user_id = existingPunch.user_id;

    console.log(`existing punch`, existingPunch)

    const updatedPunch = {...existingPunch}
    updatedPunch.punch_count += 1;

    console.log(`updated`, updatedPunch)

    db("punches")
    .where({ pass_id, user_id })
    .update(updatedPunch)
    .then( updateRes => {
        return "incremented successfully"
    })
    .catch( updateErr => {
        return updateErr;
    })
}

function decrementPunches () {
    return "decrement punches"
}

async function punch(incomingPunchObj) {

    const existingPunchArray = await checkExisting(incomingPunchObj);
    const existingPunch = existingPunchArray[0];

    console.log(`existing punch from punch() function`, existingPunch)
    if (existingPunch) {
        if (existingPunch.free_class === 1) {
            resetPunches();
        } else {
            return incrementPunches(existingPunch)
        }
    } else {
        return createPunch(incomingPunchObj)
    }
}