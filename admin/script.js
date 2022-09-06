

const modalWrapper = document.querySelector('.modal-wrapper');

const dateModalWrapper = document.querySelector('.dateModal-wrapper');

const dateModalSelect = document.getElementById('modalCalDate');

const dateModalStatus = document.getElementById('availableDate');

// modal add

const addModal = document.querySelector('.add-modal');

const addModalForm = document.querySelector('.add-modal .form');

// modal edit

const editModal = document.querySelector('.edit-modal');

const editModalForm = document.querySelector('.edit-modal .form');

// modal date

const dateModal = document.querySelector('.date-modal');

const dateModalForm = document.querySelector('.date-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tablebuildings = document.querySelector('.table-buildings');

let id;

// Create element and render buildings

const renderUser = doc => {

  const tr = `

    <tr data-id='${doc.id}'>

      <td>${doc.data().Name}</td>

      <td>${doc.data(). Description}</td>

      <td>${doc.data().Cost}</td>

      <td></td>

      <td>

        <button class="btn btn-edit">Edit</button>

        <button class="btn btn-delete">Delete</button>

        <button class="btn btn-date" onclick="

        sessionStorage.setItem('docId', this.id);

        console.log(this.id);" 

         class="button cta" id='${doc.id}'>Dates</button>

         

      </td>

    </tr>

    <br>

    <hr>

  `;

  tablebuildings.insertAdjacentHTML('beforeend', tr);

  // Click edit user

  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);

  btnEdit.addEventListener('click', () => {

    editModal.classList.add('modal-show');

    

    id = doc.id;

    editModalForm.firstName.value = doc.data().Name;

    editModalForm.lastName.value = doc.data().Description;

    editModalForm.phone.value = doc.data().Cost;

    editModalForm.email.value = doc.data().Status;

    editModalForm.url.value = doc.data().PayURL;

    editModalForm.details.value = doc.data().details

  });

  // Click delete user

  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);

  btnDelete.addEventListener('click', () => {

  if (confirm('You are going to delete a property. Are you Sure?') == true) {

     db.collection('buildings').doc(`${doc.id}`).delete().then(() => {

      console.log('Document succesfully deleted!');

      alert('Deleted Successfully')

    }).catch(err => {

      console.log('Error removing document', err);

    });

    

  } else {

    alert('Delete action cancelled succesfully')

  }

   

  });












  

  

  // Click dates

  const btnDate = document.querySelector(`[data-id='${doc.id}'] .btn-date`);

  btnDate.addEventListener('click', () => {

    dateModal.classList.add('modal-show');

    id = doc.id;

    /*

    editModalForm.firstName.value = doc.data().Name;

    editModalForm.lastName.value = doc.data().Description;

    editModalForm.phone.value = doc.data().Cost;

    editModalForm.email.value = doc.data().Status;

    editModalForm.url.value = doc.data().Status;

  */

  

  

  });

}

// Click add user button

btnAdd.addEventListener('click', () => {

  addModal.classList.add('modal-show');

  addModalForm.firstName.value = '';

  addModalForm.lastName.value = '';

  addModalForm.phone.value = '';

  addModalForm.email.value = '';

  addModalForm.url.value = '';

});

// User click anyware outside the modal

window.addEventListener('click', e => {

  if(e.target === addModal) {

    addModal.classList.remove('modal-show');

  }

  if(e.target === editModal) {

    editModal.classList.remove('modal-show');

  }

  if(e.target === dateModal) {

    dateModal.classList.remove('modal-show');

  }

});

// Get all buildings

// db.collection('buildings').get().then(querySnapshot => {

//   querySnapshot.forEach(doc => {

//     renderUser(doc);

//   })

// });

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

// Click submit in add modal

addModalForm.addEventListener('submit', e => {

  //GALLERY. 

  const galleryURLs = galToDb.toString();

  console.log(galleryURLs)

  e.preventDefault();

  db.collection('buildings').add({

    Name: addModalForm.firstName.value,

    Description: addModalForm.lastName.value,

    Cost: addModalForm.phone.value,

    Status: addModalForm.email.value,

    PayURL: addModalForm.url.value,

    image: sessionStorage.getItem('imageSrc'),

    date: 'null',

    gallery: galleryURLs,

    details: 'null',

  });

  modalWrapper.classList.remove('modal-show');

});

// Click submit in edit modal

editModalForm.addEventListener('submit', e => {

  e.preventDefault();

  db.collection('buildings').doc(id).update({

    Name: editModalForm.firstName.value,

    Description: editModalForm.lastName.value,

    Cost: editModalForm.phone.value,

    Status: editModalForm.email.value,

    PayURL: editModalForm.url.value,

    details: editModalForm.details.value,

  });

  editModal.classList.remove('modal-show');

  

});

// Click submit in date modal

dateModalForm.addEventListener('submit', e => {

  e.preventDefault();

  sessionStorage.setItem('docId', id)

  window.location.replace('dates.html')

});

dateModalForm.addEventListener('submit', e => {

  e.preventDefault();

  window.location.replace('/dates.html')

  

  dateModal.classList.remove('modal-show');

});

var loadFile = function(event) {

var output = document.getElementById('output');

 output.src = URL.createObjectURL(event.target.files[0]);

 output.onload = function() {

    URL.revokeObjectURL(output.src) // free memory

    uploadImage()

    

  }

 };

function uploadImage() {

      const ref = firebase.storage().ref();

      const file = document.querySelector("#photo").files[0];

      const name = +new Date() + "-" + file.name;

      const metadata = {

        contentType: file.type

      };

      const task = ref.child(name).put(file, metadata);

      task

        .then(snapshot => snapshot.ref.getDownloadURL())

        .then(url => {

          console.log(url);

          sessionStorage.setItem("imageSrc", url);

          move();

          

        })

        .catch(console.error);

    }

function move() {

  var elem = document.getElementById("myBar");

  myBar.style.width = "0%";

  setTimeout(() => {

    myBar.style.width = "100%";

  });

  setTimeout(() => {

    alert("done");

    /* do stuff */

  }, 5000);

}

//Multiple Images 

var galToDb = []

var fileButton = document.getElementById('imgBtn')

//Listen for file selection

fileButton.addEventListener('change', function(e) {

  //Get files

  for (var i = 0; i < e.target.files.length; i++) {

    var imageFile = e.target.files[i];

    uploadImageAsPromise(imageFile);

  }

});

//Handle waiting to upload each file using promise

function uploadImageAsPromise(imageFile) {

  return new Promise(function(resolve, reject) {

    var storageRef = firebase.storage().ref('multipleImg' + "/" + imageFile.name);

    //Upload file

    var task = storageRef.put(imageFile);

    //Update progress bar

    task.on('state_changed',

      function progress(snapshot) {

        var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;

        //uploader.value = percentage;

        console.log(percentage)

      },

      function error(err) {

      },

      function complete() {

        storageRef.getDownloadURL().then((url) => {

          console.log(url)

          var img = new Image();

          img.src = url

          document.getElementById('gallery').appendChild(img);

          galToDb.push(url)

        })

      }

    );

  });

}

