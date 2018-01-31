
const {hyper, wire} = hyperHTML
const hyperhtml = hyperHTML,
w= wire

if(document.registerElement) {
reg =document.registerElement
} else {
reg = window.customElements.define
}
//Use @observer on all components that render @observables
//https://mobx.js.org/best/pitfalls.html
const root = {
  data: {},
   render() {
     return hyperHTML(document.getElementById('root'))`
      <div>
        <calendar-tag></calendar-tag>
        <store-hours></store-hours>
        <forms-tag></forms-tag>
      </div>
    `
   }
}

document.registerElement("calendar-tag", calendar)
document.registerElement("store-hours", storeHours)
document.registerElement("forms-tag", forms)


// ${storeHours()}
// ${forms()}

root.render()



// @observer class Timer extends React.Component {
//     render() {
//         return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
//     }
// };
// // React.render(<Timer timerData={timerData} />, document.body);


