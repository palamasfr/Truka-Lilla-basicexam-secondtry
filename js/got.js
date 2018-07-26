function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText);
  var realDatas = userDatas[2].data;
  selectCharacters(realDatas);
  console.log(realDatas);
  /*
    Pár sorral lejebb majd ezt olvashatod:
    IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

    Na azokat a függvényeket ITT HÍVD MEG! 

    A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
    Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
  */
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function selectCharacters(parameterArr) {
  for (var i = 0; i < parameterArr.length; i++) {
    if (parameterArr.house === '' || parameterArr.organization === '') {
      parameterArr.splice(i, 1);
      i--;
    }
  }
}
function showCharacters(parameterArr) {
  for (var i = 0; i < ParameterArr.length; i++) {
    var characterDiv = document.createElement('div');
    characterDiv.className = 'oneCharacter';
    var characterImage = document.createElement('img');
    var characterName = document.createElement('p');
    var main = document.querySelector('.left');
    var icon = document.createElement('img');
    icon.src = `/assets/houses/${ParameterObj.house}.png`;
    characterImage.src = `/${ParameterArr[i].portrait}`;
    characterName.innerHTML = ParameterArr[i].name;
    characterDiv.appendChild(characterImage);
    characterDiv.appendChild(characterName);
    main.appendChild(characterDiv);
  }
}
