
const {hyper, wire} = hyperHTML
const hyperhtml = hyperHTML,
w= wire

//Use @observer on all components that render @observables
//https://mobx.js.org/best/pitfalls.html
function root() {
    hyperHTML(document.getElementById('root'))`
      <div>
        ${calendar()}
        ${storeHours()}
        ${forms()}
      </div>
    `
  }


  autorun(()=>root(Store))
  // wa(tick(timerData))
  // setInterval(tick, 1000,
  //   hyperHTML(document.getElementById('root'))
  // );
  // hyperHTML(document.getElementById('root'))


// @observer class Timer extends React.Component {
//     render() {
//         return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
//     }
// };
// // React.render(<Timer timerData={timerData} />, document.body);


