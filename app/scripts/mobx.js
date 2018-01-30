const {
  observable,
  autorun
} = mobx
var DT = luxon.DateTime;
var au = autorun
var Dur = luxon.Duration
var Int = luxon.Interval
var JS = mobx.toJS

//https://github.com/mobxjs/mobx-utils
//fromPromise, initiate store with initial values
var Store = observable({
  /* some observable state */
  curR: DT.local().plus({
    day: 3
  }), //currentReference,
  //schema: times:  [paired values]
  users: [{
    name: "name",
    times:
    [["", ""],[1517508000000,1517594399999],[1517594400000,1517680799999],[1517680800000,1517767199999]]

    //["", ""] is important to demonstrate empty array as this is what checks in actions measure against, and mobx engine will dissapoint without it/with nothing there
  }],
  times:
    [[1517421600000,1517507999999],[1517508000000,1517594399999],[1517594400000,1517680799999],["", ""]]
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
  get queryPeriods() {
    return this.dayPeriods.map(x => x[0]).filter(x => x.month == s.curR.month)
  },
  get badIndexes() { //from 0 index, inclusive
    var map = s.queryPeriods,
      len = map.length,
      start = map[0].weekday - 1,
      end = map[len - 1].weekday - 1
    if (end != 6 || start != 0) {
      if (start != 0) {
        return [0, start - 1]
      } else {
        return [end + 1, 6]
      }
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
  }, {equals: (a,b)=>{console.log(a==b,"fired", a.year==b.year && a.month==b.month); return a.year==b.year && a.month==b.month && b.weekNumber == a.weekNumber}}),
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
  // weekSpan: mobx.createTransformer(function() { //span of month across weeks
  //     var yeMo = this.performanceWeekSpan
  //     first = DT.fromObject(yeMo),
  //       first = first.plus({
  //         days: (7 - first.weekday) - 6
  //       }),
  //       last = DT.fromObject(yeMo).minus({
  //         month: -1,
  //         millisecond: 1
  //       }),
  //       last = last.plus({
  //         days: (7 - last.weekday)
  //       })
  //     return {
  //       last,
  //       first
  //     }
  //   },
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
  get dayPeriods() { //[start, end] times of day for current week
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
  },
  get currentWeek() { //returns index of week
    var self = this
    return this.performanceWeekSpan.weekNumber - this.weekPeriods[0][0].weekNumber
    // return this.weekPeriods.reduce(function (a, x, i) {
    //   if (x[0] <= self.curR && x[1] >= self.curR) {
    //     a = i
    //     return a
    //   } else {
    //     return a
    //   }
    // }, 0)
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
    return this.initializedTimes.map(x => {
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
  get sortTimes(){
    return clone(mobx.toJS(this.times)).map(x => {
      return x.map(x => {
        return DT.fromMillis(x)
      })
    })
  },
  get initializedTimes() { //turn to dates from ms
    var ind = 0, tI = 0, self = this
    return this.dayPeriods.reduce(function(a, x, i, ar){
      var zx
      if (i == 0){
        ind = arrangeTimes(0, tI, self.sortTimes, ar)
      }
      if (ind == i){
        zx= x
        tI += 1
        ind = arrangeTimes(ind+1, tI, self.sortTimes, ar)
      } else {
        zx = ["", ""]
      }
      a.push(zx)
      return a
    }, [])
  },
  // get sortUsers() { //by starting dates
  //   var self = this
  //   return this.users.map(x => {
  //     x.times.sort((x, y) => x[0] - y[0])
  //     return x
  //   })
  // },
  /* a derived value */
  get sortUsers() { //by starting dates
    var self = this
    var st = s.badIndexes[0],
      en = s.badIndexes[1],
      len = en - st + 1
    var a = clone(mobx.toJS(self.users)).map(x => {
      x.times = x.times.sort((x, y) =>{ x[0] - y[0]})
      if (st == 0) {
        x.times = Array(len).fill(["", ""], 0, len).concat(x.times)
        return x
      } else if (en == 6) {
        x.times = x.times.concat(Array(len).fill(["", ""], 0, len))
        return x
      }
    })
    return a
  },
  //if you decide to prefetch, it may be appropriate to introduce intermediary step
  //that splices sort users, and the proceeds to map in another computation
  get mapUsers() {
    console.log("mapUsers triggered")
    var self = this
    return self.sortUsers.map((x, zxc, zxcv) => {
      var ind = 0, f=0
      var nonEmpty = x.times.reduce((a,x,i)=>{
        if (x[0] != "" && x[1] != ""){
          a.push(i)
        }
        return a
      }, [])
      var res, uI //userIndex
      x.weekDays = s.initializedTimes.reduce((ac, y, i, ar) => {
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

function setFields() { //fields for the dropdown indicating user's hours
  var min = s.initializedTimes[s.selectedDay][0],
    max = s.initializedTimes[s.selectedDay][1],
    steps = s.conf.sI
  return {
    min,
    max,
    steps
  }
}

function makeFields(d) {
  var interval = luxon.Interval.fromDateTimes(d.min, d.max),
    intervals = interval.splitBy(d.steps),
    res = intervals.map(x => x.start)
  // res.push(d.max) anti-pattern, adds 59 minutes
  s.dailyTimes = res
}

makeFields(setFields()) //also used as reaction in forms

mobx.autorun(()=>{
  console.log("autorun init")
})


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

