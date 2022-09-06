const tablebuildings = document.querySelector('.table-buildings');

let id;

// Create element and render buildings

const renderUser = doc => {

  const tr = `

    <article data-id='${doc.id}' class="l-card">

      <div class="l-title-container">

       <!--<span class="location-subtitle">${doc.data(). Description}</span>-->

      </div>

      <div class="l-icon-container"><img class="displayImg" class="location-icon" src=${doc.data().image}></div>

       <h1 class="location-title">${doc.data().Name}</h1>

      <div class="l-description-container">${doc.data().Cost}$/night </div>

      <br>

    

      <br>

      <button onclick="

        sessionStorage.setItem('docId', this.id);

        console.log(this.id);

         window.location.assign('bench.html');" 

         class="button cta" id='${doc.id}'>book now</button>

    </article>

    

  

  

  

  

    

    <br>

    <hr>

  `;

  tablebuildings.insertAdjacentHTML('beforeend', tr);

 

}

// Real time listener

db.collection('buildings').onSnapshot(snapshot => {

  snapshot.docChanges().forEach(change => {

    if(change.type === 'added') {

      renderUser(change.doc);

    }

    if(change.type === 'removed') {

      let tr = document.querySelector(`[data-id='${change.doc.id}']`);

      let tbody = tr.parentElement;

      tablebuildings.removeChild(tbody);

    }

    if(change.type === 'modified') {

      let tr = document.querySelector(`[data-id='${change.doc.id}']`);

      let tbody = tr.parentElement;

      tablebuildings.removeChild(tbody);

      renderUser(change.doc);

    }

  })

})

/*Scroll Navbar */

// When the user scrolls down 20px from the top of the document, slide down the navbar

// When the user scrolls to the top of the page, slide up the navbar (50px out of the top view)

window.onscroll = function() {scrollFunction()};

function scrollFunction() {

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

    document.getElementById("navbar").style.top = "0";

  } else {

    document.getElementById("navbar").style.top = "-50px";

  }

}

/*Scroll Navbar */

// When the user scrolls down 20px from the top of the document, slide down the navbar

// When the user scrolls to the top of the page, slide up the navbar (50px out of the top view)

window.onscroll = function() {scrollFunction()};

function scrollFunction() {

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

    document.getElementById("navbar").style.top = "0";

  } else {

    document.getElementById("navbar").style.top = "-50px";

  }

}

