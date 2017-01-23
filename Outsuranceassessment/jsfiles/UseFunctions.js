//The js file has been created over the years to cater for some reusable functions over the years, e.g. checking upload file extension etc, FCM.

var focusField = "";
var messageDisplay = "";
var OldValue = "";
var imgRe = /^.+\.(csv)$/i;
var imgMsg = "";
var imgType = "";
var imgType2 = "";
var jsid = "";
var jsdoc = null;
var jsdocTD = null;
var jsdocFile = null;



function HasValue(control, heading, type, focus, message) {

    try {

        switch (type) {


            case "enter":

                if (control.value.trim().length != 0)
                    return true;
                else {

                    messageDisplay = message;
                    focusField = focus;
                    control.focus();
                    return false;
                }

                break;

            case "email":

                var isEmailCheck1 = control.value.indexOf("@");
                var isEmailCheck2 = control.value.indexOf(".");

                if (isEmailCheck1 == -1 || isEmailCheck2 == -1) {
                    messageDisplay = message;
                    focusField = focus;
                    control.focus();
                    return false;
                }
                else
                    return true;
                break;

            case "length":

                if (parseInt(control.value.length) < (parseInt(heading))) {
                    messageDisplay = message;
                    focusField = focus;
                    control.focus();
                    return false;
                }
                else {
                    return true;
                }

                break;

            case "greater0":

                if (parseInt(control.value) < 1) {
                    messageDisplay = message;
                    focusField = focus;
                    control.focus();
                    return false;
                }
                else {
                    return true;
                }

                break;

        }

    }
    catch (e) {

        messageDisplay = "Unexplained error occurred, please try again, if problem continues please contact the support team";
        return false;

    }


}


function HasChecked(control, setValue, type) {

    try {

        switch (type) {


            case "assign":

                if (control.checked) {
                    setValue.value = "1";
                }
                else {

                    setValue.value = "0";

                }

                break;

            case "option":

                if (control.checked) {
                    setValue.checked = false;
                }


        }

    }
    catch (e) {

        messageDisplay = "Unexplained error occurred, please try again, if problem continues please contact the support team";
        return false;

    }


}

function isDouble(str, isDouble) {

    var MyActualValue = ""
    if (isDouble != 'Double' && isDouble != 'DoubleCalc' && isDouble != 'IntDouble') {
        for (var i = 0; i < str.length; i++) {
            var ch = str.substring(i, i + 1)
            if (ch < "0" || ch > "9" || str.length == null) {


            }
            else {

                MyActualValue = MyActualValue + ch
            }
        }
        return MyActualValue
    }
    else {

        var dotcount = 0

        for (var i = 0; i < str.length; i++) {
            var ch = str.substring(i, i + 1)
            if (ch == ".") {
                dotcount = parseFloat(dotcount) + 1
                //MyActualValue = MyActualValue + ch
            }
            else if (ch < "0" || ch > "9" || str.length == null) {
                 ch = "";
            }

            if (parseFloat(dotcount) == 2) {



            }
            else {
                MyActualValue = MyActualValue + ch

            }
        }
        return MyActualValue



    }
}



function setNum(value) {
    OldValue = value
}

function setRound(value) {


    

    var result = Math.round(parseFloat(value) * 100) / 100;
    return result;
}

function isInteger(name, type, heading) {

   


    var theControl
    var isADouble
    theControl = document.getElementById(name)

    if (theControl.value.length == 0) {
        theControl.value = "0";
    }
    else if (theControl.value.length > 1 && theControl.value.substring(0, 1) == "0") {
        var newNum = theControl.value.substring(1, theControl.value.length)
        theControl.value = newNum;
    }

    if (theControl.value.length != 0) {

        theControl.value = isDouble(theControl.value, type)

        if (type == "IntCalc") {
            Recalculate();
        }
        if (type == "IntDouble") {
            theControl.value = theControl.value;
            isADouble = theControl.value.indexOf(".");
            if (isADouble != -1) {
                theControl.value = theControl.value.replace(".", "");
            }
        }
        else if (type == "Double") {
            theControl.value = theControl.value;
            isADouble = theControl.value.indexOf(".");
            if (isADouble != -1) {
                var NoNumberAfter = theControl.value.length - (isADouble + 1)
                if (NoNumberAfter > 2) {

                    var sliceBy = parseInt(NoNumberAfter) - 2

                    theControl.value = theControl.value.slice(0, -sliceBy);


                }

            }
        }
        else if (type == "DoubleCalc") {
            theControl.value = theControl.value;
            isADouble = theControl.value.indexOf(".");
            if (isADouble != -1) {
                var NoNumberAfter = theControl.value.length - (isADouble + 1)
                if (NoNumberAfter > 2) {

                    var sliceBy = parseInt(NoNumberAfter) - 2

                    theControl.value = theControl.value.slice(0, -sliceBy);


                }

            }

            Recalculate();
        }
        else {
            theControl.value = parseInt(theControl.value);
        }


    }

    if (isNaN(theControl.value)) {

        theControl.value = OldValue;

    }

    


}


