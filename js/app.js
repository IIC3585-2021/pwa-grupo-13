const APP_SERVER_KEY = "test"

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const askPermission = () => {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result)
    })
    if (permissionResult) {
      permissionResult.then(resolve, reject)
    }
  })
  .then((permissionResult) => {
    if (permissionResult !== 'granted') {
      throw new Error('Notification permission denied')
    }
  })
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js",{
        scope: "/"
      })
      .then(res => {
        console.log("service worker registered")
        askPermission().then(() => {
          const options = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(APP_SERVER_KEY)
          }
      })
      .catch(err => console.log("service worker not registered", err));
  });
})}

const container = document.querySelector(".container")
const navIconLi = document.getElementById("nav-icon-li")

navIconLi.innerHTML = `<img id="nav-icon" src="images/icons/icon-512x512.png" alt=""></img>`

const coffees = [
  { description: "El café es la bebida que se obtiene a partir de los granos tostados y molidos de los frutos de la planta del café (cafeto); es altamente estimulante por su contenido de cafeína,1​ una sustancia psicoactiva. Este producto es uno de los más comercializados del mundo y una de las tres bebidas1​ más consumidas del mundo (junto con el agua y el té). Suele tomarse durante el desayuno, después de éste o incluso como único desayuno, aunque también se suele tomar en la merienda, o después del almuerzo o cena para entablar conversaciones o solo por costumbre. Es una de las bebidas sin alcohol más socializadoras en muchos países. El gusto por el café no es espontáneo, sino que debe cultivarse, puesto que su sabor es fuerte y amargo.",
   image: "images/coffee.jpg"},
  { description: "La torre Eiffel​ (tour Eiffel, en francés), inicialmente llamada tour de 300 mètres (torre de 300 metros), es una estructura de hierro pudelado diseñada por los ingenieros Maurice Koechlin y Émile Nouguier, dotada de su aspecto definitivo por el arquitecto Stephen Sauvestre y construida por el ingeniero francés Alexandre Gustave Eiffel y sus colaboradores para la Exposición Universal de 1889 en París.\nSituada en el extremo del Campo de Marte a la orilla del río Sena, este monumento parisino, símbolo de Francia y de su capital, es la estructura más alta de la ciudad y el monumento que cobra entrada más visitado del mundo, con 7,1 millones de turistas cada año.​ Con una altura de 300 metros, prolongada más tarde con una antena hasta los 324 metros, la torre Eiffel fue la estructura más elevada del mundo durante 41 años.",
  image: "images/eiffel.jpg"},
  { description: "Star Wars, conocida también en español como La guerra de las galaxias, es una franquicia compuesta primordialmente de una serie de películas concebidas por el cineasta estadounidense George Lucas en la década de 1970, y producidas y distribuidas por The Walt Disney Company a partir de 2012. Su trama describe las vivencias de un grupo de personajes que habitan en una galaxia ficticia e interactúan con elementos como «la Fuerza», un campo de energía metafísico y omnipresente9​ que posee un «lado luminoso» impulsado por la sabiduría, la nobleza y la justicia y utilizado por Jedi, y un «lado oscuro» usado por los Sith y provocado por la ira, el miedo y el odio.",
   image: "images/starwars.jpg"},
  { description: "La enfermedad por coronavirus de 2019, más conocida como COVID-19 nota​ e incorrectamente llamada neumonía por coronavirus, es una enfermedad infecciosa causada por el SARS-CoV-2.\nProduce síntomas similares a los de la gripe o catarro, entre los que se incluyen fiebre, tos, disnea (dificultad respiratoria), mialgia (dolor muscular) ​y fatiga. En casos graves se caracteriza por producir neumonía, síndrome de dificultad respiratoria aguda, sepsis​ y choque séptico que conduce a cerca de 3,75 % de los infectados a la muerte según la OMS.​ No existe tratamiento específico; las medidas terapéuticas principales consisten en aliviar los síntomas y mantener las funciones vitales.",
   image: "images/covid.jpg"}
]

const showCoffees = () => {
    let output = ""
    coffees.forEach(
      ({image, description }) =>
        (output += `
                <div class="card">
                  <img class="card--avatar" src=${image} />
                  <p class="card--description">${description}</p>
                </div>
                `)
    )
    container.innerHTML = output
  }

document.addEventListener("DOMContentLoaded", showCoffees);

const notify = () => {
  let n = new Notification('Publicación compartida', {
    body: "Gracias PWA"
  })
}