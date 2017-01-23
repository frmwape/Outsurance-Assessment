using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;
using System.Collections;
using System.Text;


namespace Outsurance
{
    /// <summary>
    /// Summary description for clsProcess
    /// </summary>
    public class clsProcess : clsOutBase
    {
       
        StreamReader Reader;
        private string _ServerPath;
        private string _FolderPath;
        private string _FileNameCount;
        private string _FileAddress;
        private string _FileExt;
        private string _FileSaveExt;
        private DateTime _FileDateStamp;
        private string _FileName;
        private string _ProceesType;
        private string _ColumnHeader;
        private bool _ColumnFound;
        private HttpPostedFile _Upload;
        private long _Limit;
        private DataTable dtblRAWCSVData;
        private DataRow drowCSV;
        private long _RowCount;

        private int _ColumnCountChecks;
        private int _ColumnPostion;
       

        public bool ColumnFound { set { _ColumnFound = value; } }
        public string ProceesType { set { _ProceesType = value; } }
        public int ColumnCountChecks { set { _ColumnCountChecks = value; } }
        public string ColumnHeader { set { _ColumnHeader = value; } }
        public string ServerPath { set { _ServerPath = value; } }
        public string FolderPath { set { _FolderPath = value; } }
        public string FileNameCount { set { _FileNameCount = value; } }
        public string FileAddress { set { _FileAddress = value; } }

        public string FileSaveExt { set { _FileSaveExt = value; } }
        public string FileExt { get { return _FileExt; } set { _FileExt = value; } }
        public string FileName { get { return _FileName; } set { _FileName = value; } }
        public long Limit { get { return _Limit; } set { _Limit = value; } }
        public HttpPostedFile Upload { get { return _Upload; } set { _Upload = value; } }

        public clsProcess()
        {
            Reader = null;
            _FileDateStamp = DateTime.Now;
            _RowCount = 0;
        }
        
        public bool CreateWorkSpace()
        {
            bool result = false;
            
            if (Directory.Exists(_ServerPath + "\\" + _FolderPath))
            {
                result = true;

            }
            else
            {
                Directory.CreateDirectory(_ServerPath + "\\" + _FolderPath);
                if (Directory.Exists(_ServerPath + "\\" + _FolderPath))
                {
                    result = true;

                }

            }
            
            return result;
        }

        public bool CreateFileSpace()
        {
            bool result = false;


            if (File.Exists(_ServerPath + "\\" + _FolderPath + "\\" + _FileDateStamp.ToString("ddMMMMyyyyHHmmss") + _FileName))
            {
                result = true;

            }
            else
            {
                _Upload.SaveAs(_ServerPath + "\\" + _FolderPath + "\\" + _FileDateStamp.ToString("ddMMMMyyyyHHmmss") + _FileName);
                if (File.Exists(_ServerPath + "\\" + _FolderPath + "\\" + _FileDateStamp.ToString("ddMMMMyyyyHHmmss") + _FileName))
                {
                    result = true;

                }

            }


            return result;
        }

        public void DeleteFileSpace()
        {

            if (File.Exists(_ServerPath + "\\" + _FolderPath + "\\" + _FileDateStamp.ToString("ddMMMMyyyyHHmmss") + _FileName))
            {
                File.Delete(_ServerPath + "\\" + _FolderPath + "\\" + _FileDateStamp.ToString("ddMMMMyyyyHHmmss") + _FileName);
            }

        }

