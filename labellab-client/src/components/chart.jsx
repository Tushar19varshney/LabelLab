import React, {Component} from 'react';
import {Bar, Line, Pie} from "react-chartjs-2";

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart" style={{
          height:'50vh',
          width:'60vw',
          margin:'20px'
      }}>
        <Bar
          data={this.state.chartData}
          options={{
            title:{
                display:this.props.displayTitle,
                text:'Project Name',
                fontSize:25
              },
          }}
        />
      </div>
    )
  }
}

export default Chart;