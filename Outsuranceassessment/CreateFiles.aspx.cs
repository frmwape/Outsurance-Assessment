using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Outsurance;
using System.IO;

public partial class CreateFiles : System.Web.UI.Page
{
    private string strAction;
    private string strTheFeedback;

    public string TheFeedback { get { return strTheFeedback; } }

    public string TheAction { get { return strAction; } }
    protected void Page_Load(object sender, EventArgs e)
    {
        string strMethod = Request.ServerVariables["REQUEST_METHOD"];
        strAction = "";
        strTheFeedback = "";

        if (strMethod == "GET")
        {

            strAction = Request.QueryString["performAction"];

        }
        else
        {

            strAction = Request.Form["performAction"];

        }

        if (strAction == "Process")
        {
            clsProcess objProcess = new clsProcess();
            bool processFile = false;
            objProcess.Upload = Request.Files["uploadFile"];

            if (objProcess.Upload.ContentLength > 0)
            {
                objProcess.FileName = Path.GetFileName(objProcess.Upload.FileName);
                objProcess.Limit = 5000000;

                if (objProcess.IsCorrectSize())
                {
                    objProcess.FileExt = Path.GetExtension(objProcess.Upload.FileName);
                    objProcess.ServerPath = Server.MapPath("System_Files");
                    objProcess.FolderPath = "FileWorkspace";
                    objProcess.FileSaveExt = "txt";
                    
                    //First thing I do is set up the working environment and data to work with. FCM 17/01/2017
                    if (objProcess.CreateWorkSpace())
                    {
                        if (objProcess.CreateFileSpace())
                        {
                            if (objProcess.SetFile())
                            {
                                processFile = true;
                            }
                            else
                            {
                                strTheFeedback = "Failed to read file! ";
                            }
                        }
                        else
                        {
                            strTheFeedback = "Failed to create workspace file! ";
                        }
                    }
                    else
                    {
                        strTheFeedback = "Failed to create processing workspace! ";
                    }

                }
                else
                {
                    strTheFeedback = "CSV file " + objProcess.FileName + " exceeds the " + (objProcess.Limit / 1000000) + " mb upload limit! ";
                }

                //If Data and working environment is okay, I proceed to processing the creation of the two files from collected data
                if (processFile)
                {
                    objProcess.ProceesType = "frequency";
                    objProcess.ProcessData();

                    objProcess.ProceesType = "address";
                    objProcess.ProcessData();
                }

                if (objProcess.Error)
                {

                    strTheFeedback = objProcess.ErrorMessage.Replace("\r\n", " ");
                }
                else
                {
                    strTheFeedback = objProcess.FeedbackMessage.Replace("\r\n", " ");
                }
                objProcess.CleanObjects();
                objProcess.DeleteFileSpace();
            }

            objProcess.Dispose();
            objProcess = null;
        }
    }
}