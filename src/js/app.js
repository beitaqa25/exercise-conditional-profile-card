import "../style/index.css";

function renderProfileCard(props) {
  const {
    includeCover,
    background,
    avatarURL,
    socialMediaPosition,
    twitter,
    github,
    linkedin,
    instagram,
    name,
    lastName,
    role,
    country,
    city
  } = props;

  return `
      <div class="profile-card">
          ${
            includeCover
              ? `<div class="cover" style="background-image: url(${background});"></div>`
              : ""
          }
          <div class="avatar" style="background-image: url(${avatarURL});"></div>
          <div class="info">
              <h1>${name || "First Name"} ${lastName || "Last Name"}</h1>
              <h2>${role || "Role"}</h2>
              <p>${city || "City"}, ${country || "Country"}</p>
          </div>
          <div class="social-media ${socialMediaPosition}">
              ${
                twitter
                  ? `<a href="https://twitter.com/${twitter}">Twitter</a>`
                  : ""
              }
              ${
                github
                  ? `<a href="https://github.com/${github}">GitHub</a>`
                  : ""
              }
              ${
                linkedin
                  ? `<a href="https://linkedin.com/in/${linkedin}">LinkedIn</a>`
                  : ""
              }
              ${
                instagram
                  ? `<a href="https://instagram.com/${instagram}">Instagram</a>`
                  : ""
              }
          </div>
      </div>
  `;
}

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>Lucy Boilett</h1>
          <h2>Web Developer</h2>
          <h3>Miami, USA</h3>
          <ul class="position-right">
            <li><a href="https://twitter.com/4geeksacademy"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/4geeksacademy"><i class="fab fa-github"></i></a></li>
            <li><a href="https://linkedin.com/school/4geeksacademy"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://instagram.com/4geeksacademy"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
