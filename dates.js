var myId = sessionStorage.getItem('docId')

var bookDates = sessionStorage.getItem('FBdates') 

 

 

 firebase

  .firestore()

  .collection("buildings")

  .doc(myId)

  .get()

  .then((docRef) => {

    const blockedDatesFB = docRef.data().date

    

    const datesFBArray = blockedDatesFB.split(",");

    

    sessionStorage.setItem('FBdates', datesFBArray)

    

    console.log('Got the array from FB ' + sessionStorage.getItem('FBdates'))

    

  })

  .catch((error) => { })

  

  

console.log('Dates are' + bookDates)

function blockDates(){

      

      console.log('Working')

      

      var firstDay = document.getElementById('firstDay');

      var lastDay = document.getElementById('lastDay');

      

      

      var listDate = [];

      var startDate = firstDay.value;

      console.log('startDate '+ startDate)

      var endDate = lastDay.value;

      console.log('lastDate ' + endDate)

      

      

      var dateMove = new Date(startDate);

      var strDate = startDate;

      

      if(startDate === endDate){

        console.log('SameDate')

        listDate.push(startDate)

      }

      

      

      

      while (strDate < endDate) {

        var strDate = dateMove.toISOString().slice(0, 10);

        listDate.push(strDate);

        dateMove.setDate(dateMove.getDate() + 1);

      };

      

      sessionStorage.setItem('listDate', listDate)+

      console.log(listDate)

      var blockInfo = document.getElementById('blockInfo')

      var totalDays = listDate.length;

      

      if(totalDays < 3){

        blockInfo.innerHTML= 'You cannot book for ' + totalDays +" days. The minimum is 3 days";

        closeBlockDates.style.display = 'none';

      } else{

        blockInfo.innerHTML = 'You are booking for ' + totalDays + " days. Are you sure?";

        closeBlockDates.style.display = 'inherit';

      }

    }

    /*

    if (true) {

      

    } else {

      

    }

    */

var openBlockDates = document.getElementById('openBlockDates')

var closeBlockDates = document.getElementById('closeBlockDates')

    

    

    

    

 closeBlockDates.addEventListener('click', e => {

  e.preventDefault();

  

  var myId = sessionStorage.getItem('docId')

  

  var selectedDates = sessionStorage.getItem('listDate');

  

  console.log('Closed block approved these ' + selectedDates)

  

  

  let fbDatesArray = sessionStorage.getItem('FBdates').split(",")

  

  let userDatesArray = selectedDates.split(",")

  

  

  const filteredArray = fbDatesArray.filter(value => userDatesArray.includes(value));

  console.log('filteredArray')

  console.log(filteredArray)

  

  if (filteredArray.length > 0) {

    blockInfo.innerHTML = 'Oops!' + filteredArray + ' are already booked. Try other dates'

  } else {

    db.collection('buildings').doc(myId).update({

      date: selectedDates,

  });

  alert('booked!')

  /* window.location.replace('pay.html') */

  }

  

    

  

  

  

  

  

  

  

});

    

