function formSubmit() {
    const formData = document.getElementById("myForm"); // get values from form

    try {
        const stime = convert2jsDate(formData[0].value);
        const etime = convert2jsDate(formData[1].value);
        const btime = formData[2].value;

        // throws error if an incorrect input is found
        if(isNaN(stime) || isNaN(etime) || isNaN(btime) || btime <= 0) throw "not a number";

        const timeBtwn = getTimeBtwn(stime,etime);

        document.getElementById("result").innerHTML = "The bench took " + timeBtwn + " minutes to complete. Productivity was " + calculateProductivity(timeBtwn, btime) + "%.";
    } catch (err) {
        document.getElementById("result").innerHTML = "Cannot calculate productivity";
    }
}

function convert2jsDate(timeValue) {
     // takes HTML time input and converts it to a javascript date object
    let [hours, minutes] = timeValue.split(":").map(Number);
    let dateObject = new Date(1970, 0, 1, hours, minutes); // only care about time so date is unimportant
    return dateObject;
}

function getTimeBtwn(stime,etime) {
    let elapsed = etime - stime; // in milliseconds

    if(elapsed < 0){ //if bench is started before midnight and finished after
        etime.setDate(2); // moves end time to next day
        elapsed = etime - stime;
    }
        
    elapsed = elapsed/(1000*60); //in minutes
    return elapsed;
}

function calculateProductivity(timeBtwn, btime) {
    let prod = btime/timeBtwn*100;
    return Math.round(prod);
}

document.getElementById("footerMenuP").innerHTML = '<ul id="footerMenu"><li style="float: left;"><a href="https://github.com/esmewilding/pret"><img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" id="git-logo"></a></li><li class="footerMenu_li"><a href="about.html">How to use this website</a></li><li class="footerMenu_li">This website does not collect any data</li></ul>'