import React, {Component} from 'react'
import {getSelectionSortAnimations, getBubbleSortAnimations, getInsertionSortAnimations, getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './AlanVisualizer.css';
import alanBtn from '@alan-ai/alan-sdk-web'


let ANIMATION_SPEED_MS = 4;

const PRIMARY_COLOR = 'lightblue';
const SECONDARY_COLOR = 'blue';




const alanKey = '9f9f72618c488deabcd416fd731d39162e956eca572e1d8b807a3e2338fdd0dc/stage';

class AlanVisualizer extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             array: [],
        };
    }
    
    
    componentDidMount(){
        this.resetArray();
        alanBtn({
            key: alanKey,
            onCommand: ({command}) =>{
                if(command === 'generatenewarray'){
                    this.resetArray();
                }
                else if(command === 'mergesortarray'){
                    this.mergeSort();
                }
                else if(command === 'bubblesortarray'){
                  this.bubbleSort();
                }
                else if(command === 'selectionsortarray'){
                  this.selectionSort();
                }
                else if(command === 'insertionsortarray'){
                  this.insertionSort();
                }
            }
        })
    }
    

    updateSpeed(){
      let speed = document.getElementById("aspeed");
      if(speed.value === "inst"){
        ANIMATION_SPEED_MS = 0
      }
      if(speed.value === "fast"){
        ANIMATION_SPEED_MS = 1
      }
      if(speed.value === "modr"){
        ANIMATION_SPEED_MS = 4
      }
      if(speed.value === "slow"){
        ANIMATION_SPEED_MS = 50
      }
      if(speed.value === "vslow"){
        ANIMATION_SPEED_MS = 800
      }
    }


 

    resetArray() {
        const array = [];
        let NUMBER_OF_ARRAY_BARS = Math.floor((document.documentElement.clientWidth)/24)+2;
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
          array.push(randomIntFromInterval(5, 340));
        }
        this.setState({array});
      }


    selectionSort() {
      const animations = getSelectionSortAnimations(this.state.array);
      this.animate(animations);
    }



    bubbleSort() {
         const animations = getBubbleSortAnimations(this.state.array);
         this.animate(animations);
    }

    insertionSort(){
      const animations = getInsertionSortAnimations(this.state.array);
      this.animate(animations);
      
    }
    

    animate(animations){
      for( let i=0; i<animations.length;i++){
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, barTwoIdx, shortHeight, tallHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${shortHeight}px`;
            barTwoStyle.height = `${tallHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
       }
    }



    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }

      }
    





    render(){
        const {array} = this.state;
    return (
        <div>
        
        <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <div className="array-bar" style={{
              backgroundColor: PRIMARY_COLOR,
              height: `343px`,
            }}></div>
        </div>
        
        <div>
        <select name="speed" id="aspeed" onChange={()=>this.updateSpeed()}>
        <option value="inst">Instant</option>
        <option value="fast">Fast</option>
        <option value="modr" selected>Moderate</option>
        <option value="slow">Slow</option>
        <option value="vslow">Very Slow</option>
        </select>
        
        <button id="gbtn" className="btn1" onClick={() => this.resetArray()}>Generate New Array</button>
        <button className="btn1" onClick={() => this.selectionSort()}>Selection Sort</button>
        <button className="btn1" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button className="btn1" onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button className="btn1" onClick={() => this.mergeSort()}>Merge Sort</button>
        
        </div>
        <br/>
        <p><b>Help: </b>After tapping the mic button, Say Hi to Alan and Speak up the text witten on the buttons.</p>
        {/*<button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button> */}
        
      </div>
    )}
}


function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  

export default AlanVisualizer
