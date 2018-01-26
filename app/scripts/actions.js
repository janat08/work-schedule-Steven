var extendObservable = mobx.extendObservable
var action = mobx.action
a = {
  selectUser: action((i)=>{
    s.selectedUser = i
  }),
  switchWeek: action((i)=>{
    var ref = s.curR
    var val = s.weekPeriods[i]
    var res = {curR: val[0].month == ref.month? val[0]: val[1]}
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
pick: action((val, i, edge)=>{ //state is changed on input
  s.times[i][edge] = val
}),
  toggleDisable: action((i)=>{
    // if(s.times[i].disabled == undefined){
    // extendObservable(s.times[i].disabled, {disabled: true})
    // }
     extendObservable(s.disabled, {[i]: !s.disabled[i]})
    // s.times[i].disabled = !s.times[i].disabled
  }),
  selectStart: action((x)=>{ //for user
    if (s.users[s.selectedUser].times[s.selectedDay][0] == ""){
      s.users[s.selectedUser].times[s.selectedDay].splice(0, 2, x.ts, s.dailyTimes[s.dailyTimes.length-1].plus({}).ts)
    } else {
      s.users[s.selectedUser].times[s.selectedDay][0]= x.ts
    }
  }),
  selectEnd: action((x)=>{ //for user
    if (s.users[s.selectedUser].times[s.selectedDay][1] == ""){
      s.users[s.selectedUser].times[s.selectedDay].splice(0, 2, s.dailyTimes[0].plus({}).ts, x.ts)
    } else {
      s.users[s.selectedUser].times[s.selectedDay][1]= x.ts
    }  }),

  selectDay: action((x)=>{
    s.selectedDay = x
  })

}
// autorun(()=>{
//   var res
//   var a = s.weekPeriods[s.currentWeek]
//   //res = get
//   //s.users = res.users
//   //s.times = res.times
// })
autorun(()=>{
})
