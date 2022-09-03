const container = document.querySelector('.container');
const count = document.querySelector('#count');
const amount = document.getElementById('amount');
const select =  document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)')

getFromLocalStorage();
calculateTotal();

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected')
    
    const selectedSeatsArray = []
    const seatsArray = []

    //Spread operator ile yapılabilir.
    selectedSeats.forEach(function(seat){
        selectedSeatsArray.push(seat);
    });

    seats.forEach(function(seat){
        seatsArray.push(seat);
    });
    
    //[1,3,5] koltukların index numarlarını verir.
    selectedSeatsIndex = selectedSeatsArray.map(function(seat){
        return seatsArray.indexOf(seat)
    });

    console.log(selectedSeatsIndex);

    let selectedSeatCount = selectedSeats.length;    
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatsIndex);
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0 ) {
        seats.forEach(function(seat,index){
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs))
    localStorage.setItem('selectedMovieIndex', select.selectedIndex)
}

container.addEventListener('click',function(e){
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected'); //toggle: yoksa ekler varsa siler.
        calculateTotal();
    }
});

select.addEventListener('change', function(e){
    calculateTotal();
});