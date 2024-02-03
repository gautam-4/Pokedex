async function fetchPokemon(){
    const pokemonNameInput = document.getElementById('pokemon').value.toString().toLowerCase();
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameInput}`);
        if(!response.ok){
            throw new Error("cannot fetch");
        }
        const responseJSON = await response.json();
        displayPokemon(responseJSON);
    }
    catch(error){
        console.error(error);
    }
}

function displayPokemon(responseJSON){
    const pokemonImage = responseJSON.sprites.front_default;
        const pokemonName = responseJSON.name.charAt(0).toUpperCase() + responseJSON.name.slice(1);
        const pokemonType = responseJSON.types[0].type.name.charAt(0).toUpperCase() + responseJSON.types[0].type.name.slice(1);
        const pokemonWeight = responseJSON.weight;
        const pokemonHeight = responseJSON.height;
        const pokemonAbilitites = responseJSON.abilities; 
        const imgTag = document.getElementById('pokeImg');
        imgTag.src = pokemonImage;
        imgTag.style.display = "block";
        document.getElementById('name').textContent = `Name: ${pokemonName}`;
        document.getElementById('type').textContent = `Type: ${pokemonType}`;
        document.getElementById('weight').textContent = `Weight: ${pokemonWeight} lbs`;
        document.getElementById('height').textContent = `Height: ${pokemonHeight} ft`;
        document.getElementById('abilities').textContent = `Abilities:`;
        const ul = document.createElement("ul")
        document.getElementById('abilities').append(ul);
        for(i of pokemonAbilitites){
            let li = document.createElement("li");
            li.textContent = `${i.ability.name.charAt(0).toUpperCase() +i.ability.name.slice(1)}`
            ul.append(li);
        }
        const card = document.getElementById('pokemonDetails');
        document.getElementById('pokeInfo').style.display = "block";
        card.style.display = "block";
}

document.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        fetchPokemon();
    }
})