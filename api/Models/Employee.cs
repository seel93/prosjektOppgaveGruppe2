namespace  api.Models
{
    //ansatt-tabellen
    public class Employee
    {
        public int Employee_id {get; set;}
        public string Position {get; set;}
        public int IsFulltime {get; set;}
        public int Salary {get; set;}
        public int Location {get; set;}
        public string Password {get; set;}
    }
}