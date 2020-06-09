//barras de seleção localidade
function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]')
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => {return res.json()})
    .then((states) => {
       for (const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
       }
        
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    const Ufvalue = event.target.value

    indexOfselectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfselectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${Ufvalue}/municipios`
    
    citySelect.disabled = true
    citySelect.innerHTML = `<option value>Selecione a cidade</option>`

    fetch(url)
    .then((res) => {return res.json()})
    .then((cities) => {

       for (const city of cities){
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
       }
       citySelect.disabled = false
        
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)





//lógica items de coleta

const colected_items = document.querySelector('input[name=items]') //pegando o input escondido vazio

let selected_items = []

const items_to_colect = document.querySelectorAll('.items-grid li') //pegando os itens

for (const item of items_to_colect)
{
    item.addEventListener('click', handleSelectedItem)
}

function handleSelectedItem(event)
{
    const item = event.target

    item.classList.toggle('selected')

    const item_id = item.dataset.id

    console.log(item_id)

    // verificando se há itens selecionados, se sim, pegar eles

    const already_selected = selected_items.findIndex((item) => {
        const item_founded = item == item_id
        return item_founded
    })

    //se já tiver, tirar da seleção
    if(already_selected != -1)
    {
        const filtered_items = selected_items.filter(item => {
           const item_different = item != item_id
           return item_different
        })

        selected_items = filtered_items
    }
    //se não tiver, add a seleção
    else
    {
        selected_items.push(item_id)
    }
   
    console.log(selected_items)

    //atualizar o campo escondido com os dados selecionados
    colected_items.value = selected_items
}
