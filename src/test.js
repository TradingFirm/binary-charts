import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import BinaryChart from './BinaryChart';

const randomNum = () => Math.floor(Math.random() * (20 - 10) + 10);
const seqDate = () => new Date().getTime() / 1000;
const testData = [];


class TestContainer extends Component {

     constructor(props) {
         super(props);
         this.state = {
             ticks: testData.map(x => ({ epoch: x[0], quote: x[1] }))
         }
     }

     componentDidMount() {
         setInterval(() => {
             const { ticks } = this.state;
             const newTick = { epoch: new Date().getTime() / 1000, quote: randomNum() };
             this.setState({
                 ticks: ticks.concat([newTick])
             })
         }, 1000);
     }

     render() {
         const { ticks } = this.state;
         const contract = {
             contract_type: 'UPORDOWN',
             barrier: 15,
             barrier2: 17,
         };

         const trade = {
             type: 'CALL',
             barrier: 15,
         }

         return (
             <div>
                 <h1>Empty</h1>
                 <BinaryChart />
                 <h1>Ticks</h1>
                 <BinaryChart ticks={ticks} />
                 <h1>Trade</h1>
                 <BinaryChart ticks={ticks} trade={trade} />
                 <h1>Contract</h1>
                 <BinaryChart ticks={ticks} contract={contract} />
             </div>
         );
     }
 }

 ReactDOM.render(<TestContainer />, document.getElementById('trade-chart'));
