<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Outsurance Assessement</title>
    
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

        function load_CreateForm() {
            $(function () {
                $("#LoadData").load("CreateFiles.aspx");
            });
        }

    </script>


    <form id="frmOutsurance">
        <div class="container-fluid">
            
            <div id="LoadData" class="row" style="border:1px solid #000;align-content:center">
    
            </div>
        </div>
    </form>

    <script type="text/javascript">
        load_CreateForm();
    </script>

</body>
</html>
