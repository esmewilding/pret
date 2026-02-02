function formSubmit() {
    const formData = document.getElementById("myForm"); // get values from form

    try {
        // main form fields (required)
        const stime = convert2jsDate(formData.stime.value);
        const etime = convert2jsDate(formData.etime.value);
        const btime = formData.btime.value;

        let timeBtwn;

        // throws error if an incorrect input is found
        if(isNaN(stime) || isNaN(etime) || isNaN(btime) || btime <= 0) {
            console.warn("incorrect basic form input");
            throw "not a number";
        }

        // additional form fields
        const hiddenForm = document.getElementById("hidden");
        if (hiddenForm.style.display === "block") { // if additional form fields are visible
            const pauseStart = convert2jsDate(formData.e_time_2.value);
            const retime = convert2jsDate(formData.restime.value);

            if(isNaN(pauseStart) || isNaN(retime)) {
                console.warn("incorrect time away from bench input");
                throw "not a number";
            }

            timeBtwn = getTimeBtwn(stime,etime,pauseStart,retime);
        } else {
            timeBtwn = getTimeBtwn(stime,etime);
        }

        document.getElementById("result").innerHTML = "The bench took " + timeBtwn + " minutes to complete. Productivity was " + calculateProductivity(timeBtwn, btime) + "%.";
    } catch (err) {
        document.getElementById("result").innerHTML = "Cannot calculate productivity";
    }
}

function showAdvanced() {
    // shows/hides additonal form fields
    let x = document.getElementById("hidden");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function convert2jsDate(timeValue) {
     // takes HTML time input and converts it to a javascript date object
    let [hours, minutes] = timeValue.split(":").map(Number);
    let dateObject = new Date(1970, 0, 1, hours, minutes); // only care about time so date is unimportant
    return dateObject;
}

function getTimeBtwn(stime,etime,pauseStart=null,retime=null) {
    let elapsed;

    if (pauseStart===null) { // if additional form fields are in use
        elapsed = etime - stime; // time in milliseconds

        if(elapsed < 0){ //if bench is started before midnight and finished after
            etime.setDate(2); // moves end time to next day
            elapsed = etime - stime;
        }
    } else {
        elapsed = (etime - retime) + (pauseStart - stime);
        //TODO: allow time to continue over midnight
    }

        
    elapsed = elapsed/(1000*60); //in minutes
    console.log(elapsed);
    return elapsed;
}

function calculateProductivity(timeBtwn, btime) {
    let prod = btime/timeBtwn*100;
    return Math.round(prod);
}

module.exports = getTimeBtwn;