
function calendarItem(u, i){ //user
  function selectUser(){
    return a.selectUser(i)
  }
  return w()`
             <tr>
             
          </tr>
`

}

// <i class="fa fa-check fa-lg" aria-hidden="true"></i>


// <td class=${`${i==s.selectedUser?"info":""}`} onclick=${selectUser}>
//               ${u.name}
//               </td>
//             ${u.weekDays.map((x,i)=>{
//   if(s.disabledDays[i]){
//     return w()`<td class="active"></td>`
//   }
//   function toggleDay(){
//     return a.toggleDay(u, i)
//   }
//   return w(x, ":calendartd")`
//     <td onclick=${toggleDay}> ${x.status=="full"? ['<i class="fa fa-check fa-lg" style="color:green" aria-hidden="true"></i>'] :
//     x.status=="some"? ['<i class="fa fa-check fa-lg" style="color:orange" aria-hidden="true"></i>'] :""} </td>
//             `
// })
//   }
