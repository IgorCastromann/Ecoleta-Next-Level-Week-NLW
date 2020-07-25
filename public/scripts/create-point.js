function populateUFs(){
    const ufselect = document.querySelector("select[name=uf]")


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {

        for( const state of states ){
            ufselect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`

        }

    })
}

populateUFs()


function getcities(event){
    const cityselect = document.querySelector("select[name=city]")
    const stateinput = document.querySelector("input[name=state]")

    const ufvalue = event.target.value

    const indexofselectedstate = event.target.seletedIndex
    // DESCOBRIR O PQ DE NAO ESTAR FUNCIONANDO
     //stateinput.value = event.target.options[indexofselectedstate].text
  
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`
   
    cityselect.innerHTML = "<option value>Selecione a cidade</option>"
    cityselect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then( cities => {
        for( const city of cities ){
            cityselect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`

        }

        cityselect.disabled = false
    })


}




document
    .querySelector("select[name=uf]")
    .addEventListener("change",getcities )
     

    //Itens de coleta

    const itemstocollect = document.querySelectorAll(".items-grid li")

    for (const item of itemstocollect){
        item.addEventListener("click", handleSelectedItem)
    }

    const collecteditems = document.querySelector("input[name=items]")

    let selecteditems = []

    function handleSelectedItem(event){
        const itemLi = event.target

  

        //adicionar ou remover uma classe com js
        itemLi.classList.toggle("selected")


        const itemid = itemLi.dataset.id

     

        const alreadyselected = selecteditems.findIndex(item => {
            const itemfound = item == itemid
            return itemfound
        })

        if(alreadyselected >= 0){
            const filtereditems = selecteditems.filter(item =>{
                const itemisdifferent = item != itemid
                return itemisdifferent
            })

            selecteditems = filtereditems
        }else{
            selecteditems.push(itemid)
        }

 


        collecteditems.value = selecteditems

    }