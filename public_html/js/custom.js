function changeLanguage(language) {
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
    url: "/api/",
    success: function(json) {

      // Reset all tables
      $("#content").html("");
      $("#Monday").html("");
      $("#Tuesday").html("");
      $("#Wednesday").html("");
      $("#Thursday").html("");
      $("#Friday").html("");

      $("#weeknr").html("#" + json["weeknr"]);

      var ts = new Date(json["nextUpdate"]);
      $("#update").html("NEXT UPDATE: " + ts.toDateString());

      var categories = json[language];
      for (var category in categories) {

        // console.log(category);

        // Fill Big Menu
        if (!["Sandwich of the week", "Broodje van de week"].includes(category)) {
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

        // Fill Small Menu
        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        days.forEach((day, d) => {
          $("#" + day).append(`
        <ul class="list-group my-2">
          <li class="list-group-item" style="background-color: #F9F9F9;">${category}</li>
          <li class="list-group-item disabled">${categories[category][day]}</li>
        </ul>
      `);
        });

      }
    },
    error: function(json) {
      console.log(json);
      $("#content").html("<td colspan='6'><p class='w-100 text-center'><i class='fas fa-times-circle'></i> Failed, please try again later...</p></td>");

    },
  });

}

function setActive() {
  var currDay = new Date().toLocaleString('en-us', {
    weekday: 'long'
  });
  
  // currDay = "Wednesday";

  if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(currDay)) {
    // Set active big menu
    $('th.selectItem').each(function() {
      if (this.innerHTML == currDay) {
        $(this).addClass("select");
      }
    });

    // Set active big menu
    $('p.selectItem').each(function() {
      if (this.innerHTML == currDay) {
        $(this).addClass("select");
        $(this).attr('id', 'select');
      }
    });

    // Enable gotoBtn when weekday
    $("#gotoBtn").removeClass("d-none");
  }

}

$(document).ready(function() {

  $('.clickToScroll').click(function() {
    var clickedId = $(this).attr('href');
    $('html, body').animate({
      scrollTop: ($(clickedId).offset().top - 40)
    }, 1000);
    return false;
  });

  setActive();
  renderMenu("NL");


});
