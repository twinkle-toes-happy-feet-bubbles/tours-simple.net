

const tablebuildings = document.querySelector('.table-buildings');

let id;

// Create element and render buildings
const renderUser = doc => {
  const tr = `
    <article data-id='${doc.id}' class="l-card">
      <div class="l-title-container">
        <h1 class="location-title">${doc.data().Name}</h1><span class="location-subtitle">${doc.data(). Description}</span>
      </div>
      <div class="l-icon-container"><img class="displayImg" class="location-icon" src=${doc.data().image}></div>
      <div class="l-description-container">${doc.data().Cost}$/day </div>
      <br>
      <div class="l-description-container">${doc.data().Status}</div>
      <br>
      <button onclick="
        sessionStorage.setItem('docId', this.id);
        console.log(this.id);
         window.location.replace('dates.html');" 
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

