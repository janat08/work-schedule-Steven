const {
  observable,
  autorun
} = mobx
var DT = luxon.DateTime;
var au = autorun
var Dur = luxon.Duration
var Int = luxon.Interval
var JS = mobx.toJS
var data = [[1517421600000,1517507999999],[1517508000000,1517594399999],[1517594400000,1517680799999],[1517680800000,1517767199999]]
// initedData = initTimes(data)
var mobxArrayBoilerplate = [["",""],["",""],["",""],["",""],["",""],["",""],["",""],]

//https://github.com/mobxjs/mobx-utils
//fromPromise, initiate store with initial values
var mapFields = mobx.createTransformer(function(d) {
  var min = d[0], max = d[1]
  if(min == ""){
    return []
  }
  if(max == ""){
    return []
  }
  var interval = luxon.Interval.fromDateTimes(min, max),
    intervals = interval.splitBy(s.conf.sI),
    res = intervals.map(mapFormat)
  return res
})
var mapFormat = mobx.createTransformer(function(d){
d.formatted = d.start.toLocaleString(DT.TIME_SIMPLE)
  return d
})

var Store = observable({
  /* some observable state */
  curR: DT.local().plus({
    day: 3
  }), //currentReference,
  //schema: times:  [paired values]
  users:  [],
  timesUnselected: false,
  //["", ""] is important to demonstrate empty array as this is what checks in actions measure against, and mobx engine will dissapoint without it/with nothing there

  times: mobxArrayBoilerplate
  // initTimes.call(this, data)
  // this.initializeTimes

  // [[1517421600000,1517507999999],[1517508000000,1517594399999],[1517594400000,1517680799999],["", ""]]
  ,

  disabled: {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  },

  config: {
    sliderInt: 30 //forms, too
  },
  selectedUser: 0,
  dailyTimes: [], //shown as options in select forms
  get conf() {
    return {
      sI: Dur.fromObject({
        minutes: this.config.sliderInt
      })
    }
  },
  get dailyTimes(){
    return this.dailyTimesBoilerplate[s.selectedDay]
  },
  get dailyTimesBoilerplate(){
    return this.times.map((x)=>mapFields(x))
  },
  get selectedStart() { //for User on day
    var st = s
    if (st.mapUsers[st.selectedUser].times[st.selectedDay][0] == "") {
      return "none"
    } else {
      var selectedStart = DT.fromMillis(st.mapUsers[st.selectedUser].times[st.selectedDay][0]).toLocaleString(DT.TIME_SIMPLE)
    }
    return selectedStart
  },
  get selectedEnd() { //for User on day
    var st = s
    if (st.mapUsers[st.selectedUser].times[st.selectedDay][1] == "") {
      return "none"
    }
    var selectedStart = DT.fromMillis(s.mapUsers[s.selectedUser].times[s.selectedDay][1]).toLocaleString(DT.TIME_SIMPLE)
    return selectedStart
  },
  get selectedDay() {
    var st = s.badIndexes[0],
      en = s.badIndexes[1],
      res = this.curR.plus({
        day: 6
      }).weekday - 1
    // if (st == 0) {
    //   return en + res
    // }
    return this.curR.weekday - 1
  },
  set selectedDay(val) {
    var c = this.curR.weekday-1
    this.curR = this.curR.plus({days: val-c})
  },
  get queryIndexes(){ //todo [7, 6] if walking backwards
    var b = [0, 6]

    if (this.dayPeriods[0][0].month != this.performanceWeekSpan.month){
      b = [7-this.dayPeriods.slice().reverse().findIndex(x=>x[0].month != this.performanceWeekSpan.month), this.dayPeriods.length-1,]
    } else if (this.dayPeriods[6][0].month != this.performanceWeekSpan.month){
      b = [0, -1+this.dayPeriods.findIndex(x=>x[0].month != this.performanceWeekSpan.month),]
    }
    console.log("indexes", b)
    return b
  },
  queryPeriods: mobx.computed(function() {
    // mobx.whyRun()
    console.log("queryPeriods")
    return [this.dayPeriods[this.queryIndexes[0]][0], this.dayPeriods[this.queryIndexes[1]][1]]

  }, {equals: (a,b)=>{return a[0] == b[0]}}),
  get badIndexes() { //from 0 index, inclusive
    var map = s.queryIndexes
      if(map[0] != 0){
        return [0, map[0]-1]
      } else if (map[1] != 6){
        return [map[1]+1, 6]
      } else {
      return [8, 8]
    }
  },
  performanceWeekSpan: mobx.computed(function(){
    return {
      year: this.curR.year,
      month: this.curR.month,
      weekNumber: this.curR.weekNumber
    }
  }, {equals: (a,b)=>{return a.year==b.year && a.month==b.month && b.weekNumber == a.weekNumber}}),
  get weekSpan() { //span of month across weeks
    var yeMo = {year: this.performanceWeekSpan.year, month: this.performanceWeekSpan.month}
    first = DT.fromObject(yeMo),
      first = first.plus({
        days: (7 - first.weekday) - 6
      }),
      last = DT.fromObject(yeMo).minus({
        month: -1,
        millisecond: 1
      }),
      last = last.plus({
        days: (7 - last.weekday)
      })
    return {
      last,
      first
    }
  },
  get weeksNum() { //weeks in the month (inclusive)
    var last = this.weekSpan.last,
      first = this.weekSpan.first
    var diff = last.diff(first, "days")
    return Math.ceil(+diff.days) / 7
  },
  get weekPeriods() { //[start, end] times of weeks for current month
    var first = this.weekSpan.first,
      num = this.weeksNum
    var res = [first]
    for (var i = 0; i < num; i++) {
      res.push(res[i].plus({
        days: 7
      }))
    }
    res = res.map((x, i, ar) => {
      if (i + 1 == ar.length) {
        return
      }
      x = [x, ar[i + 1].minus({
        milliseconds: 1
      })]
      return x
    })
    res.pop()
    return res
  },
  dayPeriods: mobx.computed(function() { //[start, end] times of day for current week
    console.log('dayPeriods')
    var first = this.weekPeriods[this.currentWeek][0]
    var res = [first]
    for (var i = 0; i < 7; i++) {
      res.push(res[i].plus({
        days: 1
      }))
    }
    res = res.map((x, i, ar) => {
      if (i + 1 == ar.length) {
        return
      }
      x = [x, ar[i + 1].minus({
        milliseconds: 1
      })]
      return x
    })
    res.pop()
    return res
  }, {equals: (a,b)=>{console.log(a[0][0].ts == b[0][0].ts, "dayPeriods"); return a[0][0].ts == b[0][0].ts}}
  ),
  get currentWeek() { //returns index of week
    var self = this
    return this.performanceWeekSpan.weekNumber - this.weekPeriods[0][0].weekNumber
  },
  get calendarWeek() { //Formatting days -localized
    return this.dayPeriods.map(x => {
      var ref = x[0]
      x = {
        day: ref.toLocaleString({
          weekday: 'short'
        }).toUpperCase(),
        date: ref.toLocaleString({
          day: "2-digit"
        }),
        fullDay: ref.toLocaleString({
          weekday: 'long'
        })
      }
      return x
    })
  },
  get calendarTitle() { //Formatting title -localized
    return this.curR.toLocaleString({
      year: 'numeric',
      month: 'short'
    }).toUpperCase()
  },
  get storeHours() { //format store hours -localized
    return this.times.map(x => {
      return x.map(y => {
        return y.toLocaleString(DT.TIME_SIMPLE)
      })
    })
  },
  get disabledDays() {
    return this.disabled
    return this.times.map((x, i) => {
      x.ind = i;
      return x
    }).filter(x => x.disabled).reduce((a, x) => {
      a[x.ind] = true;
      return a
    }, {})
  },
  get initializeTimes() { //is unused, but required, was suppose to formats, converts times, getter is used when store has just spawned
    return initTimes.call(this, data)
  },
  set initializeTimes(data){
    this.times = initTimes.call(this, data)
  },
  get initializeUsers(){
    return initUsers.call(this, data)
  },
  set initializeUsers(data){
    this.users = initUsers.call(this, data)
  },
  //if you decide to prefetch, it may be appropriate to introduce intermediary step
  //that splices sort users, and the proceeds to map in another computation
  get mapUsers() {
    if (this.users.length == 0){
      return []
    }
    console.log("mapUsers triggered") //TODO suspicious stuff here at 262, try debug
    var self = this
    return self.users.map((x, zxc, zxcv) => {
      var ind = 0, f=0
      var nonEmpty = x.times.reduce((a,x,i)=>{
        if (x[0] != "" && x[1] != ""){
          a.push(i)
        }
        return a
      }, [])
      var res, uI //userIndex
      x.weekDays = s.times.reduce((ac, y, i, ar) => {
        var zx = {}
        if (i == 0) {
          var a = arrangeUsers(0, nonEmpty[f], x.times, ar)
          res = a.res
          uI = a.uI
        }
        if (uI == i) {
          zx.status = res
          var a = arrangeUsers(uI + 1, nonEmpty[++f], x.times, ar)
          res = a.res
          uI = a.uI
          // console.log(ind, i, res)

        } else {
          zx.status = "none"
        }
        ac.push(zx)
        return ac
      }, [])
      return x
    })
  },
})
s = Store

