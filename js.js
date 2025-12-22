function formSubmit() {
    const formData = document.getElementById("myForm");

    const stime = convert2jsDate(formData[0].value); // get value from form
    const etime = convert2jsDate(formData[1].value);
    const btime = formData[2].value;

    const timeBtwn = getTimeBtwn(stime,etime);

    document.getElementById("result").innerHTML = "The bench took " + timeBtwn + " minutes to complete. Productivity was " + calculateProductivity(timeBtwn, btime) + "%.";
}

function convert2jsDate(timeValue) {
     // split time value into hours and minutes
    let [hours, minutes] = timeValue.split(":").map(Number);
    let dateObject = new Date(1970, 0, 1, hours, minutes);
    return dateObject;
}

function getTimeBtwn(stime,etime) {
    let elapsed = etime - stime; // in milliseconds

    if(elapsed < 0){ //if bench is started before midnight and finished after
        etime.setDate(2);
        elapsed = etime - stime;
    }

    elapsed = elapsed/(1000*60); //in minutes
    return elapsed;
}

function calculateProductivity(timeBtwn, btime) {
    let prod = btime/timeBtwn*100;
    return Math.round(prod);
}