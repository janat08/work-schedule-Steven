class calendar extends hyperElement{
  setup(n){
    var a = au(n(s))
    return a
  }
  previous(){
  return a.previous()
  }
  next (){
  return a.next()
  }

  // return autorun(()=>{return w()`

  render(h, st){

  return h`

        <div class="calendar container-fluid">
        <div class="month page-header calendar">
          <h3> Schedule</h3>
          <ul class="pager">
            <li onclick=${this.previous}>
              <a>Previous</a>
            </li>
            <span> ${st.calendarTitle}</span>
            <li onclick=${this.next}>
              <a >Next</a>
            </li>
          </ul>
        </div>
        <div class="calendar heading row">
          <ul class="nav nav-tabs nav-justified">
          ${st.weekPeriods.map((x, i) => {
    function switchWeek(){
      return a.switchWeek(i)
    }
    return w(x)`<li role="presentation" onclick=${switchWeek} class=${i == st.currentWeek ? "active" : ""}>
        <a >${"WEEK " + (i + 1)}</a>
        </li>`

  })
    }

        </div>
        <div class="calendar body">
          <table class="table table-striped">
            <tr>
              <th>
                Users
              </th>
              ${
                st.calendarWeek.map((x,i)=>{
                  function selectDay (){
                    return a.selectDay(i)
                  }
                  return w(x, ":cBody")`
                    <th class=${`${i==st.selectedDay?"info": (i >= st.badIndexes[0] && i <= st.badIndexes[1])? "warning": ""}`} onclick=${selectDay}>
                    ${x.date}<br/>
                    ${x.day}
                    </th>
                  `
                })
    }
            </tr>
            ${
              st.mapUsers.map((u,y)=>{
                function selectUser(){
                  return a.selectUser(y)
                }
                return w(u, "calendarUser"+u.name)`
                <tr>
<td class=${`${y==st.selectedUser?"info":""}`} onclick=${selectUser}>
              ${u.name}
              </td>
            ${st.users[y].weekDays.map((x,i)=>{
  if(st.disabledDays[i]){
    return w()`<td class="active"></td>`
  }
  function toggleDay(){
    return a.toggleDay(y, i)
  }
  return w(x, ":calendartd")`
    <td onclick=${toggleDay}> ${st.mapUsers[y].weekDays[i].status=="full"? ['<i class="fa fa-check fa-lg" style="color:green" aria-hidden="true"></i>'] :
    st.mapUsers[y].weekDays[i].status=="some"? ['<i class="fa fa-check fa-lg" style="color:orange" aria-hidden="true"></i>'] :""} </td>
            `
})
  }
            </tr>
                `
              })
    }
          </table>
        </div>
      </div>`
  // })
}}
