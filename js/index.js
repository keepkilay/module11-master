
// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('#colorSelect'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
var colorInputValue = colorInput.value

var sortValue = true


document.querySelector('.sort__kind').innerHTML = "boubleSort"
sortChangeButton.addEventListener('click',()=>{
  
  if(sortValue == false){
  document.querySelector('.sort__kind').innerHTML = "boubleSort"
  sortValue = true
}
else{
  document.querySelector('.sort__kind').innerHTML = "quickSort"
  sortValue = false
  
}
console.log(sortValue)
})
// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;



// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
let ahead = ['зеленый','желтый','светло-коричневый','розово-красный','фиолетовый'];

/*** ОТОБРАЖЕНИЕ ***/
let parent
// отрисовка карточек
let display = (arr) => {

  console.log(arr);
    let result = '';
    let i = 0;
    let length = arr.length;
    parent = document.querySelector('.fruits__list');
    parent.innerHTML = '';
  do {
    let li = document.createElement('li');
    switch (arr[i].color){
      case 'фиолетовый': li.className = 'fruit_item fruit_violet'; break;
      case 'зеленый': li.className = 'fruit_item fruit_green'; break;
      case 'розово-красный': li.className = 'fruit_item fruit_carmazin'; break;
      case 'желтый': li.className = 'fruit_item fruit_yellow'; break;
      case 'светло-коричневый': li.className = 'fruit_item fruit_lightbrown'; break;
    } 
    let liInner = document.createElement('div');
    liInner.className = 'fruit__info';


    let divIndex = document.createElement('div');
    divIndex.innerHTML = i;
    liInner.appendChild(divIndex);

    let divKind = document.createElement('div');
    divKind.innerHTML = arr[i].kind;
    liInner.appendChild(divKind);
  
    let divColor = document.createElement('div');
    divColor.innerHTML = arr[i].color;
    liInner.appendChild(divColor);
  
    let divWeight = document.createElement('div');
    divWeight.innerHTML = arr[i].weight;
    liInner.appendChild(divWeight);
  

    li.appendChild(liInner);

    parent.appendChild(li);
    i++;
    console.log(i);
  } while (i < length);
};

document.querySelector('#d_btn').addEventListener('click', function (){
  display(fruits);
})

/*** ПЕРЕМЕШИВАНИЕ ***/

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleBtn = document.querySelector('.shuffle_btn'); 
const shuffleFruits = () => {
  let result = [];
  let el = 0;
  while (fruits.length > 0) {
    iMinus = getRandomInt(0, fruits.length - 1);
    result[el] = fruits[iMinus];
    fruits.splice(iMinus, 1);
    el = el + 1;
  }

  fruits = result;
};

let oldResult = [];
shuffleButton.addEventListener('click', () => {
  oldResult = fruits;
  shuffleFruits(fruits);
  oldResult == fruits ? alert('Попробуйте еще раз') : display(fruits);
});


/*** ФИЛЬТРАЦИЯ ***/
const filterMin = document.querySelector('.minweight__input');
const filterMax = document.querySelector('.maxweight__input');

function filterFruits(result) {
  fruits = result.filter(item => ((item.weight >= filterMin.value) && (item.weight <= filterMax.value)))
};

filterButton.addEventListener('click', () => {
  filterFruits(fruits);
  display(fruits);
});


/*** СОРТИРОВКА ***/
const comparationColor = (a, b) => {
  return ahead.indexOf(a.color) > ahead.indexOf(b.color) ? true : false;
};

var date = new Date() 

function bubbleSort(){
  
    const startDate = date.getMilliseconds()
    let DateInterval
   
  console.log('Зашли в сортировку пузырьком');
  const x = fruits.length;
  for (let i = 0; i < x - 1; i++){
    for (let j = 0; j < x - 1 - i; j++){
      if (comparationColor(fruits[j], fruits[j + 1])) {
        let temp = fruits[j + 1];
        fruits[j + 1] = fruits[j];
        fruits[j] = temp;
      }
    }
  }
  
  const secondDate = new Date()
  const endDate = secondDate.getMilliseconds() 
  
  
  DateInterval = endDate - startDate
};

// алгоритм быстрой сортировки
function swap (firstIndex, secondIndex){
  const temp = fruits[firstIndex];
  fruits[fruitsIndex] = fruits[secondIndex];
  fruits[secondIndex] = temp;
};

//функция разделитель
function partition (left, right) {
  let pivot = fruits[Math.floor((right + left) / 2)];
  i1 = left;
  j1 = right;
  while (i1 <= j1){
    while (comparationColor(pivot, fruits[i1])) {
      i1++;
    }
    while (comparationColor(fruits[j1],pivot)) {
      j1--;
    }
    if (i1 <= j1) {
      swap(i1, j1);
      i1++;
      j1--;
    }
  }
  return i1;
};

//алгоритм быстрой сортировки
function quickSort(left, right) {
 
    let index;
    if (fruits.lenght > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? fruits.length - 1 : right;
      index = partition(left, right);
      if (left < index - 1) {
        quickSort(left, (index - 1));
      }
      if (index < right) {
        quickSort(index, right);
      }
    }
    
    return fruits;
  }


/*** ДОБАВИТЬ ФРУКТ ***/

sortActionButton.addEventListener('click', () => {
  const begin = new Date().getTime();
  let startDate = date.getMilliseconds()
  let DateInterval
  if(sortValue == true){
    bubbleSort()
  }
  else{
    quickSort()
  }

  const end = new Date().getTime();
 
  display(fruits);
  let secondDate = new Date()
  let endDate = secondDate.getMilliseconds()
  DateInterval = endDate - startDate
  document.querySelector('.sortTime').innerHTML = `<strong>${DateInterval}<strong>`
});



addActionButton.addEventListener('click', () => {
  //console.log(addActionButton);
 for(let i of fruits){
  console.log(i)
}
  if ((kindInput.value == '') || (weightInput.value == '')) {
    alert('Не достаточно данных');
  } else {
    let newFruti = {kind: kindInput.value, color: colorInputValue, weight: weightInput.value};
    fruits.push(newFruti)
  }
  
  display(fruits);
});


