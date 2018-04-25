namespace  api.Models
{
    //Sykkel- og utstyrtabell
    public class Bike
    {
        public int Bike_id {get; set;}
        public string Type {get; set;}
        public double DailyPrice {get; set;}
        public double HourPrice {get; set;}
        public string EquipmentCode {get; set;}
        public int LastSeenOnPlace {get; set;} //FK
        public int BelongsToPlace {get; set;} //FK
        public string WheelSize {get; set;}
        public string Frame {get; set;}
        public string STATUS {get; set;}
    }
}