function isInteger(name, type, heading, id, what) {


    

    var theControl
    var isADouble
    theControl = document.getElementById(name)

   

    if (theControl.value.length == 0) {
        theControl.value = "0";
    }
    else if (theControl.value.length > 1 && theControl.value.substring(0, 1) == "0") {
        var newNum = theControl.value.substring(1, theControl.value.length)
        theControl.value = newNum;
    }

    if (theControl.value.length != 0) {

        theControl.value = isDouble(theControl.value, type)

        if (type == "IntCalc") {
            Recalculate(id, what);
        }
        else if (type == "IntDouble") {
            theControl.value = theControl.value;
            isADouble = theControl.value.indexOf(".");
            if (isADouble != -1) {
                theControl.value = theControl.value.replace(".", "");
            }
        }
        else if (type == "Double") {
            theControl.value = theControl.value;
            isADouble = theControl.value.indexOf(".");
            if (isADouble != -1) {
                var NoNumberAfter = theControl.value.length - (isADouble + 1)
                if (NoNumberAfter > 2) {

                    var sliceBy = parseInt(NoNumberAfter) - 2

                    theControl.value = theControl.value.slice(0, -sliceBy); 
                   
                   
                }
                
            }
        }
        else if (type == "DoubleCalc") {
            theControl.value = theControl.value;
            isADouble = theControl.value.indexOf(".");
            if (isADouble != -1) {
                var NoNumberAfter = theControl.value.length - (isADouble + 1)
                if (NoNumberAfter > 2) {

                    var sliceBy = parseInt(NoNumberAfter) - 2

                    theControl.value = theControl.value.slice(0, -sliceBy);


                }

            }
            
            Recalculate(id, what);
        }
        else {
            theControl.value = parseInt(theControl.value);
        }
    }

    if (isNaN(theControl.value)) {

        theControl.value = OldValue

    }



}

function adjustHieght(hieght, id, theID) {
    
    document.getElementById(theID).style.height = hieght + "px";


}

