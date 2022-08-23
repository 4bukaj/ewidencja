let today = new Date();
let month = today.getMonth();
let year = today.getFullYear() - 2000;
let months = ['styczeń','luty', 'marzec', 'kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień'];

let myDate = new Date();
myDate.setFullYear(year);
myDate.setMonth(month);
let daysNumber = new Date(year, month+1, 0).getDate();
let weekends = 0;

//COUNT BUSINESS DAYS
for(let i = 1; i <= daysNumber; i++){
    myDate.setDate(i);
    if(myDate.getDay() == 6 || myDate.getDay() == 0) weekends++;
}

let businessDays = daysNumber - weekends;

//GENERATING HOURS ARRAY OF HOURS HERE    
let hsum = 168;
let hours = Array(businessDays).fill(0);

    while(hsum > 0){
        for(let i = 0; i < businessDays; i++){
            if(hsum > 0){
                let con = Math.round(Math.random());
                if(con != 0){
                    if(hours[i] < 12){
                        hours[i] += 1;
                        hsum -= 1;
                    }
                }
            }
        }
    }

    hours = hours.map(function(x){return x;});
    //console.log(hours);
    //console.log(hours.reduce((a, b) => a + b, 0));

//END OF GENERATING HOURS

const signature = '<img src="podpis.png">';

function createTable(){

    let startDate = document.getElementById('startDate').value;
    let name = document.getElementById('lastname').value + ' ' + document.getElementById('firstname').value;
    let it = 0;

    document.getElementById('insertStartDate').innerHTML = startDate;
    document.getElementById('insertMonth').innerHTML = months[month];
    document.getElementById('insertYear').innerHTML = year;
    document.getElementById('insertName').innerHTML = name;

    let table = document.getElementById('table');    
    for(let i = 1; i <= 32; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < 5; j++){
            let td = document.createElement('td');
            if(i == 32 && j == 0) td.innerHTML = 'Liczba godzin wykonywania umowy zlecenie ogółem:';
            else if(i == 32 && j == 1) td.innerHTML = '168';
            else if(j == 0) td.innerHTML = i;
            else if(j == 2){
                td.innerHTML = signature;
                if((myDate.getDay() == 6 || myDate.getDay() == 0 || i > daysNumber) && i != 32){
                    td.innerHTML = '\u2013';
                    td.classList.add('bold');
                }
            }
            else if(j == 1 || j == 2){
                myDate.setDate(i);
                //console.log(myDate);
                if((myDate.getDay() == 6 || myDate.getDay() == 0 || i > daysNumber) && i != 32){
                    td.innerHTML = '\u2013';
                    td.classList.add('bold');
                }
                else if(j == 1){
                    //adding hours here
                    td.innerHTML = hours[it];
                    it++;
                }
            }
            
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}



//JQUERY triggering createTable function and printing the PDF
$(document).ready(function($)
{
    $(document).on('click', '.generatePDF', function(event)
    {
        createTable();
        event.preventDefault();

        let element = document.getElementById('pdf');    

        let opt = 
        {
            margin: 1,
            filename: (year+2000)+'-0'+(month+1)+'__'+(document.getElementById('lastname').value + '_' + document.getElementById('firstname').value).toUpperCase(),
            html2canvas: {scale: 2},
            jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
        };

        html2pdf().set(opt).from(element).save();

    });
});