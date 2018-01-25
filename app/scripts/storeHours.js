class storeHours extends hyperElement{
  setup(n){
    var a = au(n(s))
    this.attrs.over24Hours = false
    var self = this

      // setInterval(n(), 1000);

    this.attrs.change24Hours = function (){
      self.attrs.over24Hours = !self.attrs.over24Hours
      return n().call()
    }
    return a
  }
  render(h, st){
var boilerplate = Array(24).fill(0,0,24).map((x,i)=>{if (i==0){return 12} else if (i>12){return i-12} else {return i}})

    function minutes(edge){
      return w()`
      <div style=${{width: 200}}>
      ${[0, 15, 30, 45].map((x, i) => {
          function pick() {
            return a.pick(st.initializedTimes[st.selectedDay][edge].set({minute: x}).ts, i, edge)
          }

          if (x == st.initializedTimes[st.selectedDay][edge].minute) {
            var style = {color: "red"}
          } else {
            if(edge){
              if (x < st.initializedTimes[st.selectedDay][1].minute) { //TODO end times are at 00, should be changed back
                var style = {color: "orange"}
              }
            } else {
              if (x > st.initializedTimes[st.selectedDay][0].minute) { //TODO end times are at 00, should be changed back
                var style = {color: "orange"}
              }
            }
          }


          return w()`
     <span style=${style}  class="time-selection__cell" onclick=${pick}>${x}</span>
      `
        })
          }`
    }

    function hours(edge, toggle){
      toggle = toggle? {days: 1}: undefined
      return w()`
      <div style=${{width: 200}}>
      ${boilerplate.map((x, i) => {
        function pick() {
          return a.pick(st.dayPeriods[st.selectedDay][edge].set({hours: i, ...toggle}).ts, i, edge)
        }

        var style = {}
        if (i == st.initializedTimes[st.selectedDay][0].hour || i == st.initializedTimes[st.selectedDay][1].hour) {
          var style = {color: "red"}
        } else if (i < st.initializedTimes[st.selectedDay][1].hour && i > st.initializedTimes[st.selectedDay][0].hour) { //TODO end times are at 00, should be changed back
          var style = {color: "orange"}
        }

        var br
        if ((i + 1) % 6 == 0) {
          br = ['<br/>']
        }

        return w()`
    <span onclick=${pick}  class="time-selection__cell" style=${style}>${x}</span> ${br}  
    `
      })
    }`
    }

  return h`
  <div class="hours">
    <h3>Store Hours</h3>
    <table class="table table-striped">
      <tr>
        <th>day</th>
        <th>deactivate</th>
        <th>slide</th>
      </tr>
  ${
  st.dayPeriods.map((item, i)=>{ //intentional periods
    function disable(){
      return a.toggleDisable(i)
    }
    function selectDay(){
      return a.selectDay(i)
    }
    return w(item, ":storeItem")`
          <tr>
      <td onclick=${selectDay} class=${`${i == st.selectedDay? "info" : ""}`}>
${st.calendarWeek[i].fullDay}<br/> ${st.storeHours[i][0]}-${st.storeHours[i][1]}</td>
<td onclick=${disable}> 
<i class="fa fa-times-circle fa-lg" aria-hidden="true" style=${{color: st.disabledDays[i] ? "red" : "grey"}}></i>
        </td>
      </tr>
    `
    })
    }
    </table>
    
    <h4>Pick Start</h4>
    <h5>Hours</h5>
    ${hours(0)}
    <h5>Minutes</h5>
    ${minutes(0)}
    <h4>Pick End</h4>
     ${hours(1)}
    <h5>Minutes</h5>
    ${minutes(1)}
      </div>

`
}}




// ${w( $(function(){$(".slider-range1"+i).slider({})}), "slider1"+i)`
// <input type="text" class=${"slider-range1"+i} value="" data-slider-min="10" data-slider-max="1000"
// data-slider-step="5" data-slider-value="[250,450]"/>
//   `}



// function makeSlider(i, item, st){
  // $(function() {
  //   $(".slider-range" + i).slider({
  //     range: true,
  //     min: (item[0]).ts,
  //     max: (item[1]).ts + 1,
  //     values: [st.times[i][0], st.times[i][1] + 1], //TODO access ts if actual dates (ts= miliseconds)
  //     step: s.conf.sI.as("milliseconds"),
  //     slide: function (event, ui) {
  //       var val = ui.values
  //       if (val[0] == item[0]) {
  //         s.times[i][1] = DT.fromJSDate(new Date(val[1]))
  //       } else {
  //         s.times[i][0] = DT.fromJSDate(new Date(val[0]))
  //       }
  //     },
  //     change: function (event, ui) {
  //       a.changeSlider(i)
  //     }
  //   });
  // })
// }

