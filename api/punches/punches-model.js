const db = require("../../database/connection");

module.exports = {
    getPunches,
    punch
}

function getPunches() {
    console.log("getPunches()")
    return db('punches')
}

async function getPunchById(incomingPunchObj) {
    console.log("getPunchById()")
    const { pass_id, user_id } = incomingPunchObj;
    const punch = await db('punches').where({ pass_id, user_id });
    return punch
}

async function checkExisting(incomingPunchObj) {
    console.log("checkExisting()")
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
    console.log("checkIfPunchCardFull()")
    const { pass_id, user_id } = incomingPunchObj;
    const passRecord = await db('passes').select('max_punches').where('id', pass_id)
    console.log('passRecord', passRecord)
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
    console.log("setFreeClassToTrue()")
    const { pass_id, user_id } = incomingPunchObj;
    
    const oldCard = await getPunchById({ pass_id, user_id })
    const newCard = {...oldCard[0]}
    newCard.free_class = 1;
    console.log('newCard', newCard)
    
    return db('punches').where({ pass_id, user_id }).update(newCard)
    .then( updateRes => {
        return updateRes
    })
    .catch( updateErr => {
        return updateErr;
    })
}

function createPunch(incomingPunchObj) {
    console.log("createPunch()")
    const newPunchObj = {...incomingPunchObj, punch_count: 1}
    return db('punches').insert(newPunchObj)
    .then( createRes => {
        return getPunchById(incomingPunchObj)
    })
    .catch( createErr => {
        return createErr
    })
}

function resetPunches(incomingPunchObj) {
    console.log("resetPunches()")

    const { pass_id, user_id } = incomingPunchObj;

    const resetPunch = {...incomingPunchObj, punch_count: 0, free_class: 0}

    return db('punches').where({ pass_id, user_id }).update(resetPunch)
}

function incrementPunches(existingPunch) {
    console.log("incrementPunches()")

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
            return checkErr
        })
        return 'updated'
    })
    .catch( updateErr => {
        return updateErr;
    })
}

function decrementPunches () {
    console.log("decrementPunches()")
    return "decrement punches"
}

async function punch(incomingPunchObj) {
    console.log("punch()")

    const existingPunchArray = await checkExisting(incomingPunchObj);
    const existingPunch = existingPunchArray[0];

    console.log(`existing punch from punch() function`, existingPunch)
    if (existingPunch) {
        if (existingPunch.free_class === 1) {
            resetPunches(incomingPunchObj)
            .then( resetRes => {
                console.log('reset success', resetRes)
            })
            .catch( resetErr => {
                console.log('reset failed', resetErr)
            })
            return { free_class: 'true', message: "this is the user's free class, and their punch card has been reset"}
        } else {
            incrementPunches(existingPunch)
            return getPunchById(incomingPunchObj)
        }
    } else {
        return createPunch(incomingPunchObj)
    }
}