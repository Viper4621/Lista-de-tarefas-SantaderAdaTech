const form = document.querySelector('#todo-form')
const taskTitleInput = document.querySelector('#task-title-input')
const todoListUl = document.querySelector('#todo-list')

let tasks = [] 

function renderTaskOnHtml(taskTitle, done = false){
  //add nova tarefa no html
  const li = document.createElement('li')
   
  const input = document.createElement('input')
  input.setAttribute('type', 'checkbox') //troca de type input
  // bloco de codigo para deixar um style quando clicado nosso checkbox
  input.addEventListener('change', (event)=>{
   const liToToggle = event.target.parentElement

   const spanToToggle = liToToggle.querySelector('span')
   
   const done = event.target.checked

   if(done) {
     spanToToggle.style.textDecoration = 'line-through'
   } else {
       spanToToggle.style.textDecoration = 'none' 
   }
     //map usa para criar o mesma estrutura do array mas só alterar algo no map temos que criar um return de como vai ficar em estrutura de array

     //criamos o map para percorrer o array e procurar o titulo da tarefa que seja igual ao que selecionamos e quando achar trocar o boleano as demais ficam inalteradas

     //o map retorna um array novo com as alterações então temos que atribuir ao array tasks essa nova mudança
       tasks = tasks.map(t =>{
       if(t.title === spanToToggle.textContent) {
           return{
               title: t.title,
               done: !t.done,
           }
       }

       return t 
    })
    
    localStorage.setItem('tasks', JSON.stringify(tasks))

  })

  input.checked = done
  
  //tivemos que alterar colocando um if abaixo da criação do span para caso ele estiver marcado vir o style e colocamos o input checked acima = done para criar a logica abaixo que se estiver done dar o style
  const span = document.createElement('span')
  span.textContent = taskTitle
  if(done){
    span.style.textDecoration = 'line-through'
  }

  const button = document.createElement('button')
  button.textContent ='Remover'
  //quando botão for clicado pegar o elemento que disparou o evento
  //e remover do nosso array de objetos o pai dele nosso ul
  button.addEventListener('click', (event)=>{
   //vamos salvar nosso evento com target para pegar o pai em uma variavel para poder pegar o titulo dela e conseguir tirar do array
   const liToRemove = event.target.parentElement
   
   //aqui vamos criar uma const para selecionar da li que vamos remover o conteudo do titulo
   const titleToRemove = liToRemove.querySelector('span').textContent
   //para aqui conseguir filtrar percorendo nosso array que vai ver todos os titulos da lista para pegar quem tem o titulo diferente
   //do titulo que precisa ser removido
   //a ideia do filter vai ver quem não tem msm nome e deixar no array final filtrando e tirando quem desejamos remover
   tasks = tasks.filter(t => t.title !== titleToRemove)
   
   todoListUl.removeChild(liToRemove)

   localStorage.setItem('tasks', JSON.stringify(tasks))
  })
  //agora colocamos os 3 elementos dinamicos em nossa li
  li.appendChild(input)
  li.appendChild(span)
  li.appendChild(button)
  //que ira ser inclusa dentro da ul id='todo-list' como filho
  todoListUl.appendChild(li)
  //adicionando abaixo para limpar o input ao enviar
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem('tasks')
  
  if(!tasksOnLocalStorage) return
  //aqui abaixo pega string e converte para objeto vai pegar nossos textos e transformar em um array de objeto
  //ja joga no array de tasks para pegar do conteudo do local storage
  tasks = JSON.parse(tasksOnLocalStorage);
  //agora criamos o foreach para chamar função que renderiza no html e percorrer cada tarefa 
  //com a função abaixo ele ira acessar o local storage acima e mostrar 1 a 1 que esta no local storage 
  tasks.forEach(t => { 
    renderTaskOnHtml(t.title, t.done)
  })
}

form.addEventListener('submit', (evento)=>{
  evento.preventDefault();

  const taskTitle = taskTitleInput.value
  
  if(taskTitle.length <3){
    alert('Sua tarefa precisa ter pelo menos 3 caracteres')
    return;
  }
   //add nova tarefa no array de tasks 
   //modificamos nosso array para uma lista de objetos
   tasks.push({
    title: taskTitle,
    done: false,
   })
   //quando salvamos no local storage temos que usar um JSON.stringfy
   localStorage.setItem('tasks', JSON.stringify(tasks))

   renderTaskOnHtml(taskTitle);
   
   
   taskTitleInput.value = ''
})