function initUsers(data){
  var self = this
  console.log(data)
  var a = data.map(x => {
    x.times = x.times.sort((x, y) =>{ x[0] - y[0]})
    var ind = 0, tI = 0, res = x.times
    res = this.dayPeriods.reduce(function(a, x, i, ar){
      var zx
      if (i == 0){
        ind = arrangeTimes(0, tI, res, ar)
      }
      if (ind == i){
        zx= (self.badIndexes[0] <= i && self.badIndexes[1] >= i)? ["", ""]: res[tI]
        tI += 1
        ind = arrangeTimes(ind+1, tI, res, ar)
      } else {
        zx = ["", ""]
      }
      a.push(zx)
      return a
    }, [])
    console.log("mid", res, x)
    x.times = res
    return x
    // var st = this.badIndexes[0],
    //   en = this.badIndexes[1],
    //   len = en - st + 1
    // if (st == 0) {
    //   x.times = Array(len).fill(["", ""], 0, len).concat(x.times)
    //   return x
    // } else if (en == 6) {
    //   x.times = x.times.concat(Array(len).fill(["", ""], 0, len))
    //   return x
    // }
  })
  console.log(a)
  return a
}

function initTimes(data){
  var res = data.map(x => {
      return x.map(x => {
        return DT.fromMillis(x)
      })
    }),
    ind = 0, tI = 0,
    res = this.dayPeriods.reduce(function(a, x, i, ar){
      var zx
      if (i == 0){
        ind = arrangeTimes(0, tI, res, ar)
      }
      if (ind == i){
        zx= res[tI]
        tI += 1
        ind = arrangeTimes(ind+1, tI, res, ar)
      } else {
        zx = ["", ""]
      }
      a.push(zx)
      return a
    }, [])
  return res
}
mobx.autorun(()=>{
  console.log("innited")
  s.initializeTimes = data
  s.initializeUsers =  [{
    name: "",
    times: data

  }]
  // s.times = initTimes.call(s, data)
})

