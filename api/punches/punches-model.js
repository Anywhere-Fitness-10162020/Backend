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

async function checkIfPunchCardFull(incomingPunchObj) {
    const { pass_id, user_id } = incomingPunchObj;
    const passRecord = await db('passes').select('max_punches').where('id', pass_id)
    const maxPunches = passRecord[0].max_punches
    console.log(maxPunches)

    const punchRecord = await db('punches').select('punch_count').where({ pass_id, user_id })
    const punchCount = punchRecord[0].punch_count;
    console.log(punchCount)

    if (punchCount >= maxPunches) {
        //toggle free_class to true
        console.log('card full: free class to true')
        return setFreeClassToTrue(incomingPunchObj)
    } else {
        return 'card not full: free_class stays false'
        //end function and return 
    }
}

async function setFreeClassToTrue(incomingPunchObj) {
    const { pass_id, user_id } = incomingPunchObj;
    
    const oldCard = await getPunchById({ pass_id, user_id })
    const newCard = {...oldCard, free_class: 1}
    console.log(newCard)
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

    return db("punches")
    .where({ pass_id, user_id })
    .update(updatedPunch)
    .then( updateRes => {
        console.log("incremented successfully", updateRes)
        checkIfPunchCardFull({ pass_id, user_id })
        .then( checkRes => {
            console.log('check if punch card full', checkRes)
        })
        .catch( checkErr => {
            console.log(checkErr)
        })
        return getPunchById({ pass_id, user_id })
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