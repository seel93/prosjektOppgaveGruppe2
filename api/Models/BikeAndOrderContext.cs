using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class BikeAndOrderContext
    {
        
        public string ConnectionString {get; set;}

        public BikeAndOrderContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<BikeAndOrder> GetBikeAndOrder()
        {
            List<BikeAndOrder> list = new List<BikeAndOrder>();

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand();
                var command = "select * from Utstyr_has_bestilling;";
                cmd = new MySqlCommand(command, conn);
                //cmd.ExecuteNonQuery();
                
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new BikeAndOrder
                        {
                            Bike_id = Convert.ToInt32(reader["utstyr_utstyr_id"]),
                            Order_id = Convert.ToInt32(reader["bestilling_bestilling_id"])
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }

        public void postBikeAndOrder(BikeAndOrder BikeAndOrder)
        {
            if (BikeAndOrder == null)
            {
                throw new ArgumentNullException(nameof(BikeAndOrder));
            }

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "insert into Utstyr_has_bestilling(utstyr_utstyr_id, bestilling_bestilling_id) values(@BikeAndOrder.Bike_id, @BikeAndOrder.Order_id);";
                cmd.Parameters.AddWithValue("@BikeAndOrder.Bike_id", BikeAndOrder.Bike_id);
                cmd.Parameters.AddWithValue("@BikeAndOrder.Order_id", BikeAndOrder.Order_id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<BikeAndOrder> GetBikeAndOrder(int id)
        {
            List<BikeAndOrder> list = new List<BikeAndOrder>();
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Utstyr_has_bestilling where bestilling_bestilling_id = @id;";
                cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new BikeAndOrder
                        {
                            Bike_id = Convert.ToInt32(reader["utstyr_utstyr_id"]),
                            Order_id = Convert.ToInt32(reader["bestilling_bestilling_id"])
                        });
                    }
                }
                 conn.Close();
            }
            return list;
        }

        //Delete all data with given Order_id
        public void deleteBikeAndOrder(int orderId)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from Utstyr_has_bestilling where bestilling_bestilling_id=@id";
                cmd.Parameters.AddWithValue("@id", orderId);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        //please note that this function updates ALL bike_ids given specific order_id. ANother similar function may be needed
        public void UpdateBikeAndOrder(int bikeId, BikeAndOrder BikeAndOrder)
        {
             using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update Utstyr_has_bestilling set bestilling_bestilling_id=@BikeAndOrder.Order_id where bestilling_bestilling_id=@id";
                cmd.Parameters.AddWithValue("@id", bikeId);
                cmd.Parameters.AddWithValue("@BikeAndOrder.Order_id", BikeAndOrder.Order_id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }


        // //maybe this will be useful later
        // public void UpdateBikeAndOrder(int orderId, BikeAndOrder BikeAndOrder)
        // {
        //      using (MySqlConnection conn = new MySqlConnection(ConnectionString))
        //     {
        //         conn.Open();
        //         MySqlCommand cmd = conn.CreateCommand();
        //         cmd.CommandText = "update Utstyr_has_bestilling set utstyr_utstyr_id=@BikeAndOrder.Bike_id where id=@id";
        //         cmd.Parameters.AddWithValue("@id", orderId);
        //         cmd.Parameters.AddWithValue("@BikeAndOrder.Bike_id", BikeAndOrder.Bike_id);
        //         cmd.ExecuteNonQuery();
        //         conn.Close();
        //     }
        // }

        
    }    
}