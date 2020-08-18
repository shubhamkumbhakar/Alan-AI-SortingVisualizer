export function getSelectionSortAnimations(array){
  const animations = [];
  if(array.length<=1) return array; 
  for (let i = 0; i < array.length-1; i++)  
    {  
        let min_idx = i;  
        for (let j = i+1; j < array.length; j++) { 
        animations.push([i,j])
        animations.push([i,j])
        if (array[j] < array[min_idx]){  
            animations.push([i,j,array[j],array[min_idx]])
            min_idx = j;  
          }
        else{
            animations.push([i,j,array[min_idx],array[j]])
          }
        }
        let temp = array[i];
        array[i] = array[min_idx];
        array[min_idx] = temp;
    }
  return animations;

}





export function getBubbleSortAnimations(array){
  const animations =[];
  if(array.length <=1) return array;
  for(let j=0;j<array.length-1;j++){
  for(let i=0;i<array.length-1-j;i++){
    animations.push([i,i+1])
    animations.push([i,i+1])
    if(array[i]<=array[i+1]){
      animations.push([i,i+1,array[i],array[i+1]])
      
    }
    else{
      animations.push([i,i+1,array[i+1],array[i]])
      
      array[i]= array[i]+array[i+1]
      array[i+1]=array[i]-array[i+1]
      array[i]=array[i]-array[i+1]
    }
   }   
  }
  return animations;
}


export function getInsertionSortAnimations(array){
    const animations = [];
    for(let i=1;i<array.length;i++){
      let value = array[i];
      let hole = i;
      while(hole>0 && array[hole-1]>value){
        animations.push([hole,hole-1])
        animations.push([hole,hole-1])
          animations.push([hole-1,hole,array[hole],array[hole-1]])
          let temp= array[hole]
          array[hole]=array[hole-1];
          array[hole-1]=temp
        hole--;
      }
      array[hole]=value;
    }
    return animations;

}


export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }