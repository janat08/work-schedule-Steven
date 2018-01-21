var extendObservable = mobx.extendObservable
a = {
  selectUser(i){
    console.log("fired")
    console.log(i)
    s.selectedUser = i
  },
  switchWeek(i){
    console.log(i)
    var ref = s.curR
    var val = s.weekPeriods[i]
    var res = {curR: val[0].month == ref.month? val[0]: val[1]}
    console.log(val, val[0].month == ref.month? val[0]: val[1])
    // obser(curR, val[0].month == ref.month? val[0]: val[1])
    extendObservable(s, res)
  },
  next(){
    var ref = s.curR
    s.curR = DT.fromObject({month: ref.month+1})
  },
  previous(){
    var ref = s.curR
    s.curR = DT.fromObject({month: ref.month}).minus({days:1})
  },
  toggleDay(x, i){
    if (s.disabledDays[i]){
      return
    }
    var us = s.selectedUser
    s.users[us].times[i] = s.times[i]
  },
  changeSlider(i){ //state is changed on input
    var val = s.times[i]
    _.debounce(POST(val), 500)
  },
  toggleDisable(i){
    extendObservable(s.times[i], disabled)
    s.times[i].disabled = !s.times[i].disabled
  },

}
// autorun(()=>{
//   var res
//   var a = s.weekPeriods[s.currentWeek]
//   //res = get
//   //s.users = res.users
//   //s.times = res.times
// })
autorun(()=>{
  console.log("autorun", s.curRMonthYear)
})

function obser(target, date){
  var a = extendObservable
  a(s[target], date)
}
