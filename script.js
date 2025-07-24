const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")
const creatureName = document.getElementById("creature-name")
const creatureID = document.getElementById("creature-id")
const weightEl = document.getElementById("weight")
const heightEl = document.getElementById("height")
const typesEl = document.getElementById("types")
const hpEL = document.getElementById("hp")
const attackeL = document.getElementById("attack")
const defenseEl = document.getElementById("defense")
const specialAttack = document.getElementById("special-attack")
const specialDefense = document.getElementById("special-defense")
const speedEl = document.getElementById("speed")
const specialEl = document.getElementById("special")
const loadEl = document.getElementById("loading")
const typeColors = {
  ice: "#A0E7E5",
  fairy: "#fbc4f4",
  fire: "#ff9a8b",
  water: "#8ecae6",
  grass: "#a8d5ba",
  electric: "#f9f871",
  ghost: "#cdb4db",
  dragon: "#b6ccfe",
  dark: "#6d6875",
  rock: "#d8a47f",
  psychic: "#ffc6ff",
  bug: "rgb(170, 187, 35)",
  poison: "rgb(198, 139, 183)",
  ground: "rgb(223, 186, 82)",
  flying: "rgb(136, 153, 255)",
  steel: "rgb(171, 170, 187)",
};




searchBtn.addEventListener("click", function () {
  loadEl.style.display = "block"
  getCreatureData()
    .then((data) => data.json())
    .then((data) => {

      creatureName.textContent = `${data.name}`
      creatureID.textContent = ` #${data.id}`
      weightEl.textContent = ` Weight: ${data.weight}`
      heightEl.textContent = ` Height: ${data.height}`
      typesEl.innerHTML=data.types.map(type=>`<span style="background-color: ${typeColors[type.name] || 'transparent'};">
       ${type.name}</span>`).join("")
      specialEl.innerHTML = `<span style="font-weight: bold; font-size: 14px; ">${data.special.name}</span>
      <p>${data.special.description}</p>`

      hpEL.textContent = data.stats[0].base_stat
      attackeL.textContent = data.stats[1].base_stat
      defenseEl.textContent = data.stats[2].base_stat
      specialAttack.textContent = data.stats[3].base_stat
      specialDefense.textContent = data.stats[4].base_stat
      speedEl.textContent = data.stats[5].base_stat
      // loadEl.style.display = "none"

    })
    .catch((erorr) => {
      if (erorr.message == "404") {
        // loadEl.style.display = "none"
        alert("Creature not found");
        clearCreatureData()
      }
    })
    .finally(()=>{
    loadEl.style.display="none"
    })
})

async function getCreatureData() {
  const input = searchInput.value.toLowerCase()
  let response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${input}`)
  if (!response.ok) {
    if (response.status =="404") {
      throw new Error("404")
    }
  }
  return response
}
function clearCreatureData() {
  creatureName.textContent = ""
  creatureID.textContent = ""
  weightEl.textContent = ""
  heightEl.textContent = ""
  typesEl.innerHTML = ``
  hpEL.textContent = ""
  attackeL.textContent = ""
  defenseEl.textContent = ""
  specialAttack.textContent = ""
  specialDefense.textContent = ""
  speedEl.textContent = ""
  specialEl.innerHTML = ""

}











