// // var search_terms = ['apple', 'apple watch', 'apple macbook', 'apple macbook pro', 'iphone', 'iphone 12'];

// // function autocompleteMatch(input) {
// //   if (input == '') {
// //     return [];
// //   }
// //   var reg = new RegExp(input)
// //   return data.filter(function(term) {
// // 	  if (term.match(reg)) {
// //   	  return term;
// // 	  }
// //   });
// // }

// // function showResults(data) {
// //   res = document.getElementById("result");
// //   res.innerHTML = '';
// //   let list = '';
// //   let terms = autocompleteMatch(data);
// //   for (i=0; i<terms.length; i++) {
// //     list += '<li>' + terms[i] + '</li>';
// //   }
// //   res.innerHTML = '<ul>' + list + '</ul>';
// // }

// let name = ''

//     fetch("https://programming-quotes-api.herokuapp.com/authors/Jeff%20Hammerbacher")
//       .then((res) => res.json())
//       .then((data) => {
//       name =  data.name
//       });

// function showResults(){
//     const inputValue = document.getElementById("search").value
//     if(inputValue == 'j' || inputValue == 'J'){
//         console.log(name)
//     }
//     else{
//         if(inputValue !== "j" && inputValue !== "")
//         console.log('type J LMAO')
//     }
    
// }

fetch("https://programming-quotes-api.herokuapp.com/authors")
      .then((res) => res.json())
      .then((data) => { 
        for(let i=0; i<Object.keys(data).length; i++ ){
            console.log(Object.keys(data)[i])
        }
      });

function showResults(){
    console.log('j')
}