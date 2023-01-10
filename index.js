// Your code here

let createEmployeeRecord = (row) => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// console.log(createEmployeeRecord())

function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(employeeRow => createEmployeeRecord(employeeRow))
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour), //parseInt now will save you the trouble of doing it later in the hoursWorkedOnDate
        date: date //does not necessarily need date here, can just be the key of date only
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour), //parseInt now will save you the trouble of doing it later in the hoursWorkedOnDate
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const inEvent = employee.timeInEvents.find(e => e.date === date)

    const outEvent = employee.timeOutEvents.find(e => e.date === date)
    
    // console.log(employee, date)

    return (outEvent.hour - inEvent.hour) / 100 // this is where if we didn't parseInt before, we'd have to do it now
}

function wagesEarnedOnDate(employee, date) {
    const singleWage = hoursWorkedOnDate(employee, date) * employee.payPerHour
     return singleWage
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(e => e.date)
    // console.log(datesWorked)
    // console.log(employee)

    const payWages = datesWorked.reduce(function(wageAccumulator, date){
        // console.log(wageAccumulator) //shows the dates
        return wageAccumulator + wagesEarnedOnDate(employee, date)
    }, 0)
    return payWages
}

function calculatePayroll(arrayEmployeeRecords) {
    // console.log(arrayEmployeeRecords) //gives back [object] truncated
    // console.log(arrayEmployeeRecords[0]) //gives back the explicit object
    // console.log(arrayEmployeeRecords[0].timeInEvents) // gives back the first object's timeInEvents
    return arrayEmployeeRecords.reduce(function(wageAccumulator, employeeRecord) {
        return wageAccumulator + allWagesFor(employeeRecord)
    }, 0)
}
