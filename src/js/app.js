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
                  ? `<a href="https://twitter.com/${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>`
                  : ""
              }
              ${
                github
                  ? `<a href="https://github.com/${github}" target="_blank"><i class="fab fa-github"></i></a>`
                  : ""
              }
              ${
                linkedin
                  ? `<a href="https://linkedin.com/in/${linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>`
                  : ""
              }
              ${
                instagram
                  ? `<a href="https://instagram.com/${instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`
                  : ""
              }
          </div>
      </div>
  `;
}

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Genera el contenido de la tarjeta usando la función renderProfileCard
  const profileCardHtml = renderProfileCard(variables);

  // Inserta el HTML generado en el contenedor de contenido
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${profileCardHtml}
      <ul class="position-right">
        ${
          variables.twitter
            ? `<li><a href="https://twitter.com/${variables.twitter}" target="_blank"><i class="fab fa-twitter"></i></a></li>`
            : ""
        }
        ${
          variables.github
            ? `<li><a href="https://github.com/${variables.github}" target="_blank"><i class="fab fa-github"></i></a></li>`
            : ""
        }
        ${
          variables.linkedin
            ? `<li><a href="https://linkedin.com/in/${variables.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a></li>`
            : ""
        }
        ${
          variables.instagram
            ? `<li><a href="https://instagram.com/${variables.instagram}" target="_blank"><i class="fab fa-instagram"></i></a></li>`
            : ""
        }
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
    background:
      "https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_640.png",
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
