function calendar(data) {

  //TODO s.currentWeek == to i+1 rather than 1
  return w(data, ":calendar")`
        <div class="calendar container-fluid">
        <div class="month page-header calendar">
          <h3> Schedule</h3>
          <ul class="pager">
            <li>
              <a href="#">Previous</a>
            </li>
            <span> ${s.calendarTitle}</span>
            <li>
              <a href="#">Next</a>
            </li>
          </ul>
        </div>
        <div class="calendar heading row">
          <ul class="nav nav-tabs nav-justified">
          ${s.weekPeriods.map((x, i) => {
    return w(x)`<li role="presentation" class=${i == s.currentWeek ? "active" : ""}>
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
                s.calendarWeek.map((x)=>{
                  return w(x, ":cBody")`
                    <th>
                    ${x.date}<br/>
                    ${x.day}
                    </th>
                  `
                })
    }
            </tr>
            ${
              s.users.map((x,i)=>{
                return w(x)`${calendarItem(x, i)}`
              })
    }
          </table>
        </div>
      </div>`
}
