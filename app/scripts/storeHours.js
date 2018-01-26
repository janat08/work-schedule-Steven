class storeHours extends hyperElement{
  setup(n){
    var a = au(n(s))

    return a
  }
  render(h, st){

  return h`
  <div class="hours">
    <h3>Store Hours</h3>
    <table class="table table-striped">
      <tr>
        <th>day</th>
        <th>deactivate</th>
        <th>times</th>
      </tr>
  ${
  st.dayPeriods.map((item, i)=>{ //intentional periods
    function disable(){
      return a.toggleDisable(i)
    }
    function selectDay(){
      return a.selectDay(i)
    }

    var boilerplate = luxon.Interval.fromDateTimes(st.dayPeriods[i][0], st.dayPeriods[i][1]).splitBy(st.conf.sI).map(x=>x.start)
      function dropDown(edge){

        // if (edge == 0){ //tried to remove from start dropdown times after selected end and the reverse, i imagine using autocomplete would be better
        //   var cut = boilerplate.findIndex((x)=>x==st.initializedTimes[i][1])
        //   var spliced = boilerplate.slice().splice(cut, boilerplate.length-cut+1)
        // } else {
        //   var cut = boilerplate.findIndex((x)=>x==st.initializedTimes[i][0])
        //   var spliced = boilerplate.slice().splice(0, cut)
        // }
        return w()`
      <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Hours Start
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
              ${boilerplate.map((y, z)=>{
                  function pick() {
                    return a.pick(y, i, edge)
                  }
                  return w(y, ":selectHours"+i+edge)`
                  <li onclick=${pick}><a>${y.toLocaleString(DT.TIME_SIMPLE)}</a></li>
                  `
              })
            }
              </ul>
              </div>
              `
      }

    return w(item, ":storeItem")`
          <tr>
      <td onclick=${selectDay} class=${`${i == st.selectedDay? "info" : ""}`}>
${st.calendarWeek[i].fullDay}<br/> ${st.storeHours[i][0]}-${st.storeHours[i][1]}</td>

<td onclick=${disable}> 
<i class="fa fa-times-circle fa-lg" aria-hidden="true" style=${{color: st.disabledDays[i] ? "red" : "grey"}}></i>
        </td>
        <td>
        ${dropDown(0)}
        ${dropDown(1)}
        </td>
      </tr>
    `
    })
    }
    </table>

`
}}

//for opening another hour picker for next days, requires support integration in
// this.attrs.over24Hours = false
// var self = this

//   // setInterval(n(), 1000);

// this.attrs.change24Hours = function (){
//   self.attrs.over24Hours = !self.attrs.over24Hours
//   return n().call()
// }


// pick: action((val, i, edge)=>{ //state is changed on input
//   s.times[s.selectedDay][edge] = val
// }),
    
// <h4>Pick Start</h4>
// <h5>Hours</h5>
// ${hours(0)}
// <h5>Minutes</h5>
// ${minutes(0)}
// <h4>Pick End</h4>
//  ${hours(1)}
// <h5>Minutes</h5>
// ${minutes(1)}
//   </div>

//   var boilerplate = Array(24).fill(0,0,24).map((x,i)=>{if (i==0){return 12} else if (i>12){return i-12} else {return i}})
//   function minutes(edge){
//     return w()`
//     <div style=${{width: 200}}>
//     ${[0, 15, 30, 45].map((x, i) => {
//         function pick() {
//           return a.pick(st.initializedTimes[st.selectedDay][edge].set({minute: x}).ts, i, edge)
//         }

//         if (x == st.initializedTimes[st.selectedDay][edge].minute) {
//           var style = {color: "red"}
//         } else {
//           if(edge){
//             if (x < st.initializedTimes[st.selectedDay][1].minute) { //TODO end times are at 00, should be changed back
//               var style = {color: "orange"}
//             }
//           } else {
//             if (x > st.initializedTimes[st.selectedDay][0].minute) { //TODO end times are at 00, should be changed back
//               var style = {color: "orange"}
//             }
//           }
//         }


//         return w()`
//    <span style=${style}  class="time-selection__cell" onclick=${pick}>${x}</span>
//     `
//       })
//         }`
//   }

//   function hours(edge, toggle){
//     toggle = toggle? {days: 1}: undefined
//     return w()`
//     <div style=${{width: 200}}>
//     ${boilerplate.map((x, i) => {
//       function pick() {
//         return a.pick(st.dayPeriods[st.selectedDay][edge].set({hours: i, ...toggle}).ts, i, edge)
//       }

//       var style = {}
//       if (i == st.initializedTimes[st.selectedDay][0].hour || i == st.initializedTimes[st.selectedDay][1].hour) {
//         var style = {color: "red"}
//       } else if (i < st.initializedTimes[st.selectedDay][1].hour && i > st.initializedTimes[st.selectedDay][0].hour) { //TODO end times are at 00, should be changed back
//         var style = {color: "orange"}
//       }

//       var br
//       if ((i + 1) % 6 == 0) {
//         br = ['<br/>']
//       }

//       return w()`
//   <span onclick=${pick}  class="time-selection__cell" style=${style}>${x}</span> ${br}  
//   `
//     })
//   }`
//   }