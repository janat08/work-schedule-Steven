
const {hyper, wire} = hyperHTML
const hyperhtml = hyperHTML,
w= wire

function root() {
    hyperHTML(document.getElementById('root'))`
      <div>
        ${calendar()}
        ${storeHours()}
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


