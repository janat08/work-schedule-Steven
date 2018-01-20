const {observable, autorun} = mobx
var DT = luxon.DateTime;
var a
var Dur = luxon.Duration
var Int = luxon.Interval


//https://github.com/mobxjs/mobx-utils
//fromPromise, initiate store with initial values
var Store = observable({
    /* some observable state */
    curR: DT.local(), //currentReference,
  //schema: times:  [paired values]
    users: [{name: "name", times: this.dayPeriods}],
    // times:  [{"start":"2018-01-19T09:00:00.000+06:00","end":"2018-01-19T18:00:00.000+06:00","disabled":false},{"start":"2018-01-19T09:00:00.000+06:00","end":"2018-01-19T18:00:00.000+06:00","disabled":false},{"start":"2018-01-19T09:00:00.000+06:00","end":"2018-01-19T18:00:00.000+06:00","disabled":false},{"start":"2018-01-19T09:00:00.000+06:00","end":"2018-01-19T18:00:00.000+06:00","disabled":false},{"start":"2018-01-19T09:00:00.000+06:00","end":"2018-01-19T18:00:00.000+06:00","disabled":false},{"start":"2018-01-19T09:00:00.000+06:00","end":"2018-01-19T18:00:00.000+06:00","disabled":false},{"start":"2018-01-19T09:00:00.000+06:00","end":"2018-01-19T18:00:00.000+06:00","disabled":false}],

  //storeHours, with optional disabled:true prop
    times: [],
    config: {sliderInt: 15},

    /* a derived value */
    get conf(){
      return {sI: Dur.fromObject({minutes: this.config.sliderInt})}
    },
  get curRMonthYear(){
      return {year: this.curR.year, month: this.curR.month}
  },
    get weekSpan(){ //span of month across weeks
      var first,last, months, weeks, curr = this.curRMonthYear
        first = DT.fromObject({year: curr.year, month: curr.month})
      first = first.plus({days: (7-first.weekday)-6})
      last = DT.fromObject({year: curr.year, month: curr.month+1}).minus({minute:1})
      last = last.plus({days: (7-last.weekday)})
      months = new Array (12).map((x,i)=>{
        x = DT.fromObject({year: year.year, month: i+1})
      })
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
        x=[x, ar[i+1].minus({milliseconds: 1})]
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
        x=[x, ar[i+1].minus({milliseconds: 1})]
        return x
      })
      res.pop()
      this.times=res
      return res
    },
    get currentWeek(){ //returns index of week
      var self = this
      return this.weekPeriods.reduce(function(a, x, i){
        if(x[0]< self.curR && x[1] > self.curR) {
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
        x = {day: ref.toFormat('ccc').toUpperCase(), date: ref.toFormat("dd"), fullDay: ref.toFormat("cccc")}
        return x
      })
    },
   get calendarTitle(){ //Formatting title -localized
        return this.curR.toFormat("LLL yyyy").toUpperCase()
   },
  get storeHours(){ //format store hours -localized
      return this.times.map(x=>{
        return x.map(y=>{
          return y.toFormat("t")
        })
      })
  },

  //TODO change dayPeriods to user generated values
  get sortUsers(){ //by starting dates
    var self = this
      return this.users.map(x=>{
        x.times = mobx.toJS(self.dayPeriods)
        x.times.sort((x,y)=>x[0]-y[0])

        return x
      })
  },
  //if you decide to prefetch, it may be appropriate to introduce intermediary step
  //that splices sort users, and the proceeds to map in another computation
  //TODO map over store hours for weekdays
  get mapUsers(){
      return this.sortUsers.map(x=>{
        var ind = 0
        var res, uI //userIndex
        x.weekDays = x.times.map((y,i, ar)=>{
          if (i == 0){
            var {ind, rest, uI} = arrangeUsers(0, 0, x, ar)
          }
          if (ind == i){
            y.status = res
            y.userIndex = uI
            var {ind, res, uI} = arrangeUsers(i+1, uI+1, x, ar)
          } else {
            y.status = "none"
          }
          if (i == 0){
            y.status = "none"
            console.log(ind, i, res)
          }
          return y
        })
      return x
      })
  }
});

var s = Store

a = {
  changeWeek(offset){
    var sign = Math.sign(offset)==1
    s.curV
  },
  changeSlider(ui, ind, event){

    _.debounce(POST(), 500)
  }
}
//pairs some schema index to non-empty value; helps record empty values
function arrangeUsers(i, uI, x, arr){
  var userIndex
  for (i; i<arr.length; i++){
    if (x.times[uI][0] >= arr[i][0] && x.times[uI][1] <= arr[i][1]){
      if (x.times[uI][0] == arr[i][0] && x.times[uI][1] == arr[i][1]){
        return {ind: i, uI: uI, res: "full"}
      } else {
        return {ind: i, uI: uI, res: "some"}
      }
    }
  }

  return {ind: arr.length, res: "none", uI: uI}
}
function POST(){}
/* a function that observes the state */
//fixtures

    // if(!s.times.length){
    //   for(var d = 0; d < 7; d++) {
    //     s.times.push({start: DT.fromObject({hours: 9}), end: DT.fromObject({hours: 18})})
    //   }
    //
    // }
    //
    // console.log(s.timesC[3].min.toJSDate().getTime().toString(), s.timesC[3].max.toString())

/////////////////////////////////////////
/*
var first,last, months, weeks, curr = luxon.DateTime.local() , DT = luxon.DateTime, Dur = luxon.Duration
  first = DT.fromObject({year: curr.year, month: curr.month})
      first = first.plus({days: (7-first.weekday)-6})
      last = DT.fromObject({year: curr.year, month: curr.month+1}).minus({minute:1})
      last = last.plus({days: (7-last.weekday)})
*/

// {user: "name", date: [1517680800000, 1517767199999]}
