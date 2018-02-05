  class forms extends hyperElement{
    setup(n){
      var a = au(n(s))
      // var b = mobx.reaction(setFields, makeFields, {delay: 100});
      return ()=>{a();return}
    }

  render(h, st){
//       var slice = 0
// if (st.badIndexes[0] == 0){
//   slice = {st:}
// } else if (st.badIndexes[1] == 6){
//
// }
if (st.users.length == 0){
  return h`<span>No users to schedule`
}
    return h`
    <div class="dropdown">
    Selected Day:
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          ${st.calendarWeek[st.selectedDay].fullDay}
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          ${st.calendarWeek.slice(st.queryIndexes[0], st.queryIndexes[1]+1).map((x, i) => {

      function selectDay() {
        return a.selectDay(i)
      }

      return w(x, ":dropdownDay")`
            <li onclick=${selectDay}><a>${x.fullDay}</a></li>
            `
    })}
        </ul>
      </div>
    <div class="dropdown">
    Selected User:
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          ${st.users[st.selectedUser].name}
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          ${st.users.map((x, i) => {

      function selectUser() {
        return a.selectUser(i)
      }

      return w(x, ":dropdownUser")`
            <li onclick=${selectUser}><a>${x.name}</a></li>
            `
    })}
        </ul>
      </div>
    <div class="dropdown">
    Start:
      <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        ${st.selectedStart}
        <span class="caret"></span>
      </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          ${st.dailyTimes.map((x, i) => {

        function selectStart() {
          return a.selectStart(x)
        }
      return w(x, ":userStart")`
            <li onclick=${selectStart}><a>${x.formatted}</a></li>
            `
    })}
        </ul>
    </div>

    <div class="dropdown">
        End
        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          ${st.selectedEnd}
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          ${st.dailyTimes.map((x,i)=>{
            function selectEnd(){
              return a.selectEnd(x)
            }
            return w(x, ":userEnd")`
            <li onclick=${selectEnd}><a>${x.formatted}</a></li>
            `
    })}
        </ul>
      </div>
      

  `
}
  }