//////////////////////////////////utilities
//pairs some schema index to non-empty value; helps record empty values
function arrangeTimes(uI, i, x, arr) {
  for (uI; uI < arr.length; uI++) {
    if (x[i][0] >= arr[uI][0] && x[i][1] <= arr[uI][1]) {
      return uI
    }
  }
  return arr.length
}

function arrangeUsers(uI, i, x, arr) {
  for (uI; uI < arr.length; uI++) {
    if (x[i][0] >= arr[uI][0] && x[i][1] <= arr[uI][1]) {
      if (x[i][0] == arr[uI][0] && x[i][1] == arr[uI][1]) {
        return {
          uI: uI,
          res: "full"
        }
      } else {
        return {
          uI: uI,
          res: "some"
        }
      }
    }
  }
  return {
    ind: arr.length,
    res: "none",
    uI: uI,
    i: i
  }
}

// function setFields() { //fields for the dropdown indicating user's hours
//   var min = s.times[s.selectedDay][0],
//     max = s.times[s.selectedDay][1],
//     steps = s.conf.sI
//   return {
//     min,
//     max,
//     steps
//   }
// }
// function chooseFields(){
//
// }
//
//
//
//
// function makeFields(d) {
//   var toggleNotification = false
//   var min = d.min, max = d.max
//   if(min == ""){
//     toggleNotification = true
//     min = s.dayPeriods[s.selectedDay][0]
//   }
//   if(max == ""){
//     toggleNotification = true
//     max = s.dayPeriods[s.selectedDay][1]
//   }
//   console.log("makeFields", max, min)
//   s.timesUnselected = toggleNotification
//   var interval = luxon.Interval.fromDateTimes(min, max),
//     intervals = interval.splitBy(d.steps),
//     res = intervals.map(x => x.start)
//   // res.push(d.max) anti-pattern, adds 59 minutes
//   s.dailyTimes = res
// }
//
// makeFields(setFields()) //also used as reaction in forms




// mobx.autorun(() => { //query helper
//   function modifyUser(x) {
//     var st = s.badIndexes[0],
//       en = s.badIndexes[1],
//       len = en - st + 1
//     if (st == 0) {
//       x.times = Array(len).fill(["", ""], 0, len).concat(x.times)
//       return x
//     } else if (end == 6) {
//       x.times = x.times.concat(Array(len).fill(["", ""], 0, len))
//       return x
//     }
//   }
//
//   var st = s.badIndexes[0],
//     en = s.badIndexes[1],
//     len = en - st + 1
//   s.users.map(modifyUser)
//
// })

// mobx.reaction(setUserFields, makeUserFields , {delay: 100});




///////////////////////////////////fixtures
/*
Generate times for given week
var a = JSON.stringify(s.dayPeriods.filter(x=>s.curR.month == x[0].month).map(x=>{
  return x.map(x=>{
    return x.ts
  })
})
)
*/
/////////////////////////////////////////

