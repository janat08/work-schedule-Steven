var extendObservable = mobx.extendObservable
var action = mobx.action
a = {
  selectUser: action((i)=>{
    s.selectedUser = i
  }),
  switchWeek: action((i)=>{
    var ref = s.curR
    var val = s.weekPeriods[i]
    s.curR =  val[0].month == ref.month? val[0]: val[1]
  }),
  next: action((i)=>{
    var ref = s.curR
    s.curR = DT.fromObject({year: ref.year, month: ref.month}).plus({month:1})
  }),
  previous: action((i)=>{
    var ref = s.curR
    s.curR = DT.fromObject({year: ref.year, month: ref.month}).minus({days:1})
  }),
  toggleDay: action((y, i)=>{
    if (s.disabledDays[i]){
      return
    }
    checkBadI(i)
    console.log(time, y, i)

    // var ind = s.badIndexes[0]==0? i-
    var time = s.users[y].times[i]
    console.log(time, y, i)

    var status = s.users[y].weekDays[i].status
    if (status != "full"){
      if(s.times[i][0] == ""){
        throw new Error("no work hours for the day")
      }
      // time.splice(0,2, s.times[i][0].plus({}).ts, s.times[i][1].plus({}).ts) don't know why this was necessery as dates are immutable anyhow
      time.splice(0,2, s.times[i][0].ts, s.times[i][1].ts)
    } else {
      time.splice(0,2,"", "")
    }
    console.log(time)
  }),
pick: action((val, i, edge)=>{ //TODO make autorun that fills gaps in times like in computed times
  checkBadI(i) //is redundant as bad time picker won't render
  console.log(val.toString(),i, edge)
  s.times[i][edge] = val
}),
  toggleDisable: action((i)=>{
    checkBadI(i)
    // if(s.times[i].disabled == undefined){
    // extendObservable(s.times[i].disabled, {disabled: true})
    // }
     extendObservable(s.disabled, {[i]: !s.disabled[i]})
    // s.times[i].disabled = !s.times[i].disabled
  }),
  selectStart: action((x)=>{ //for user
    checkBadI(x)
    if (s.users[s.selectedUser].times[s.selectedDay][0] == ""){
      s.users[s.selectedUser].times[s.selectedDay].splice(0, 2, x.start.ts, s.dailyTimes[s.dailyTimes.length-1].start.plus({}).ts)
    } else {
      s.users[s.selectedUser].times[s.selectedDay][0]= x.start.ts
    }
  }),
  selectEnd: action((x)=>{ //for user
    checkBadI(x)
    if (s.users[s.selectedUser].times[s.selectedDay][1] == ""){
      s.users[s.selectedUser].times[s.selectedDay].splice(0, 2, s.dailyTimes[0].start.plus({}).ts, x.start.ts)
    } else {
      s.users[s.selectedUser].times[s.selectedDay][1]= x.start.ts
    }  }),

  selectDay: action((x)=>{
    checkBadI(x)
    s.selectedDay = x
  })

}

function checkBadI(x){
  if (x>= s.badIndexes[0] && x <= s.badIndexes[1]){
    throw new Error("This act falls outside selected month, switch it")
  }
}