function qryHowOld(varAsOfDate, varBirthDate) {
    var dtAsOfDate;
    var dtBirth;
    var dtAnniversary;
    var intSpan;
    var intYears;
    var intMonths;
    var intWeeks;
    var intDays;
    var intHours;
    var intMinutes;
    var intSeconds;
    var strHowOld;
    dtBirth = new Date(varBirthDate);
    dtAsOfDate = new Date(varAsOfDate);
    if (dtAsOfDate >= dtBirth) {
        intSpan = (dtAsOfDate.getUTCHours() * 3600000 +
                  dtAsOfDate.getUTCMinutes() * 60000 +
                  dtAsOfDate.getUTCSeconds() * 1000) -
                (dtBirth.getUTCHours() * 3600000 +
                  dtBirth.getUTCMinutes() * 60000 +
                  dtBirth.getUTCSeconds() * 1000)
        if (dtAsOfDate.getUTCDate() > dtBirth.getUTCDate() ||
           (dtAsOfDate.getUTCDate() == dtBirth.getUTCDate() && intSpan >= 0)) {
            dtAnniversary =
            new Date(Date.UTC(dtAsOfDate.getUTCFullYear(),
                                dtAsOfDate.getUTCMonth(),
                                dtBirth.getUTCDate(),
                                dtBirth.getUTCHours(),
                                dtBirth.getUTCMinutes(),
                                dtBirth.getUTCSeconds()));
        }
        else {
            dtAnniversary =
            new Date(Date.UTC(dtAsOfDate.getUTCFullYear(),
                                dtAsOfDate.getUTCMonth() - 1,
                                dtBirth.getUTCDate(),
                                dtBirth.getUTCHours(),
                                dtBirth.getUTCMinutes(),
                                dtBirth.getUTCSeconds()));
            intMonths = dtAsOfDate.getUTCMonth() - 1;
            if (intMonths == -1)
                intMonths = 11;
            while (dtAnniversary.getUTCMonth() != intMonths)
                dtAnniversary.setUTCDate(dtAnniversary.getUTCDate() - 1);
        }
        if (dtAnniversary.getUTCMonth() >= dtBirth.getUTCMonth()) {
            intMonths = dtAnniversary.getUTCMonth() - dtBirth.getUTCMonth();
            intYears = dtAnniversary.getUTCFullYear() - dtBirth.getUTCFullYear();
        }
        else {
            intMonths = (11 - dtBirth.getUTCMonth()) + dtAnniversary.getUTCMonth() + 1;
            intYears = (dtAnniversary.getUTCFullYear() - 1) - dtBirth.getUTCFullYear();
        }
        intSpan = dtAsOfDate - dtAnniversary;
        intWeeks = Math.floor(intSpan / 604800000);
        intSpan = intSpan - (intWeeks * 604800000);
        intDays = Math.floor(intSpan / 86400000);
        intSpan = intSpan - (intDays * 86400000);
        intHours = Math.floor(intSpan / 3600000);
        intSpan = intSpan - (intHours * 3600000);
        intMinutes = Math.floor(intSpan / 60000);
        intSpan = intSpan - (intMinutes * 60000);
        intSeconds = Math.floor(intSpan / 1000);
        if (intYears > 0)
            if (intYears > 1)
                strHowOld = intYears.toString() + ' Years';
            else
                strHowOld = intYears.toString() + ' Year';
        else
            strHowOld = '';
        if (intMonths > 0)
            if (intMonths > 1)
                strHowOld = strHowOld + ' ' + intMonths.toString() + ' Months';
            else
                strHowOld = strHowOld + ' ' + intMonths.toString() + ' Month';
        if (intWeeks > 0)
            if (intWeeks > 1)
                strHowOld = strHowOld + ' ' + intWeeks.toString() + ' Weeks';
            else
                strHowOld = strHowOld + ' ' + intWeeks.toString() + ' Week';
        if (intDays > 0)
            if (intDays > 1)
                strHowOld = strHowOld + ' ' + intDays.toString() + ' Days';
            else
                strHowOld = strHowOld + ' ' + intDays.toString() + ' Day';
        if (intHours > 0)
            if (intHours > 1)
                strHowOld = strHowOld + ' ' + intHours.toString() + ' Hours';
            else
                strHowOld = strHowOld + ' ' + intHours.toString() + ' Hour';
        if (intMinutes > 0)
            if (intMinutes > 1)
                strHowOld = strHowOld + ' ' + intMinutes.toString() + ' Minutes';
            else
                strHowOld = strHowOld + ' ' + intMinutes.toString() + ' Minute';
        if (intSeconds > 0)
            if (intSeconds > 1)
                strHowOld = strHowOld + ' ' + intSeconds.toString() + ' Seconds';
            else
                strHowOld = strHowOld + ' ' + intSeconds.toString() + ' Second';
    }
    else
        strHowOld = '0'
    return strHowOld
}

////Image section
function setFileType() {

    switch (jsid) {
        case "1":
            imgRe = /^.+\.(CSV)$/i;
            imgMsg = "CSV formats allowed only!"
            imgType = "(CSV formats only). Maximum size limit (5 MB). Maximum uploads allowed 1."
            break;
        case "2":
            imgRe = /^.+\.(jpg|jpeg|png)$/i;
            imgMsg = "JPG, JPEG and PNG formats allowed only!"
            imgType = "(JPG, JPEG, PNG formats only). Maximum size limit (5 MB). Recommended fixed ratio (1.52). Maximum uploads allowed 1."
            break;
        case "3":
            imgRe = /^.+\.(pdf)$/i;
            imgMsg = "PDF formats allowed only!"
            imgType = "(PDF formats only). Maximum size limit (10 MB). Maximum uploads allowed 1."
            break;
        case "4":
            imgRe = /^.+\.(avi|mp4|mpeg|mpg)$/i;
            imgMsg = "MP4, AVI, MPEG/MPG formats allowed only!"
            imgType = "(MP4, AVI, MPEG/MPG formats only). Maximum size limit (30 MB). Maximum uploads allowed 1."
            break;
            
        case "5":
            imgRe = /^.+\.(avi|mp4|mpeg|mpg)$/i;
            imgMsg = "URL's only!"
            imgType = "(URL's only). Maximum uploads allowed 1."
            imgType2 = "(URL's only). Maximum uploads allowed 10."
            break;
            
    }
    
}

