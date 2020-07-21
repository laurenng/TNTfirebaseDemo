import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
//hackerman

// part 2... get labels. follow this example https://bl.ocks.org/d3noob/8952219
// -Lauren 

interface BarProps{
    data: number[],
    size: number[],
}

class BarChart extends React.Component<BarProps> {
    
    constructor(props: BarProps){
       super(props)
       this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() { //these are lifecycle methods below:
       this.createBarChart()
    }
    
    componentDidUpdate() {
       this.createBarChart()
    }
    
    node: any;

    createBarChart() {
       const node = this.node
       const dataMax = max(this.props.data) 
       //console.log(dataMax);
       const yScale = scaleLinear()
          .domain([
              0, 
              dataMax as number
            ])
          .range([0, this.props.size[1]])
          
    select(node)
       .selectAll('rect')
       .data(this.props.data)
       .enter()
       .append('rect')
    
    select(node)
       .selectAll('rect')
       .data(this.props.data)
       .exit()
       .remove()
    
    select(node)
       .selectAll('rect')
       .data(this.props.data)
       .style('fill', '#fe9922')
       .attr('x', (d: any,i: number) => i * 25)
       .attr('y', (d: any) => this.props.size[1] - yScale(d))
       .attr('height', (d: any) => yScale(d))
       .attr('width', 25)
    }
 render() {
       return <svg ref={node => this.node = node}
       width={300} height={500}>
       </svg>
    }
 }
 export default BarChart