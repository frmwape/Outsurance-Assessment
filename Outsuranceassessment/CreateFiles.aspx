<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CreateFiles.aspx.cs" Inherits="CreateFiles" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script src="jsfiles/UseFunctions.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="App_Themes/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="App_Themes/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="App_Themes/bootstrap-theme.css">
    <link rel="stylesheet" type="text/css" href="App_Themes/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="App_Themes/style.css">

    <script src="js/bootstrap.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="jquery/js/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="jquery/js/jquery-ui-1.8.17.custom.min.js"></script>
</head>
<body>

     <script type="text/javascript">

         function goValidate(theid) {
             var isFine = "";
             this.jsdoc = null;
             this.jsdocFile = null;
             this.jsdocTD = null;
             var result = "No";
             document.getElementById("processBTN").style.display = "none";

             document.getElementById("Messages").innerHTML = "";

             try {
                 if (document.getElementById(theid).value.length != 0) {
                     this.jsid = "1";
                     this.setFileType();

                     this.jsdoc = document.getElementById(theid);
                     this.isFine = validateType();

                     result = this.isFine;
                     if (this.isFine == "Yes") {

                         document.getElementById("processBTN").style.display = "block";
                         var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

                         if (!isChrome) {
                             if (document.getElementById(theid).value.indexOf("fakepath") != -1) {
                                 this.jsdoc = null;
                                 document.getElementById(theid).value = "";
                             }
                         }

                     }
                     else {

                         document.getElementById(theid).value = "";
                         this.jsdoc = null;
                         
                     }
                 }
                 else {
                     this.jsdoc = null;
                                          this.viewPic();
                 }
             }
             catch (e)
             { }

             if (this.jsdocFile != null) {
                 this.jsdocFile = null;
             }

             if (this.jsdoc != null) {
                 this.jsdoc = null;
             }
             if (this.jsdocTD != null) {
                 this.jsdocTD = null;
             }

             return result;



         }

         function goProcess(theaction) {
            
             var canContinue = false;
             canContinue = confirm("Are you sure you want to process this CSV file! ");
             
             if (canContinue) {
                
                 document.getElementById("frmOutsurance").action = "CreateFiles.aspx";
                 document.getElementById("frmOutsurance").method = "post";
                 document.getElementById("frmOutsurance").target = "_self"
                 document.getElementById("performAction").value = theaction;
                 document.getElementById("processBTN").style.display = "none";

                 document.getElementById("Messages").innerHTML = "Processing file, please wait....";
                 document.getElementById("frmOutsurance").submit()


             }
         }

         function goInitialise() {

             
                 document.getElementById("frmOutsurance").action = "CreateFiles.aspx";
                 document.getElementById("frmOutsurance").method = "post";
                 document.getElementById("frmOutsurance").target = "_self"
                 document.getElementById("performAction").value = "";
                 document.getElementById("processBTN").style.display = "none";

                 document.getElementById("Messages").innerHTML = "Processing file, please wait initialising....";
                 document.getElementById("frmOutsurance").submit()


             
         }

    </script>

    <form id="frmOutsurance" enctype="multipart/form-data">
        <input type="hidden" id="performAction" name="performAction" value="" />

        <div class="container-fluid">
            <div class="row" style="border:1px solid #000;">
                <div class="bg-white">
                    <img src="Images\Out.png" alt="" style="width:30%;" /> Frank Chishimba Mwape Assessment
                </div>

            </div>
            <div class="row" style="border:1px solid #000;align-content:center">
                <table>
                    <tr>
                      
                      <td>Select csv file and then process...... </td>
                      <td><input type="file" id="uploadFile" name="uploadFile" onchange="goValidate(this.id)"  class="TextBox" runat="server" /></td>
                      <td><input type="button" id="processBTN" class="Button" style="display:none" value="Process CSV File" onclick="goProcess('Process')"/></td>
                      <td id="Messages"><%=TheFeedback%></td>
                      
                    </tr>
                </table>
            </div>
       </div>
    </form>

    <%if (TheAction == null)
      { %>
        <script type="text/javascript">
        
            goInitialise()

        </script>
    <%}%>
</body>
</html>
