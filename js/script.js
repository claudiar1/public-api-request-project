let userArray = [];

/**
 * API request, push fetched data to global userArray, and render fetched data to page
 */
fetch(
  "https://randomuser.me/api/?results=12&nat=us&exc=gender,login,registered,phone"
)
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((each) => userArray.push(each));
    printCards(userArray);
  });

/**
 * Renders a card for each user object fetched
 * @param {array} users - array of user data
 */
function printCards(users) {
  const gallery = document.getElementById("gallery");

  //map over array of fetched user data
  users.map((user) => {
    //create cardDiv container
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.id = `${user.id.value}`;

    //create imgDiv
    let imgDiv = document.createElement("div");
    imgDiv.className = "card-img";

    //render user image
    let img = document.createElement("img");
    img.src = `${user.picture.large}`;
    img.className = "card-img";
    img.alt = "profile picture";

    //append imgDiv and img to their appropriate parents
    imgDiv.appendChild(img);
    cardDiv.appendChild(imgDiv);

    //create infoDiv container
    let infoDiv = document.createElement("div");
    infoDiv.className = "card-info-container";

    //render user first and last names
    let name = document.createElement("h3");
    name.id = "name";
    name.className = "card-name cap";
    name.textContent = `${user.name.first} ${user.name.last}`;
    infoDiv.appendChild(name);

    //render user email address
    let email = document.createElement("p");
    email.className = "card-text";
    email.textContent = `${user.email}`;
    infoDiv.appendChild(email);

    //render user location
    let locDiv = document.createElement("p");
    locDiv.className = "card-text cap";
    locDiv.textContent = `${user.location.city}, ${user.location.state}`;
    infoDiv.appendChild(locDiv);

    //append infoDiv to its parent cardDiv
    cardDiv.appendChild(infoDiv);

    //append cardDiv to page
    gallery.appendChild(cardDiv);

    //add event to each card in order to generate modal window for each user clicked on
    cardDiv.addEventListener("click", (e) => {
      let userId = e.currentTarget.id;
      createModal(userId);
    });
  });
}

/**
 * Creates and displays modal window with additional information on the user whose card was clicked.
 * @param {object} userId - single object in array of users
 */

function createModal(userId) {
  //locate user object with corresponding id to user card clicked on
  let matchedUser = userArray.find((user) => {
    return user.id.value === userId;
  });

  //create modal window container div
  let modConDiv = document.createElement("div");
  modConDiv.className = "modal-container";

  //create inner modal div to hold user data elements
  let modDiv = document.createElement("div");
  modDiv.className = "modal";
  modConDiv.appendChild(modDiv);

  //create mdoal window exit button and append to parent modal div
  let xButton = document.createElement("button");
  xButton.type = "button";
  xButton.id = "modal-close-btn";
  xButton.className = "modal-close-btn";
  xButton.innerHTML = "<strong>X</strong>";
  modDiv.appendChild(xButton);

  //create container for user info within modal div
  let modInfo = document.createElement("div");
  modInfo.className = "modal-info-container";
  modDiv.appendChild(modInfo);

  //render user image
  let modImg = document.createElement("img");
  modImg.className = "modal-img";
  modImg.src = `${matchedUser.picture.large}`;
  modImg.alt = "profile picture";
  modInfo.appendChild(modImg);

  //render user first and last names
  let modName = document.createElement("h3");
  modName.id = "name";
  modName.className = "modal-name cap";
  modName.textContent = `${matchedUser.name.first} ${matchedUser.name.last}`;
  modInfo.appendChild(modName);

  //render user email address
  let modEmail = document.createElement("p");
  modEmail.className = "modal-text";
  modEmail.textContent = `${matchedUser.email}`;
  modInfo.appendChild(modEmail);

  //render user city
  let modCity = document.createElement("p");
  modCity.className = "modal-text cap";
  modCity.textContent = `${matchedUser.location.city}`;
  modInfo.appendChild(modCity);

  //render hr element to break up displayed data
  let hr = document.createElement("hr");
  modInfo.appendChild(hr);

  //render user cell number
  let modTel = document.createElement("p");
  modTel.className = "modal-text";
  modTel.textContent = `${matchedUser.cell}`;
  modInfo.appendChild(modTel);

  //render user mailing address
  let modAddress = document.createElement("p");
  modAddress.className = "modal-text";
  modAddress.textContent = `${matchedUser.location.street.number} ${matchedUser.location.street.name} ${matchedUser.location.city}, ${matchedUser.location.state} ${matchedUser.location.postcode}`;
  modInfo.appendChild(modAddress);

  //format and render user DOB
  let modBday = document.createElement("p");
  modBday.className = "modal-text";
  let date = new Date(matchedUser.dob.date);
  date = new Intl.DateTimeFormat("en-US").format(date);
  modBday.textContent = `Birthday: ${date}`;
  modInfo.appendChild(modBday);

  //render full modal window
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(modConDiv);
  modConDiv.style.visibility = "visible";

  //remove modal window from document on exit button click
  xButton.addEventListener("click", () => {
    modConDiv.style.visibility = "hidden";
    body.removeChild(modConDiv);
  });
}
