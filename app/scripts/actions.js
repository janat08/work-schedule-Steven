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
      time.splice(0,2, s.initializedTimes[i][0].plus({}).ts, s.initializedTimes[i][1].plus({}).ts)
    } else {
      time.splice(0,2,"", "")
    }
    console.log(time)
  }),
pick: action((val, i, edge)=>{ //TODO make autorun that fills gaps in times like in computed initializedTimes
  checkBadI(i) //is redundant as bad time picker won't render
  console.log(val.toString(),i, edge)
  s.times[i][edge] = val.ts
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
    checkBadI(i)
    if (s.users[s.selectedUser].times[s.selectedDay][0] == ""){
      s.users[s.selectedUser].times[s.selectedDay].splice(0, 2, x.ts, s.dailyTimes[s.dailyTimes.length-1].plus({}).ts)
    } else {
      s.users[s.selectedUser].times[s.selectedDay][0]= x.ts
    }
  }),
  selectEnd: action((x)=>{ //for user
    checkBadI(i)
    if (s.users[s.selectedUser].times[s.selectedDay][1] == ""){
      s.users[s.selectedUser].times[s.selectedDay].splice(0, 2, s.dailyTimes[0].plus({}).ts, x.ts)
    } else {
      s.users[s.selectedUser].times[s.selectedDay][1]= x.ts
    }  }),

  selectDay: action((x)=>{ //TODO bad performance
    checkBadI(x)
    s.selectedDay = x
  })

}

function checkBadI(x){
  if (x>= s.badIndexes[0] && x <= s.badIndexes[1]){
    throw new Error("This act falls outside selected month, switch it")
  }
}
