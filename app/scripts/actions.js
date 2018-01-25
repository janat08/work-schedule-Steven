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
    var us = s.selectedUser
    s.users[y].times[i] = [s.initializedTimes[i][0].plus({}), s.initializedTimes[i][1].plus({})]
  }),
  pick: action((val, i, edge)=>{ //state is changed on input
    console.log()
    s.times[s.selectedDay][edge] = val
  }),
  toggleDisable: action((i)=>{
    // if(s.times[i].disabled == undefined){
    // extendObservable(s.times[i].disabled, {disabled: true})
    // }
     extendObservable(s.disabled, {[i]: !s.disabled[i]})
    // s.times[i].disabled = !s.times[i].disabled
  }),
  selectStart: action((x)=>{
    s.users[s.selectedUser].times[s.selectedDay][0]= x.ts
  }),
  selectEnd: action((x)=>{
    s.users[s.selectedUser].times[s.selectedDay][1]= x.ts
  }),

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
