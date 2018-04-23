namespace  api.Models
{
    //Bestilling-tabellen
    public class Order
    {
        public int Order_id {get; set;}
        public string Price {get; set;}
        public int IsGroupOrder {get; set;}
        public int Customer_id {get; set;}
        public int Employee_id {get; set;}
        public DateTime OrderDate {get; set;}
        public DateTime IsAvailableFrom {get; set;}
        public DateTime MustBeDeliveredBefore {get; set;}
    }
}