function viewPic() {


    if (jsdoc != null) {
        if (jsdoc.value.length != 0) {

            var path = jsdoc.value;


            if (jsdocFile.src != "") {

                jsdocFile.src = ""


            }

            jsdocFile.src = 'file://' + jsdoc.value


            if (path.search(imgRe) != -1) {

                jsdocTD.className = "Show"

            }
            else {
                jsdocTD.className = "Hide"
            }


        }
        else {

            jsdocTD.className = "Hide"

            jsdocFile.src = ''

        }
    }
    else {

        jsdocTD.className = "Hide"

        jsdocFile.src = ''
    }
}


function validateType() {

    var result = "No";

    if (jsdoc.value.length != 0) {


        var path = jsdoc.value;
        var isOk = "Yes";


        if (path.search(imgRe) != -1) {

            result = "Yes";

        }
        else {
            alert(imgMsg + " Please supply a valid upload file, " + jsdoc.value + " is not a valid file");
            jsdoc.value = "";
            result = "No";
        }


    }

    return result;
}

function remaneFile(id) {

    if (document.getElementById("changeme") != null) {

        document.getElementById("changeme").id = "AddLogo" + id;
        document.getElementById("AddLogo" + id).name = "AddLogo" + id;
    }
}

function loadMenuHide(type) {

    
    switch (document.getElementById("accessLevel").value) {


        case "Normal":


            document.getElementById("smoothmenu0").className = "Hide";
           
            break;

        case "Super":

            document.getElementById("smoothmenu1").className = "Hide";
            
            break;

        case "SystemAdmin":
            document.getElementById("smoothmenu2").className = "Hide";
            
            break;

        case "Admin":
            document.getElementById("smoothmenu3").className = "Hide";
           
            break;


        case "Body":
        case "Region":
        case "Affiliate":
        case "Association":
        case "Member (Owner)":
        case "Member (Driver)":
        case "Member (Other)":

            document.getElementById("smoothmenu4").className = "Hide";
                      
            break;

        default:
            document.getElementById("smoothmenu0").className = "Hide";
            
            break;

    }
}

function loadMenuShow(type) {


    switch (document.getElementById("accessLevel").value) {


        case "Normal":


            document.getElementById("smoothmenu0").className = "ddsmoothmenu";

            break;

        case "Super":

            document.getElementById("smoothmenu1").className = "ddsmoothmenu";

            break;

        case "SystemAdmin":
            document.getElementById("smoothmenu2").className = "ddsmoothmenu";

            break;

        case "Admin":
            document.getElementById("smoothmenu3").className = "ddsmoothmenu";

            break;


        case "Body":
        case "Region":
        case "Affiliate":
        case "Association":
        case "Member (Owner)":
        case "Member (Driver)":
        case "Member (Other)":

            document.getElementById("smoothmenu4").className = "ddsmoothmenu";

            break;

        default:
            document.getElementById("smoothmenu0").className = "ddsmoothmenu";

            break;

    }
}


