  class forms extends hyperElement{
    setup(n){
      var a = au(n(s))
      return a
    }

  render(h, st){

    return h`
    <div class="dropdown">
    Selected Day:
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          ${st.calendarWeek[st.selectedDay].fullDay}
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          ${st.calendarWeek.map((x, i) => {

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
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        ${st.selectedStart.toFormat("t")}
        <span class="caret"></span>
      </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          ${st.dailyTimes.map((x, i) => {

        function selectStart() {
          return a.selectStart(x)
        }
      return w(x, ":dropdownUser")`
            <li onclick=${selectStart}><a>${x.toFormat("t")}</a></li>
            `
    })}
        </ul>
    </div>

    <div class="dropdown">
        End
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          ${st.selectedEnd.toFormat("t")}
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          ${st.dailyTimes.map((x,i)=>{
            function selectEnd(){
              return a.selectEnd(x)
            }
            return w(x, ":end")`
            <li onclick=${selectEnd}><a>${x.toFormat("t")}</a></li>
            `
    })}
        </ul>
      </div>
      
      ${st.users.map((x)=>{
      return w(x, ":debugging")`
      user ${x.name}: ${x.weekDays.map((y,i)=>{
        return w(y, ":sdf")`
        Status ${i}: ${y.status} <br/>
      ${new Intl.DateTimeFormat("en-US",DT.DATETIME_SHORT).format(new Date(x.times[i][0])).slice(2, -3)} --${new Intl.DateTimeFormat("en-US",DT.DATETIME_SHORT).format(new Date(x.times[i][1])).slice(2, -3)}<br/>
      ${new Intl.DateTimeFormat("en-US",DT.DATETIME_SHORT).format(new Date(st.times[i][0])).slice(2, -3)} --${new Intl.DateTimeFormat("en-US",DT.DATETIME_SHORT).format(new Date(st.times[i][1])).slice(2, -3)}<br/>
      break <br/>
`
      })}<br/>



        })
      `
      })
      }
  `
}
  }