        public void CleanObjects()
        {
            try
            {
                Reader.Close();
                Reader = null;
            }
            catch
            { }

            try
            {
                
                   drowCSV = null;
            }
            catch
            { }

            try
            {
                dtblRAWCSVData.Dispose();
                dtblRAWCSVData = null;
            }
            catch
            { }
        }
        public bool SetFile()
        {
            bool result = false;
            _ColumnCountChecks = 0;
            try
            {
                Reader = new System.IO.StreamReader(_ServerPath + "\\" + _FolderPath + "\\" + _FileDateStamp.ToString("ddMMMMyyyyHHmmss") + _FileName, Encoding.Default);
                dtblRAWCSVData = new DataTable();
                while (Reader.Peek() >= 0)
                {
                    _ColumnFound = false;
                    string[] DelimitedValues = GetFileLine(Reader.ReadLine());

                    if (DelimitedValues.Length > 0 && DelimitedValues[0].Length > 0)
                    {
                        //In this section I create the datatable colums, and datarows to be used for the process. FCM 17/01/2017
                        //First create my columns for my datatable.

                        foreach (string ColumnName in DelimitedValues)
                        {
                            //This check helps determine if I'm dealing with a column header or just a normal row. FCM 17/01/2017
                            switch (ColumnName.ToLower().Replace(" ", "").Trim())
                            {
                                case "firstname":
                                case "lastname":
                                case "address":
                                case "phonenumber":
                                    _ColumnCountChecks += 1;
                                    dtblRAWCSVData.Columns.Add(ColumnName);
                                    _ColumnFound = true;

                                    break;
                            }
                        }

                        if (!_ColumnFound)
                        {

                            //If it's not a column header than it's a row, we add record to datatable
                            drowCSV = dtblRAWCSVData.NewRow();
                            
                            for (int counter = 0; counter < dtblRAWCSVData.Columns.Count; counter++)
                            {

                                if (counter < DelimitedValues.Length)
                                {
                                    DelimitedValues[counter] = DelimitedValues[counter].Replace("\r\n", "\n");
                                    drowCSV[counter] = DelimitedValues[counter].Replace("\n", "\r\n");
                                }
                                else
                                {
                                    drowCSV[counter] = string.Empty;
                                }

                            }

                            try
                            {
                                dtblRAWCSVData.Rows.Add(drowCSV);
                                result = true;

                            }
                            catch (Exception ex)
                            {
                                result = false;
                                Error = true;
                                ErrorMessage += "<font color='red'><b>failed to process due to error: (" + ex.Message + ")</b></font> ";
                                break;
                            }
                            

                        }
                    }
                }
                
            }
            catch (Exception ex)
            {
                result = false;
                Error = true;
                ErrorMessage = "Class Reporting: " + TheClass + ". The following database error has occured: " + ex.Message + ". Source: " + ex.Source;

            }

            return result;
        }

        public bool IsCorrectSize()
        {
            bool result = false;

            if (_Upload.ContentLength <= _Limit)
            {

                result = true;
            }

            return result;
        }

        
        public void ProcessData()
        {

            DataTable dbProcess = new DataTable();
            try
            {

                switch (_ProceesType)
                {
                    case "frequency":

                        if (dtblRAWCSVData != null)
                        {

                            if (dtblRAWCSVData.Rows.Count > 0)
                            {
                                //Set the data I require to work on the frequency section, I do this so I can have the first 
                                // and last name in the same field for the linq sort. FCM 18/01/2017
                                dbProcess.Columns.Add("Name");

                                for (int i = 0; i < dtblRAWCSVData.Rows.Count; i++)
                                {
                                    //FirstName Info
                                    drowCSV = dbProcess.NewRow();
                                    drowCSV[0] = dtblRAWCSVData.Rows[i]["FirstName"];
                                    dbProcess.Rows.Add(drowCSV);

                                    //LastName Info
                                    drowCSV = dbProcess.NewRow();
                                    drowCSV[0] = dtblRAWCSVData.Rows[i]["LastName"];
                                    dbProcess.Rows.Add(drowCSV);
                                }


                                //So that now the data is set we query frequency of the first and last names ordered by frequency descending and then alphabetically ascending. 
                                //This required a ling query to achieve. FCM 17/01/2017
                                var dtSortData = from row in dbProcess.AsEnumerable()
                                                 group row by row.Field<string>("Name") into grp
                                                 orderby grp.Key ascending
                                                 orderby grp.Count() descending
                                                 
                                                 select new
                                                 {
                                                     GroupCount = grp.Count(),
                                                     Name = grp.Key

                                                 };

                                using (System.IO.StreamWriter file =
                                new System.IO.StreamWriter(_ServerPath + "\\" + _FolderPath + "\\frequency" + _FileDateStamp.ToString("ddMMMMyyyyHHmmss") + ".txt"))
                                {
                                    foreach (var t in dtSortData)
                                    {

                                        file.WriteLine(t.Name + ", " + t.GroupCount);
                                    }
                                }

                            }
                            else
                            {

                                Error = true;
                                ErrorMessage = "<font color='red'><b>No clean data on file found for import!</b></font> ";
                            }

                        }

                        break;

                    case "address":

                        if (dtblRAWCSVData != null)
                        {

                            if (dtblRAWCSVData.Rows.Count > 0)
                            {
                                //Set the data I require to work on the address section, I seperate the address so I can use the street  
                                // number as an integer to sort properly in linq. FCM 18/01/2017
                                dbProcess.Columns.Add("StreetNumber");
                                dbProcess.Columns.Add("StreetName");
                               
                                string theValue;
                                long testNumber = 0;
                                string theNumber = "";
                                string theStreet = "";
                                
                                for (int i = 0; i < dtblRAWCSVData.Rows.Count; i++)
                                {
                                    
                                    theValue = dtblRAWCSVData.Rows[i]["Address"].ToString().Trim();
                                    theNumber = "";
                                    theStreet = "";
                                    for (int x = 0; x < theValue.Length; x++)
                                    {
                                        //Separating the street number and name
                                        try
                                        {
                                            testNumber = Convert.ToInt32(theValue.Substring(x, 1));
                                            theNumber += theValue.Substring(x, 1);
                                        }
                                        catch
                                        {
                                            theStreet += theValue.Substring(x, 1);
                                        }
                                    }


                                    drowCSV = dbProcess.NewRow();
                                    //StreetNumber info
                                    drowCSV[0] = theNumber;
                                    //StreetName Info
                                    drowCSV[1] = theStreet;
                                    dbProcess.Rows.Add(drowCSV);


                                }
                                
                                //Copy and sort data
                                DataTable ordered = dbProcess.AsEnumerable()
                                         .OrderBy(r => int.Parse(r.Field<string>("StreetNumber")))
                                         .CopyToDataTable();

                                using (System.IO.StreamWriter file =
                                new System.IO.StreamWriter(_ServerPath + "\\" + _FolderPath + "\\address" + _FileDateStamp.ToString("ddMMMMyyyyHHmmss") + ".txt"))
                                {
                                    for (int y = 0; y< ordered.Rows.Count; y++)
                                    {

                                        file.WriteLine(ordered.Rows[y]["StreetNumber"] + " " + ordered.Rows[y]["StreetName"]);
                                    }
                                }
                                FeedbackMessage = "Successfully processed file, path: " + _ServerPath + "\\" + _FolderPath;
                            }
                            
                            else
                            {

                                Error = true;
                                ErrorMessage = "<font color='red'><b>No clean data on file found for import!</b></font> ";
                            }

                        }

                        break;


                }

            }
            catch (Exception ex)
            {
                Error = true;
                ErrorMessage = "Class Reporting: " + TheClass + ". The following database error has occured: " + ex.Message + ". Source: " + ex.Source;
                
            }

            dbProcess.Dispose();
            dbProcess = null;


        }

