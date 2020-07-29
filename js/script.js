/**
 * API REQUEST:
 * 12 users
 * image
 * first & last name
 * email
 * city/location
 * cell num
 * detailed address (street name & num, state or country, zip)
 * bday
 */
let userArray = [];

fetch(
  "https://randomuser.me/api/?results=12&nat=us&exc=gender,login,registered,phone"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    //printCards(data.results);
    data.results.forEach((each) => userArray.push(each));
    printCards(userArray);
  });

console.log(userArray);

/**
  * DISPLAY ON PAGE:
  * <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">first last</h3>
                        <p class="card-text">email</p>
                        <p class="card-text cap">city, state</p>
                    </div>
                </div>
  */

function printCards(users) {
  const gallery = document.getElementById("gallery");
  users.map((user) => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.id = `${user.id.value}`;
    let imgDiv = document.createElement("div");
    imgDiv.className = "card-img";
    let img = document.createElement("img");
    img.src = `${user.picture.large}`;
    img.className = "card-img";
    img.alt = "profile picture";
    imgDiv.appendChild(img);
    cardDiv.appendChild(imgDiv);
    let infoDiv = document.createElement("div");
    infoDiv.className = "card-info-container";
    let name = document.createElement("h3");
    name.id = "name";
    name.className = "card-name cap";
    name.textContent = `${user.name.first} ${user.name.last}`;
    infoDiv.appendChild(name);
    let email = document.createElement("p");
    email.className = "card-text";
    email.textContent = `${user.email}`;
    infoDiv.appendChild(email);
    let locDiv = document.createElement("p");
    locDiv.className = "card-text cap";
    locDiv.textContent = `${user.location.city}, ${user.location.state}`;
    infoDiv.appendChild(locDiv);
    cardDiv.appendChild(infoDiv);
    gallery.appendChild(cardDiv);
    cardDiv.addEventListener("click", (e) => {
      let userId = e.currentTarget.id;
      createModal(userId);
    });
  });
}

/**
   * MODAL WINDOW:
   *  <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>
     
   */

function createModal(userId) {
  let matchedUser = userArray.find((user) => {
    return user.id.value === userId;
  });

  let modConDiv = document.createElement("div");
  modConDiv.className = "modal-container";

  let modDiv = document.createElement("div");
  modDiv.className = "modal";
  modConDiv.appendChild(modDiv);

  let xButton = document.createElement("button");
  xButton.type = "button";
  xButton.id = "modal-close-btn";
  xButton.className = "modal-close-btn";
  xButton.textContent = "X";
  modDiv.appendChild(xButton);

  let modInfo = document.createElement("div");
  modInfo.className = "modal-info-container";
  modDiv.appendChild(modInfo);

  let modImg = document.createElement("img");
  modImg.className = "modal-img";
  modImg.src = `${matchedUser.picture.large}`;
  modImg.alt = "profile picture";
  modInfo.appendChild(modImg);

  let modName = document.createElement("h3");
  modName.id = "name";
  modName.className = "modal-name cap";
  modName.textContent = `${matchedUser.name.first} ${matchedUser.name.last}`;
  modInfo.appendChild(modName);

  let modEmail = document.createElement("p");
  modEmail.className = "modal-text";
  modEmail.textContent = `${matchedUser.email}`;
  modInfo.appendChild(modEmail);

  let modCity = document.createElement("p");
  modCity.className = "modal-text cap";
  modCity.textContent = `${matchedUser.location.city}`;
  modInfo.appendChild(modCity);

  let hr = document.createElement("hr");
  modInfo.appendChild(hr);

  let modTel = document.createElement("p");
  modTel.className = "modal-text";
  modTel.textContent = `${matchedUser.cell}`;
  modInfo.appendChild(modTel);

  let modAddress = document.createElement("p");
  modAddress.className = "modal-text";
  modAddress.textContent = `${matchedUser.location.street.number} ${matchedUser.location.street.name} ${matchedUser.location.city}, ${matchedUser.location.state} ${matchedUser.location.postcode}`;
  modInfo.appendChild(modAddress);

  let modBday = document.createElement("p");
  modBday.className = "modal-text";
  let date = new Date(matchedUser.dob.date);
  date = new Intl.DateTimeFormat("en-US").format(date);
  modBday.textContent = `Birthday: ${date}`;
  modInfo.appendChild(modBday);

  modConDiv.style.visibility = "visible";
}
