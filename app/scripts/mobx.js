const {
  observable,
  autorun
} = mobx
var DT = luxon.DateTime;
var au = autorun
var Dur = luxon.Duration
var Int = luxon.Interval


//https://github.com/mobxjs/mobx-utils
//fromPromise, initiate store with initial values
var Store = observable({
  /* some observable state */
  curR: DT.local(), //currentReference,
  //schema: times:  [paired values]
  selectedDay: 0,
  users: [{
    name: "name",
    times:  [[1516557600000,1516643999999],[1516644000000,1516730399999],[1516730400000,1516816799999],[1516816800000,1516903199999],[1516903200000,1516989599999],[1516989600000,1517075999999],[1517076000000,1517162399999]]

  },{
    name: "asdfs",
    times:  [[1516557600000,1516643999999],[1516644000000,1516730399999],[1516730400000,1516816799999],[1516816800000,1516903199999],[1516903200000,1516989599999],[1516989600000,1517075999999],[1517076000000,1517162399999]]

  }],
  times:  [[1516557600000,1516643999999],[1516644000000,1516730399999],[1516730400000,1516816799999],[1516816800000,1516903199999],[1516903200000,1516989599999],[1516989600000,1517075999999],[1517076000000,1517162399999]]
  ,

  disabled: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false},

  config: {
    sliderInt: 15 //forms, too
  },
  selectedUser: 0,
  dailyTimes: [],
  get sortUsers(){ //by starting dates
    var self = this
      return this.users.map(x=>{
        x.times.sort((x,y)=>x[0]-y[0])
        return x
      })
    },
/* a derived value */
get conf(){
    return {sI: Dur.fromObject({minutes: this.config.sliderInt})}
  },
  get curRMonthYear(){
  console.log("curR triggers")
    return {year: this.curR.year, month: this.curR.month}
  },
  get weekSpan(){ //span of month across weeks
    var curr = this.curR,
      first = DT.fromObject({year: curr.year, month: curr.month}),
    first = first.plus({days: (7-first.weekday)-6}),
    last = DT.fromObject({year: curr.year, month: curr.month}).minus({month: -1, millisecond:1}),
    last = last.plus({days: (7-last.weekday)})
    return {last, first}
  },
  get weeksNum(){ //weeks in the month (inclusive)
    var last = this.weekSpan.last, first = this.weekSpan.first
    var diff = last.diff(first, "days")
    return Math.ceil(+diff.days)/7
  },
  get weekPeriods(){ //[start, end] times of weeks for current month
    var first = this.weekSpan.first, num = this.weeksNum
    var res = [first]
    for (var i = 0; i < num; i++){
      res.push(res[i].plus({days: 7}))
    }
    res = res.map((x,i,ar)=>{
      if(i+1 == ar.length){
        return
      }
      x=[x, ar[i+1].minus({milliseconds: 1})] //.minus({milliseconds: 1})
      return x
    })
    res.pop()
    return res
  },
  get dayPeriods(){ //[start, end] times of day for current week
    var first = this.weekPeriods[this.currentWeek][0]
    var res = [first]
    for (var i = 0; i < 7; i++){
      res.push(res[i].plus({days: 1}))
    }
    res = res.map((x,i,ar)=>{
      if(i+1 == ar.length){
        return
      }
      x=[x, ar[i+1].minus({milliseconds: 1})] //.minus({milliseconds: 1})
      return x
    })
    res.pop()
    return res
  },
  get currentWeek(){ //returns index of week
    var self = this
    return this.weekPeriods.reduce(function(a, x, i){
      if(x[0]<= self.curR && x[1] >= self.curR) {
        a = i
        return a
      } else {
        return a
      }
    }, 0)
  },
  get calendarWeek(){ //Formatting days -localized
    return this.dayPeriods.map(x=>{
      var ref = x[0]
      x = {day: ref.toLocaleString({ weekday: 'short' }).toUpperCase(), date: ref.toLocaleString({ day: "2-digit" }), fullDay: ref.toLocaleString({ weekday: 'long' })}
      return x
    })
  },
  get calendarTitle(){ //Formatting title -localized
      return this.curR.toLocaleString({year: 'numeric', month: 'short'}).toUpperCase()
  },
  get initializedTimes(){ //turn to dates from ms
  return this.times.map(x=>{
    return x.map(x=>{
      return DT.fromMillis(x)
    })
  })
  },
  get storeHours(){ //format store hours -localized
    return this.initializedTimes.map(x=>{
      return x.map(y=>{
        return y.toLocaleString(DT.TIME_SIMPLE)
      })
    })
  },

  get sortUsers(){ //by starting dates
  var self = this
    return this.users.map(x=>{
      x.times.sort((x,y)=>x[0]-y[0])
      return x
    })
  },
  //if you decide to prefetch, it may be appropriate to introduce intermediary step
  //that splices sort users, and the proceeds to map in another computation
  //operates on raw times
  get mapUsers(){ //TODO may not output some or none
  console.log("mapUsers triggered")
    var self = this
    return mobx.toJS(self.sortUsers).map((x, zxc, zxcv)=>{
      var ind = 0
      var res, uI //userIndex
      x.weekDays = s.times.reduce((ac, y,i, ar)=>{
        var  zx =  {}


        if (i == 0){
          var a = arrangeUsers(0, x, ar)
          res = a.res
          uI = a.uI
        }
        if (uI == i){
          zx.status = res
          var a = arrangeUsers(uI+1, x, ar)
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
  get disabledDays(){
    return this.disabled
    return this.times.map((x,i)=>{x.ind = i; return x}).filter(x=>x.disabled).reduce((a, x)=>{a[x.ind]=true;return a}, {})
  },

  get selectedStart(){
    var st = s
    var selectedStart = DT.fromMillis(st.mapUsers[st.selectedUser].times[st.selectedDay][0])
    return selectedStart
  },
  get selectedEnd(){
    var st = s
    var selectedStart = DT.fromMillis(s.mapUsers[s.selectedUser].times[s.selectedDay][1])
    return selectedStart
  }

})
var s = Store

    //////////////////////////////////utilities
    //pairs some schema index to non-empty value; helps record empty values
    function arrangeUsers(uI, x, arr) {
      for (uI; uI < arr.length; uI++) {
        if (x.times[uI][0] >= arr[uI][0] && x.times[uI][1] <= arr[uI][1]) {
          if (x.times[uI][0] == arr[uI][0] && x.times[uI][1] == arr[uI][1]) {
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
        uI: uI
      }
    }

function setFields(){ //fields for the dropdown indicating user's hours
  var min = s.initializedTimes[s.selectedDay][0],
  max = s.initializedTimes[s.selectedDay][1],
  steps = s.conf.sI
  return {min,max,steps}
}
function makeFields (d){
  var interval = luxon.Interval.fromDateTimes(d.min, d.max),
  intervals = interval.splitBy(d.steps),
  res = intervals.map(x=>x.start)
  res.push(d.max)
  s.dailyTimes = res
}
makeFields(setFields())
mobx.reaction(setFields, makeFields , {delay: 100});

// mobx.autorunAsync(()=>{
//   s.times = s.debouncedTimes.toJS()
//   console.log("synced", s.times.toJS(), s.debouncedTimes.toJS())
// }, 1000)

// mobx.reaction(setUserFields, makeUserFields , {delay: 100});




    ///////////////////////////////////fixtures
    /*
    Generate times for given week
    var a = JSON.stringify(s.dayPeriods.map(x=>{
      return x.map(x=>{
        return x.ts
      })
    })
    )
    */
    /////////////////////////////////////////
    // {user: "name", date: [1517680800000, 1517767199999]}



// function makeSortUsers(){ //by starting dates
//   var self = s
//     self.sortUsers = self.users.map(x=>{
//       x.times.sort((x,y)=>x[0]-y[0])
//       return x
//     })
//   }

// function makeUserFields () {
//     console.log("mapUsers triggered", this)
//       var self = Store
//       s.mapUsers = self.sortUsers.map(x=>{
//         var ind = 0
//         var res, uI //userIndex
//         x.weekDays = s.times.reduce((ac, y,i, ar)=>{
//           var  zx = {}


//           if (i == 0){
//             var a = arrangeUsers(0, 0, x, ar)
//             ind = a.ind
//             res = a.res
//             uI = a.uI
//           }
//           if (ind == i){
//             zx.status = res
//             var a = arrangeUsers(i+1, uI+1, x, ar)
//             ind = a.ind
//             res = a.res
//             uI = a.uI
//             // console.log(ind, i, res)

//           } else {
//             zx.status = "none"
//           }
//           ac.push(zx)
//           return ac
//         }, [])
//       return x
//       })
// }
