using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace api.Models
{
    public class DeliveryContext
    {

        public string ConnectionString { get; set; }

        public DeliveryContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        private List<Delivery> DeliveryReaderForQuerry(string command)
        {
            List<Delivery> list = new List<Delivery>();
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
            }
            catch (MySqlException e)
            {
                throw e;
            }
            return list;
        }

        private void AddDeliveryParametersForQuerry(string command, Delivery Delivery)
        {
             try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = command;
                    cmd.Parameters.AddWithValue("@Delivery.Order_id", Delivery.Order_id);
                    cmd.Parameters.AddWithValue("@Delivery.DeliveryDate", Delivery.DeliveryDate);
                    cmd.Parameters.AddWithValue("@Delivery.DeliveryLocation", Delivery.DeliveryLocation);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (MySqlException e)
            {
                throw e;
            }
        }

        public List<Delivery> GetDelivery()
        {
            List<Delivery> list = DeliveryReaderForQuerry("select * from Levering;");
            return list;
        }

        public List<Delivery> GetDeliveryById(int id)
        {
            List<Delivery> list = DeliveryReaderForQuerry("select * from levering where bestilling_bestilling_id =" + id.ToString() + ";");
            return list;
        }
        public void postDelivery(Delivery Delivery)
        {
            AddDeliveryParametersForQuerry(
                "insert into Levering(bestilling_bestilling_id, leveringsdato, leveringssted) values(@Delivery.Order_id, @Delivery.DeliveryDate, @Delivery.DeliveryLocation);",
                Delivery
            );
        }


        public void UpdateDelivery(int id, Delivery Delivery)
        {
            AddDeliveryParametersForQuerry(
                "update Levering set leveringsdato=@Delivery.DeliveryDate, leveringssted=@Delivery.DeliveryLocation where bestilling_bestilling_id=" + id.ToString() + ";",
                Delivery
            );
        }

        public void deleteDelivery(int id)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "delete from Levering where bestilling_bestilling_id=@id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (MySqlException e)
            {
                throw e;
            }
        }
    }
}