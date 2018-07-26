function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function firstFunction() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var realDatas = JSON.parse(xhttp.responseText);
  selectCharacters(realDatas);
  sortedCharacters(realDatas);
  showCharacters(realDatas);
  addSearching(realDatas);
  showDatasToUp();
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
function sortedCharacters(parameterArr) {
  for (var i = 0; i < parameterArr.length - 1; i++) {
    for (var j = i + 1; j < parameterArr.length; j++) {
      var compHouses = parameterArr[i].house.localeCompare(parameterArr[j].house);
      if (compHouses > 0) {
        [parameterArr[i], parameterArr[j]] = [parameterArr[j], parameterArr[i]];
      } else if (compHouses === 0) {
        var compName = parameterArr[i].name.localeCompare(parameterArr[j].name);
        if (compName > 0) {
          [parameterArr[i], parameterArr[j]] = [parameterArr[j], parameterArr[i]];
        }
      }
    }
  }
}

function showCharacters(parameterArr) {
  for (var i = 0; i < parameterArr.length; i++) {
    var characterDiv = document.createElement('div');
    var main = document.querySelector('.down');
    characterDiv.className = 'oneCharacter';
    var characterImage = document.createElement('img');
    characterImage.characterData = parameterArr[i];
    characterImage.className = 'big-image';
    characterImage.addEventListener('hover', function ev() {
      this.src = `/assets/${parameterArr.portrait}`;
      this.show;
    });
    var characterName = document.createElement('div');
    characterName.className = 'character-name';
    var icon = document.createElement('img');
    icon.addEventListener('error', function ev() {
      this.src = '/assets/houses/errorIcon.png';
    });
    var houseName = document.createElement('div');
    houseName.className = 'house-name';
    var bio = document.createElement('div');
    bio.className = 'bio';
    icon.src = `/assets/houses/${parameterArr[i].house}.png`;
    characterImage.src = `/${parameterArr[i].picture}`;
    characterName.innerHTML = parameterArr[i].name;
    houseName.innerHTML = parameterArr[i].house;
    bio.innerHTML = parameterArr[i].bio;
    characterDiv.appendChild(characterImage);
    characterDiv.appendChild(characterName);
    characterDiv.appendChild(icon);
    characterDiv.appendChild(houseName);
    characterDiv.appendChild(bio);
    main.appendChild(characterDiv);
  }
}

function addSearching(realDatas) {
  var button = document.querySelector('#search-button');
  var input = document.querySelector('#search-text');
  input.placeholder = 'Search for characters';
  button.addEventListener('click', function () {
    searching(input.value, realDatas);
    input.value = '';
  });
}

function searching(text, realDatas) {
  var found = false;
  var i = 0;
  while (!found && i < realDatas.length) {
    if (realDatas[i].name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
      found = true;
      showDatasToUp(realDatas[i]);
      return;
    }
    i++;
  }
  if (!found) {
    document.querySelector('.up').innerHTML = 'Character not found.';
  }
}

function showDatasToUp(ParameterObj) {
  var details = document.querySelector('.character-details');
  details.innerHTML = '';
  var nameOfCharacter = document.createElement('p');
  nameOfCharacter.className = 'up-name';
  var houseOfCharacter = document.createElement('p');
  houseOfCharacter.className = 'up-house';
  if (ParameterObj !== '') {
    var icon = document.createElement('img');
    icon.src = `/assets/houses/${ParameterObj.house}`;
    details.appendChild(icon);
  } else {
    icon.src = '/assets/houses/errorIcon.png';
  }
  nameOfCharacter.innerHTML = ParameterObj.name;
  houseOfCharacter.innerHTML = ParameterObj.house;
  details.appendChild(nameOfCharacter);
  details.appendChild(houseOfCharacter);
  details.appendChild(icon);
}
function mouseHover() {

}