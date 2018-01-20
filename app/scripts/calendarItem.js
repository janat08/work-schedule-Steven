function calendarItem(u){ //user
  console.log("us", u)
  return w()`
             <tr>
             <td>
              ${u.name}
              </td>
            ${u.weekDays.map(x=>w(x, ":calendartd")`
              <td> ${x.status} </td>
            `
  )}
            
  </tr>
`
}
// <i class="fa fa-check fa-lg" aria-hidden="true"></i>
