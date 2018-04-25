using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class DeliveryContext
    {
        
        public string ConnectionString {get; set;}

        public DeliveryContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<Delivery> GetDelivery()
        {
            List<Delivery> list = new List<Delivery>();

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand();
                var command = "select * from Levering;";
                cmd = new MySqlCommand(command, conn);
                //cmd.ExecuteNonQuery();
                
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Delivery
                        {
                            Order_id = Convert.ToInt32(reader["bestilling_bestilling_id"]),
                            DeliveryDate = (DateTime)reader["leveringsdato"],
                            DeliveryLocation = Convert.ToInt32(reader["leveringssted"])
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }

        public void postDelivery(Delivery Delivery)
        {
            if (Delivery == null)
            {
                throw new ArgumentNullException(nameof(Delivery));
            }

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "insert into Levering(bestilling_bestilling_id, leveringsdato, leveringssted) values(@Delivery.Order_id, @Delivery.DeliveryDate, @Delivery.DeliveryLocation);";
                cmd.Parameters.AddWithValue("@Delivery.Order_id", Delivery.Order_id);
                cmd.Parameters.AddWithValue("@Delivery.DeliveryDate", Delivery.DeliveryDate);
                cmd.Parameters.AddWithValue("@Delivery.DeliveryLocation", Delivery.DeliveryLocation);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<Delivery> GetDelivery(int id)
        {
            List<Delivery> list = new List<Delivery>();
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from levering where bestilling_bestilling_id = @id;";
                 cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Delivery
                        {
                            Order_id = Convert.ToInt32(reader["bestilling_bestilling_id"]),
                            DeliveryDate = (DateTime)reader["leveringsdato"],
                            DeliveryLocation = Convert.ToInt32(reader["leveringssted"])
                        });
                    }
                }
                 conn.Close();
            }
            return list;
        }

        public void deleteDelivery(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from Delivery where id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void UpdateDelivery(int id, Delivery Delivery)
        {
             using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update Levering set leveringsdato=@Delivery.DeliveryDate, leveringssted=@Delivery.DeliveryLocation where bestilling_bestilling_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@Delivery.DeliveryDate", Delivery.DeliveryDate);
                cmd.Parameters.AddWithValue("@Delivery.DeliveryLocation", Delivery.DeliveryLocation);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        
    }    
}