        public string[] GetFileLine(string data)
        {

            if (data == null) return null;

            if (data.Length == 0) return new string[0];

            ArrayList result = new ArrayList();

            ParseFileData(result, data);

            return (string[])result.ToArray(typeof(string));

        }

        private void ParseFileData(ArrayList result, string data)
        {

            int position = -1;

            while (position < data.Length)
                result.Add(ParseFileField(ref data, ref position));

        }
        
        private string ParseFileField(ref string data, ref int StartSeperatorPos)
        {

            if (StartSeperatorPos == data.Length - 1)
            {

                StartSeperatorPos++;

                return "";
            }
            
            int fromPos = StartSeperatorPos + 1;

            if (data[fromPos] == '"')
            {

                int nextSingleQuote = GetSingleQuote(data, fromPos + 1);

                int lines = 1;
                while (nextSingleQuote == -1)
                {
                    data = data + "\n" + Reader.ReadLine();
                    nextSingleQuote = GetSingleQuote(data, fromPos + 1);
                    lines++;

                    if (lines > 200)
                        throw new Exception("lines overflow: " + data);
                }

                StartSeperatorPos = nextSingleQuote + 1;

                string tempString = data.Substring(fromPos + 1, nextSingleQuote - fromPos - 1);
                tempString = tempString.Replace("'", "''");

                return tempString.Replace("\"\"", "\"");

            }
            
            int nextComma = data.IndexOf(',', fromPos);
            if (nextComma == -1)
            {

                StartSeperatorPos = data.Length;
                return data.Substring(fromPos);

            }

            else
            {

                StartSeperatorPos = nextComma;
                return data.Substring(fromPos, nextComma - fromPos);
            }
        }
        
        private int GetSingleQuote(string data, int SFrom)
        {

            int i = SFrom - 1;
            while (++i < data.Length)

                if (data[i] == '"')
                {

                    if (i < data.Length - 1 && data[i + 1] == '"')
                    {

                        i++;
                        continue;

                    }

                    else
                        return i;

                }
            return -1;
        }

        
    }

}