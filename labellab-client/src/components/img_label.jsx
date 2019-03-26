import React, { Component } from "react"
import {connect} from "react-redux"
import {Input} from "semantic-ui-react"
import "./css/img_label.css"

class ImgLabel extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			image:'',
			file:''
		 }
	}
	componentDidMount(){
		// var canvas = document.getElementById('canvas');
		// var ctx = canvas.getContext('2d');
		// var imageObj = new Image();
		// var drag = false
		// imageObj.onload = function() {
		//   ctx.drawImage(imageObj, 69, 50);
		// };
		// imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
		initDraw(document.getElementById('canvas'))
		var numRect = 0
		var buttonTrigger = 0

		function initDraw(canvas) {
			function setMousePosition(e) {
				var ev = e || window.event; //Moz || IE
				if (ev.pageX) { //Moz
					mouse.x = ev.pageX + window.pageXOffset;
					mouse.y = ev.pageY + window.pageYOffset;
				} else if (ev.clientX) { //IE
					mouse.x = ev.clientX + document.body.scrollLeft;
					mouse.y = ev.clientY + document.body.scrollTop;
				}
			};
		
			var mouse = {
				x: 0,
				y: 0,
				startX: 0,
				startY: 0
			};
			var element = null;
			var field = null;
		
			canvas.onmousemove = function (e) {
				setMousePosition(e);
				if (element !== null) {
					element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
					element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
					element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
					element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
				}
			}


			function okClick(){
				let labelValue = document.getElementById('label'+numRect).value
				buttonTrigger++
				
			}
			function canClick(){
				console.log(numRect)
				document.getElementById('label-container'+numRect).remove()
				document.getElementById('rect'+numRect).remove()
				numRect = numRect - 1
				buttonTrigger++
			}
		
			canvas.onclick = function (e) {
				if(numRect > 0 && document.getElementById('label'+numRect).value === ''|| buttonTrigger === 1){
					if(buttonTrigger ===1){
						console.log("empty")
						buttonTrigger = buttonTrigger-1
					}
				}
				else{
					if (element !== null) {
						numRect = numRect+1
						console.log(mouse)
						let tmp_height = element.style.height
						let tmp_width = element.style.width
						element = null;
						canvas.style.cursor = "default";
						console.log("finsihed.");
						let contain = document.createElement('div')
						contain.className = 'label-container'
						contain.id = 'label-container'+numRect
						console.log( parseInt(tmp_width.substring(0,tmp_height.indexOf('p'))), )
						if (mouse.x > mouse.startX){
							contain.style.left = (mouse.startX + parseInt(tmp_width.substring(0,tmp_width.indexOf('p'))) + 5).toString() + 'px'
							contain.style.top = (mouse.startY + parseInt(tmp_height.substring(0,tmp_height.indexOf('p')))).toString() + 'px'
						}
						else{
							contain.style.left = (mouse.x + parseInt(tmp_width.substring(0,tmp_width.indexOf('p'))) + 5).toString() + 'px'
							contain.style.top = (mouse.y + parseInt(tmp_height.substring(0,tmp_height.indexOf('p')))).toString() + 'px'
						}
						canvas.appendChild(contain)
						field = document.createElement('input')
						field.className = 'label-input'
						field.id = 'label'+numRect
						contain.appendChild(field)
						let okButton = document.createElement('button')
						okButton.id = 'okButton'+numRect
						okButton.innerHTML = "OK"
						okButton.onclick = okClick
						contain.appendChild(okButton)
						let canButton = document.createElement('button')
						canButton.id = 'canButton'+numRect
						canButton.innerHTML = "DESELECT"
						canButton.onclick = canClick
						contain.appendChild(canButton)

					} else {
						console.log("begun.");
						mouse.startX = mouse.x;
						mouse.startY = mouse.y;
						element = document.createElement('div');
						element.className = 'rectangle'
						element.id = 'rect'+(numRect+1)
						element.style.left = mouse.x + 'px';
						element.style.top = mouse.y + 'px';
						canvas.appendChild(element)
						canvas.style.cursor = "crosshair";
					}
				}
			}
		}
		// var canvas = document.getElementById('myCanvas');
		// var ctx = canvas.getContext('2d');
		// var imageObj = new Image();
		// var drag = false
		// imageObj.onload = function() {
		//   ctx.drawImage(imageObj, 69, 50);
		// };
		// imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
  
		//   // ctx.globalAlpha = 0.5;
		//   canvas.addEventListener('mousedown', mouseDown, false);
		//   canvas.addEventListener('mouseup', mouseUp, false);
		//   canvas.addEventListener('mousemove', mouseMove, false);
		//   let {rect,rectStartXArray,rectStartYArray,rectWArray ,rectHArray } = this.state

		//   function mouseDown(e) {
		// 	rect.startX = e.pageX - this.offsetLeft;
		// 	rect.startY = e.pageY - this.offsetTop;
		// 	drag = true;
		// }
		// function mouseUp() {
		// 	console.log("varshney")
		// 	rectStartXArray[rectStartXArray.length] = rect.startX;
		// 	rectStartYArray[rectStartYArray.length] = rect.startY;
		// 	rectWArray[rectWArray.length] = rect.w;
		// 	rectHArray[rectHArray.length] = rect.h;
		// 	drag = false;
		// }
		
		// function mouseMove(e) {
		//   if (drag) {
		// 		rect.w = (e.pageX - this.offsetLeft) - rect.startX;
		// 		rect.h = (e.pageY - this.offsetTop) - rect.startY;
		// 		draw();
		// 	}
		
		// 	//drawOldShapes();
		// }
		// function draw() {
		// 	ctx.beginPath(); 
		// 	ctx.fillStyle="";
		// 	ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
		// 	ctx.stroke();
		// }
		// function drawOldShapes(){
		// 	for(var i=0;i<rectStartXArray.length;i++)
		// 	{
		// 		if(rectStartXArray[i]!= rect.startX && rectStartYArray[i] != rect.startY && rectWArray[i] != rect.w && rectHArray[i] != rect.h)
		// 		{
		// 			ctx.beginPath();
		// 			ctx.fillStyle="#FF0000";
		// 			ctx.fillRect(rectStartXArray[i], rectStartYArray[i], rectWArray[i], rectHArray[i]);
		// 			ctx.stroke();
		// 		}
		// 	}
		// }
	   
		   //drawOldShapes();
	   }





	handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            document.getElementById('file-name-display').innerHTML = "Filename : " + file.name
            this.setState({
                image: reader.result,
                file:file
			})
			// this.initDraw(reader.result)
		}		
        reader.readAsDataURL(file)
    }
	render() { 
		return ( 
			<div>
				{/* <Input onChange={this.handleImageChange} type="file" /> */}
				{/* <canvas id="myCanvas" width="500 " height="400"></canvas> */}
				<div id="canvas"></div>
			</div>
			
		)
	}
}
const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ImgLabel)