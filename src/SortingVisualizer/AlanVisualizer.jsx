import React, {Component} from 'react'
import {getBubbleSortAnimations, getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './AlanVisualizer.css';
import alanBtn from '@alan-ai/alan-sdk-web'

//let vw = document.documentElement.clientWidth;
let ANIMATION_SPEED_MS = 4;
//const JUDGE_COLOR = 'lightgreen';
const PRIMARY_COLOR = 'lightblue';
const SECONDARY_COLOR = 'blue';
//const abc = 'green';



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
        //console.log(ANIMATION_SPEED_MS)
        //console.log(this.state.array)
        alanBtn({
            key: alanKey,
            onCommand: ({command}) =>{
                if(command === 'generatenewarray'){
                    this.resetArray();
                    //alert('Bubble sorting the array')
                }
                else if(command === 'mergesortarray'){
                    this.mergeSort();
                    //alert('Merge sorting the array')
                }
                else if(command === 'bubblesortarray'){
                  this.bubbleSort();
                  //alert('Merge sorting the array')
                }
                else if(command === 'selectionsortarray'){
                  this.selectionSort();
                  //alert('Merge sorting the array')
                }
            }
        })
    }
    

    updateSpeed(){
      let speed = document.getElementById("aSpeedController");
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
        //console.log(NUMBER_OF_ARRAY_BARS);
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
          array.push(randomIntFromInterval(5, 400));
        }
        this.setState({array});
      }


    // selectionSort() {
    //   const ssanimations = getSelectionSortAnimations(this.state.array);
    //   //alert('ssanimations')
    //   this.animate(ssanimations);
    // }



    bubbleSort() {
         const bsanimations = getBubbleSortAnimations(this.state.array);
         //console.log(bsanimations)
         this.animate(bsanimations);
         //console.log(animations)
         
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
        //console.log(animations)
        
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
    
      // testSortingAlgorithms() {
      //   for (let i = 0; i < 100; i++) {
      //     const array = [];
      //     const length = randomIntFromInterval(1, 100);
      //     for (let i = 0; i < length; i++) {
      //       array.push(randomIntFromInterval(-100, 100));
      //     }
      //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      //     const mergeSortedArray = getMergeSortAnimations(array.slice());
      //     console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
      //   }
      // }





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
              height: `403px`,
            }}></div>
        </div>
        <div>
        <label for="speed">Animation Speed:</label>
        <select name="speed" id="aSpeedController" onChange={()=>this.updateSpeed()}>
        <option value="inst">Instant</option>
        <option value="fast">Fast</option>
        <option value="modr" selected>Moderate</option>
        <option value="slow">Slow</option>
        <option value="vslow">Very Slow</option>
        </select>
       
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        {/* <button onClick={() => this.selectionSort()}>Selection Sort</button> */}
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
         
        {/*<button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button> */}
        </div>
      </div>
    )}
}


function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
// function arraysAreEqual(arrayOne, arrayTwo) {
//     if (arrayOne.length !== arrayTwo.length) return false;
//     for (let i = 0; i < arrayOne.length; i++) {
//       if (arrayOne[i] !== arrayTwo[i]) {
//         return false;
//       }
//     }
//     return true;
// }

export default AlanVisualizer
