function changeLanguage(language) {
  console.log(language);
  if (language == "EN") {
    $("#language").html(`
      <p class="dropdown-toggle pointer p-2 m-1" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="flag-icon flag-icon-us"> </span> English</p>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown">
        <p onclick="changeLanguage('NL')" class="dropdown-item pointer m-0" href="#be"><span class="flag-icon flag-icon-nl"> </span> Dutch</p>
      </div>
    `);
  } else if (language == "NL") {
    $("#language").html(`
      <p class="dropdown-toggle pointer p-2 m-1" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="flag-icon flag-icon-nl"> </span> Dutch</p>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown">
        <p onclick="changeLanguage('EN')" class="dropdown-item pointer m-0" href="#be"><span class="flag-icon flag-icon-us"> </span> English</p>
      </div>
    `);
  }

  renderMenu(language);

}

function renderMenu(language) {
  $("#content").html("<td colspan='6'><p class='w-100 text-center'><i class='fas fa-circle-notch fa-spin'></i> Loading...</p></td>");

  $.ajax({
    contentType: 'application/json',
    type: "GET",
    url: "https://warre.site/api/",
    success: function(json) {
      console.log("Successfully requested");
      console.log(json);

      $("#weeknr").html(json["weeknr"])

      $("#content").html("");

      var categories = json[language];
      for (var category in categories) {

        console.log(category);

        if (category != "Sandwich of the week") {
          $("#content").append(`
              <tr>
                <th scope="row">${category}</th>
                <td>${categories[category]["Monday"]}</td>
                <td>${categories[category]["Tuesday"]}</td>
                <td>${categories[category]["Wednesday"]}</td>
                <td>${categories[category]["Thursday"]}</td>
                <td>${categories[category]["Friday"]}</td>
              </tr>
          `);
        } else {
          $("#content").append(`
              <tr>
                <th scope="row">${category}</th>
                <td class="text-center align-middle" colspan="5">${categories[category]["Monday"]}</td>
              </tr>
          `);
        }

      }


    },
    error: function(json) {
      console.log(json);
      $("#content").html("<td colspan='6'><p class='w-100 text-center'><i class='fas fa-times-circle'></i> Failed, please try again later...</p></td>");

    },
  });

}

$(document).ready(function() {

  renderMenu("NL");

});
