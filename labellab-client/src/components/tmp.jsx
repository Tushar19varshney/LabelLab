import React, { Component } from "react";
import Chart from "./chart"
class Tmp extends Component {
	constructor(){
		super()
        this.state = {
			chartData:{}
		}
	}
    
	componentWillMount(){
		this.getChartData()
      }
	getChartData(){
		// Ajax calls here
		this.setState({
			chartData:{
				labels: ["Image1", "Image2", "Image3", "Image4", "Image5", "Image6", "Image7","Image8", "Image9", "Image10", "Image11", "Image12", "Image13", "Image14"],
				datasets:[
					{
						label:"Number of objects",
						data:[
							4,
							6,
							3,
							2,
							1,
                            5,
                            4,
                            4,
							6,
							3,
							2,
							1,
                            5,
                            4,
						],
						backgroundColor:[
							"rgba(255, 99, 132, 0.6)",
							"rgba(54, 162, 235, 0.6)",
							"rgba(255, 206, 86, 0.6)",
							"rgba(75, 192, 192, 0.6)",
							"rgba(153, 102, 255, 0.6)",
							"rgba(255, 159, 64, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(255, 99, 110, 0.6)",
							"rgba(54, 150, 200, 0.6)",
							"rgba(255, 150, 255, 0.6)",
							"rgba(75, 255, 255, 0.6)",
							"rgba(255, 102, 255, 0.6)",
							"rgba(255, 50, 200, 0.6)",
							"rgba(255, 255, 132, 0.6)"
						]
					}
				]
			}
		})
      }
	render() { 
		return ( 
			<div>
				<Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
			</div>
		)
    }
}
 
export default Tmp