const {observable, autorun} = mobx
//with autorun
var DT = luxon.DateTime;
var a

var Store = observable({
    /* some observable state */
    todos: [1,2,3],
    curR: DT.local(), //currentReference,


    /* a derived value */
    get curV(){
      return
    },
    get completedCount() {
        return this.todos.filter(todo => todo.completed).length;
    },
    get currentMonth(){
      // return this.curV.months("short")
    },
    get currentWeek(){
      // var b = this.curV
      // var a = DT.local(b.weekYear, b.month).weekday
      // var max = DT.local(b.weekYear, b.month).weekday
      // return b.day //find week, new date with days*week
    },
    get currentWeekDays(){
      return
    },
});

var s = Store

a = {
  changeWeek(offset){
    var sign = Math.sign(offset)==1
    s.curV
  }
}

// /* a function that observes the state */
// autorun(function() {
//     console.log("Completed %d of %d items",
//         todoStore.completedCount,
//         todoStore.todos.length
//     );
// });
