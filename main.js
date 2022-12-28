const inputWord = 

document.getElementById('inputWord')

const searchWord_btn = 

document.getElementById('searchWord_btn')

const wrapper = 

document.querySelector('.wrapper')

const addNote_btn = 

document.getElementById('addNewWord_btn')

const word_input = 

document.querySelector('#word')

const meaning_input = 

document.querySelector('#meaning')

const add_word_btn =

document.querySelector('#add_word_btn')

const require_word = 

document.querySelector('#require_word')

const require_meaning = 

document.querySelector('#require_meaning')

const saved_words_counter = 

document.querySelector('#saved_words_counter')

const getWords = JSON.parse(localStorage.getItem('saved_words') || '[]')

function words_counter()

{

  if (getWords.length == 0) {

    saved_words_counter.innerHTML = 'No saved words, click the + button to add'

  } else {

    saved_words_counter.innerHTML = `${getWords.length} saved words`

  }

}

words_counter()

function NewWords(word,meaning)

{

  getWords.push({

    word : word, 

    meaning : meaning

  })

  

  localStorage.setItem('saved_words',JSON.stringify(getWords))

  words_counter()

}

function addWords()

{

 if (word_input.value == '' || word_input.value == ' ') {

   require_word.innerHTML = 'required'

   setTimeout(()=>{

  require_word.innerHTML = ''

   },1000)

 }else if (meaning_input.value == '' || meaning_input.value == ' '){

   require_meaning.innerHTML = 'required'

   setTimeout(()=>{

   require_meaning.innerHTML = ''

   },1000)

 }else {

   NewWords(word_input.value.trim().toLowerCase(),meaning_input.value)

   words_counter()

   ShowWords()

   document.querySelector('.add_words_container').classList.remove('hide')

       addNote_btn.innerHTML = 'note_add'

       word_input.value = ''

       meaning_input.value = ''

 }

 

 

}

add_word_btn.onclick = addWords

const words = []

const data_words = {

  word : '', 

  meaning : ''

}

 

function ShowWords()

{

  let count = 0

  let innerWords = ''

  for (var i = 0; i < getWords.length; i++) {

    count++

    let newCard = `

        <div class="card">

          <div class="word" data-anim=${count}>

            <h3>${getWords[i].word}</h3>

          </div>

          <div class="meaning" >

            <p data-anim=${count}>

              ${getWords[i].meaning}

            </p>

          </div>

          <div class="action_buttons">

        <button id='remove' class="material-symbols-outlined">

           remove

         </button>

          </div>

        </div>

    

    `

    innerWords += newCard

  }

  

  wrapper.innerHTML = innerWords

  

  

  

 

  

 const allRemoveBtn = 

 Array.from(document.querySelectorAll('#remove'))

 

  

  allRemoveBtn.forEach(remove =>{

    remove.addEventListener('click',function(){

      if (confirm('Remove saved word')) {

       getWords.splice(allRemoveBtn.indexOf(this),1)

       localStorage.setItem('saved_words',JSON.stringify(getWords))

       words_counter();

       ShowWords()

      } else {

        return ;

      }

      

      

    })

  })

  

  

  

  

  

  

}

ShowWords()

  

  

function searchWors()

{

  

  if (inputWord.value.length == 0 || inputWord.value == '') {

    ShowWords()

    words_counter()

  }else {

   saved_words_counter.innerHTML = ''

  }

  let html = ''

    

  for (let i = 0; i < getWords.length; i++) {

   if (getWords[i].word.includes(inputWord.value.trim().toLowerCase())) {

     

   let newHtml = ` 

             <div class="card">

          <div class="word">

            <h3>${getWords[i].word}</h3>

          </div>

          <div class="meaning">

            <p>

              ${getWords[i].meaning}

            </p>

          </div>

          <div class="action_buttons">

        <button id='remove' class="material-symbols-outlined">

           remove

         </button>

          </div>

        </div>

     `

    html += newHtml 

   }

   wrapper.innerHTML = html 

   const allRemoveBtn = 

 Array.from(document.querySelectorAll('#remove'))

 

  allRemoveBtn.forEach(remove =>{

    remove.addEventListener('click',function(){

      if (confirm('Remove saved word')) {

       getWords.splice(allRemoveBtn.indexOf(this),1)

       localStorage.setItem('saved_words',JSON.stringify(getWords))

       words_counter();

     ShowWords()

      } else {

        return ;

      }

      

      

    })

  })

  

   

  }

  

}

inputWord.addEventListener('keyup',searchWors )

//searchWord_btn.onclick = searchWors

addNote_btn.addEventListener('click',function(){

  document.querySelector('.add_words_container').classList.toggle('hide')

  if (document.querySelector('.add_words_container').classList.contains('hide')) {

    addNote_btn.innerHTML = 'close'

  } else {

    addNote_btn.innerHTML = 'note_add'

  }

})

