using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace api.Models
{
    public class BikeAndOrderContext
    {

        public string ConnectionString { get; set; }

        public BikeAndOrderContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        private List<BikeAndOrder> BikeAndOrderReaderForQuerry(string command)
        {
            List<BikeAndOrder> list = new List<BikeAndOrder>();
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand();
                    cmd = new MySqlCommand(command, conn);
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
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
            }
            catch (MySqlException e)
            {
                throw e;
            }
            return list;
        }

        private void AddBikeAndOrderParametersForQuerry(string command, BikeAndOrder BikeAndOrder)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = command;
                    cmd.Parameters.AddWithValue("@BikeAndOrder.Bike_id", BikeAndOrder.Bike_id);
                    cmd.Parameters.AddWithValue("@BikeAndOrder.Order_id", BikeAndOrder.Order_id);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }

            }
            catch (MySqlException e)
            {
                throw e;
            }
        }

        public List<BikeAndOrder> GetBikeAndOrders()
        {
            List<BikeAndOrder> list = BikeAndOrderReaderForQuerry("select * from Utstyr_has_bestilling;");
            return list;
        }

        public List<BikeAndOrder> GetBikeAndOrderById(int id)
        {
            List<BikeAndOrder> list = BikeAndOrderReaderForQuerry("select * from Utstyr_has_bestilling where bestilling_bestilling_id = " + id.ToString() + ";");
            return list;
        }
        public List<BikeAndOrder> GetEquipmentByOrder(int id)
        {
            List<BikeAndOrder> list = BikeAndOrderReaderForQuerry("select * from Utstyr_has_bestilling where bestilling_bestilling_id=" + id.ToString() + ";");
            return list;
        }
        public void postBikeAndOrder(BikeAndOrder BikeAndOrder)
        {
            AddBikeAndOrderParametersForQuerry(
                "insert into Utstyr_has_bestilling(utstyr_utstyr_id, bestilling_bestilling_id) values(@BikeAndOrder.Bike_id, @BikeAndOrder.Order_id);",
                BikeAndOrder
            );
        }


        public void UpdateBikeAndOrder(int bikeId, BikeAndOrder BikeAndOrder)
        {
            AddBikeAndOrderParametersForQuerry(
                "update Utstyr_has_bestilling set bestilling_bestilling_id=@BikeAndOrder.Order_id where bestilling_bestilling_id=" + bikeId.ToString() + ";",
                BikeAndOrder
            );
        }

        public void deleteBikeAndOrder(int orderId)
        {
            try
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
            catch (MySqlException e)
            {
                throw e;
            }
        }

        //please note that this function updates ALL bike_ids given specific order_id. ANother similar function may be needed


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