function loadMenu(type, taxi, scheme, taxisuper, membersuper, schemesuper, member) {

    document.getElementById("smoothmenu0").className = "Hide";
    document.getElementById("smoothmenu1").className = "Hide";
    document.getElementById("smoothmenu2").className = "Hide";
    document.getElementById("smoothmenu3").className = "Hide";
    document.getElementById("smoothmenu4").className = "Hide";
    //document.getElementById("smoothmenu5").className = "Hide";

    switch (document.getElementById("accessLevel").value) {
    

        case "Normal":
            

            document.getElementById("smoothmenu0").className = "ddsmoothmenu";
            ddsmoothmenu.init({
                mainmenuid: "smoothmenu0", //menu DIV id
                orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
                classname: 'ddsmoothmenu', //class added to menu's outer DIV
                //customtheme: ["#1c5a80", "#18374a"],
                contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
            })

            break;

        case "Super":

            document.getElementById("smoothmenu1").className = "ddsmoothmenu";
            ddsmoothmenu.init({
                mainmenuid: "smoothmenu1", //menu DIV id
                orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
                classname: 'ddsmoothmenu', //class added to menu's outer DIV
                //customtheme: ["#1c5a80", "#18374a"],
                contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
            })

            

            break;

        case "SystemAdmin":
            document.getElementById("smoothmenu2").className = "ddsmoothmenu";
            ddsmoothmenu.init({
                mainmenuid: "smoothmenu2", //menu DIV id
                orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
                classname: 'ddsmoothmenu', //class added to menu's outer DIV
                //customtheme: ["#1c5a80", "#18374a"],
                contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
            })
            break;

        case "Admin":
            document.getElementById("smoothmenu3").className = "ddsmoothmenu";
            ddsmoothmenu.init({
                mainmenuid: "smoothmenu3", //menu DIV id
                orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
                classname: 'ddsmoothmenu', //class added to menu's outer DIV
                //customtheme: ["#1c5a80", "#18374a"],
                contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
            })


            try {
                if (taxi == "False") {
                    $('#moduleTaxi1').hide();
                }

            }
            catch (e)
               { }

            try {
                if (scheme == "False") {
                    $('#moduleScheme1').hide();
                }

            }
            catch (e)
               { }

               try {
                   if (member == "False") {
                       $('#moduleM12').hide();
                   }

               }
               catch (e)
               { }

            try {
                if (schemesuper == "False") {

                    $('#moduleS1U').hide();
                    $('#moduleS1R').hide();
                    $('#moduleS11').hide();
                    $('#moduleS12').hide();
                    $('#moduleS13').hide();

                    $('#moduleS15').hide();
                    $('#moduleS16').hide();
                    $('#moduleS120').hide();
                    $('#moduleS130').hide();
                }

            }
            catch (e)
               { }

            try {
                if (taxisuper == "False") {
                    $('#moduleT11').hide();
                }

            }
            catch (e)
               { }

            try {
                if (membersuper == "False") {
                    $('#moduleM11').hide();
                    
                }

            }
            catch (e)
               { }



            break;


        case "Body":
        case "Region":
        case "Affiliate":
        case "Association":
        case "Member (Owner)":
        case "Member (Driver)":
        case "Member (Other)":
        
            document.getElementById("smoothmenu4").className = "ddsmoothmenu";
            ddsmoothmenu.init({
                mainmenuid: "smoothmenu4", //menu DIV id
                orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
                classname: 'ddsmoothmenu', //class added to menu's outer DIV
                //customtheme: ["#1c5a80", "#18374a"],
                contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
            })

            try {
                if (taxi == "False") {
                    $('#moduleTaxi2').hide();
                }

            }
            catch (e)
               { }

            try {
                if (scheme == "False") {
                    $('#moduleScheme2').hide();
                }

            }
            catch (e)
               { }

               try {
                   if (member == "False") {
                       $('#moduleM22').hide();
                   }

               }
               catch (e)
               { }

               try {
                   if (schemesuper == "False") {
                       $('#moduleS2U').hide();
                       $('#moduleS2R').hide();
                       $('#moduleS21').hide();
                       $('#moduleS22').hide();
                       $('#moduleS23').hide();

                       $('#moduleS25').hide();
                       $('#moduleS26').hide();
                       $('#moduleS220').hide();
                       $('#moduleS230').hide();
                   }

               }
               catch (e)
               { }

               try {
                   if (taxisuper == "False") {
                       $('#moduleT21').hide();
                   }

               }
               catch (e)
               { }

               try {
                   if (membersuper == "False") {
                       $('#moduleM21').hide();
                   }

               }
               catch (e)
               { }
            break;


        default:
            document.getElementById("smoothmenu0").className = "ddsmoothmenu";
            ddsmoothmenu.init({
                mainmenuid: "smoothmenu0", //menu DIV id
                orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
                classname: 'ddsmoothmenu', //class added to menu's outer DIV
                //customtheme: ["#1c5a80", "#18374a"],
                contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
            })
            break;

    }
}

//This does the Check on the YouTube ID

function ytVidId(url) {

    try {
        var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;

        if (url.match(p)) {

            jsdoc.value = "http://www.youtube.com/embed/" + RegExp.$1 + "?wmode=opaque&rel=1";

        }

        return (url.match(p)) ? true : false;

    }
    catch (e) {

        return false;

    }


}

function textCounter(textarea, counterID, maxLen, display) {

    if (display) {
        cnt = document.getElementById(counterID);
    }

    if (textarea.value.length > maxLen) {
        textarea.value = textarea.value.substring(0, maxLen);
    }

    if (display) {
        cnt.innerHTML = maxLen - textarea.value.length;
    }
}







