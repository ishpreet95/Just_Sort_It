//-----------------------------PREPARATION------------------------------
let divs = document.getElementsByClassName("lightBar");
let theBody = document.querySelector(".lightBody");
let hOne= document.querySelector(".lightH1");
let box= document.querySelector(".lightBox");
let buttonBox=document.querySelector(".lightButtonBox");
let barChange='lightBarChange'
//------------------------------buttons---------------------------------
//bubble
let bubbleBtn = document.querySelector("#bubble");
bubbleBtn.onclick = bubbleSort;
//selection
let selectionBtn = document.querySelector("#selection");
selectionBtn.onclick = selectionSort;
//insertion
let insertionBtn = document.querySelector("#insertion");
insertionBtn.onclick = insertionSort;
//quicksort
let quicksortBtn = document.querySelector("#quicksort");
quicksortBtn.onclick = fullQuickSort;
//randomize button
let randomizeBtn = document.querySelector("#randomize");
randomizeBtn.onclick = randomize;
//theme button
let themeBtn= document.querySelector("#themeBtn");
themeBtn.onclick=themeChange;
// ----------------------------------------------------------------------
let values = [];
//GENERATING RANDOM VALUES AND SETTING UP BARS
function randomize() {
  for (let i = 0; i < 10; i++) {values[i] = Math.floor(Math.random() * 90 + 5);}
  //SETTING UP BARS FOR ACTION
  for (let i = 0; i < 10; i++) {
    divs[i].style.height = `${values[i]}%`;
    divs[i].innerText = `${values[i]}`;
    divs[i].classList.remove(barChange)
  }
}
//DELAYED COLOR CHANGE FUNCTION
let delayedColorChange = function(element,classChange,delay) {
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      element.classList.toggle(classChange);
      resolve();
    },delay)
  })
}
//THEME CHANGE FUNCTION
function themeChange()
{
  for(let j=0;j<10;j++){
    divs[j].classList.toggle('darkBar')
    divs[j].classList.remove('darkBarChange')
  }
  theBody.classList.toggle('darkBody')
  hOne.classList.toggle('darkH1')
  box.classList.toggle('darkBox')
  buttonBox.classList.toggle('darkButtonBox')
  bubbleBtn.classList.toggle('darkBubble')
  selectionBtn.classList.toggle('darkSelection')
  randomizeBtn.classList.toggle('darkRandomize')
  insertionBtn.classList.toggle('darkInsertion')
  quicksortBtn.classList.toggle('darkQuicksort')
  themeBtn.classList.toggle('darkTheme')
  if(themeBtn.innerText==='Light'){
    themeBtn.innerText='Dark'
    barChange='lightBarChange'
  }
  else{
    themeBtn.innerText='Light'
    barChange='darkBarChange'
  }
}
//-----------------------------SHOW STARTS----------------------------
randomize();
//BUBBLE SORT
async function bubbleSort() 
{
  for (let i = 0; i < 10-1; i++) 
  {
    for (let j = 0; j < 10-i-1; j++) 
    {
      if (values[j] > values[j+1]) 
      {
        //swapping values
        [values[j], values[j+1]] = [values[j+1], values[j]];

        divs[j].style.height = `${values[j]}%`;
        divs[j].innerText = `${values[j]}`;

        divs[j+1].style.height = `${values[j+1]}%`;
        divs[j+1].innerText = `${values[j+1]}`;
      }
    }
    await delayedColorChange(divs[9-i],barChange,600)
  }
  await delayedColorChange(divs[0],barChange,600)
}
//SELECTION SORT
async function selectionSort() 
{
  for (let i = 0; i < 9; i++) 
  {
    let mindex = i;
    for (let j = i + 1; j < 10; j++) 
    {
      if (values[j] < values[mindex]) 
      {
        mindex = j;
      }
    }
    [values[mindex], values[i]] = [values[i], values[mindex]];

    divs[mindex].style.height = `${values[mindex]}%`;
    divs[mindex].innerText = `${values[mindex]}`;

    divs[i].style.height = `${values[i]}%`;
    divs[i].innerText = `${values[i]}`;
    
    await delayedColorChange(divs[i],barChange,600)
  }
  await delayedColorChange(divs[9],barChange,600)
}
//INSERTION SORT
async function insertionSort() {
  let n = values.length;
  await delayedColorChange(divs[0],barChange,600)
    for (let i = 1; i < n; i++) {
        let current = values[i];
        let j = i-1; 
        while ((j > -1) && (current < values[j])) {
            values[j+1] = values[j];
            divs[j+1].style.height = `${values[j+1]}%`;
            divs[j+1].innerText = `${values[j+1]}`;
            j--;
        }
        values[j+1] = current;
        divs[j+1].style.height = `${values[j+1]}%`;
        divs[j+1].innerText = `${values[j+1]}`;
        await delayedColorChange(divs[i],barChange,600)
    }
}
//QUICKSORT
async function fullQuickSort() {
  let left=0;let right=0;
  function partition(left,right){
    let pivot=values[Math.floor((right+left)/2)];
    let i=left;
    let j=right;
    while(i<=j){
      while(values[i]<pivot){
        i++;
      }
      while(values[j]>pivot){
        j--;
      }
      if(i<=j){
        [values[i],values[j]]=[values[j],values[i]];
        divs[i].style.height = `${values[i]}%`;
        divs[i].innerText = `${values[i]}`;
        divs[j].style.height = `${values[j]}%`;
        divs[j].innerText = `${values[j]}`;
        i++;j--;
      }
    }
    // await delayedColorChange(divs[i],barChange,600) <- with this, the function works only once
    return i;
  }
  async function quickSort(left,right) {
    let index;
    if(values.length>1){
      index=partition(left,right);
      await delayedColorChange(divs[index],barChange,1000)
      if(left<index-1){
        quickSort(left,index-1);
      }
      if(index<right){
        quickSort(index,right);
      }
    }
  }
  await quickSort(0,9);
  // divs[0].classList.add(barChange);
  await delayedColorChange(divs[0],barChange,600)
}


