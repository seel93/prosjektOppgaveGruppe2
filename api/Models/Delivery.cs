namespace  api.Models
{
    public class Delivery
    {
        public int Order_id {get; set;}
        public DateTime DeliveryDate {get; set;}
        public int DeliveryLocation {get; set;}
    }
}