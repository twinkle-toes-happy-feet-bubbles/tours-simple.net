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

    

    var datesInfo = document.getElementById('datesInfo')

    

    sessionStorage.setItem('FBdates', datesFBArray)

    

    console.log(datesFBArray.join("\n"));

    

    datesInfo.innerHTML = datesFBArray.join("<hr>")

    

    console.log('Got the array from FB ' + sessionStorage.getItem('FBdates'))

    

  })

  .catch((error) => {

    alert('Oh no! The Website broke down. Contact the owner if possible')

    

  })

  

  

console.log('Dates are' + bookDates)

function blockDates(){

      

      console.log('Block Working')

      

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

      

      

        blockInfo.innerHTML = 'You are blocking for ' + totalDays + " days.";

        closeUnBlockDates.style.display = 'inherit';

      

    }

    /*

    if (true) {

      

    } else {

      

    }

    */

var openBlockDates = document.getElementById('openBlockDates')

var closeBlockDates = document.getElementById('closeBlockDates')

var closeUnblockDates = document.getElementById('closeUnblockDates')

    

    

    

    

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

  alert('Yay! The dates have been Blocked')

  console.log('blocked!')

  }

  

  

});

    

/*    

   

const filteredArray = array1.filter(value => array2.includes(value));

    

*/

function unBlockDates() {

  console.log('Unblock Working')

  var firstDay = document.getElementById('firstDay');

  var lastDay = document.getElementById('lastDay');

  var listDate = [];

  var startDate = firstDay.value;

  console.log('startDate ' + startDate)

  var endDate = lastDay.value;

  console.log('lastDate ' + endDate)

  var dateMove = new Date(startDate);

  var strDate = startDate;

  if (startDate === endDate) {

    console.log('SameDate')

    listDate.push(startDate)

  }

  while (strDate < endDate) {

    var strDate = dateMove.toISOString().slice(0, 10);

    listDate.push(strDate);

    dateMove.setDate(dateMove.getDate() + 1);

  };

  sessionStorage.setItem('listDate', listDate) +

    console.log(listDate)

  var blockInfo = document.getElementById('blockInfo')

  var totalDays = listDate.length;

  blockInfo.innerHTML = 'You are UnBlocking for ' + totalDays + " days. Are you sure?";

  closeUnblockDates.style.display = 'inherit';

}

    

 closeUnblockDates.addEventListener('click', e => {

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

    const myArray = fbDatesArray;

    const toRemove = userDatesArray;

    

    let differenceArray = myArray.filter(function(el) {

      return toRemove.indexOf(el) < 0;

    });

    console.log('Difference array is ' + differenceArray);

    

    db.collection('buildings').doc(myId).update({

      date: differenceArray,

    });

    alert('Yay! The dates have been unblocked')

    

  } else {

    blockInfo.innerHTML = 'Looks like these dates are already unbooked'

    /*

    

  */

  console.log('To the moon! imean db')

  console.log('blocked!')

  }

  

  

});

