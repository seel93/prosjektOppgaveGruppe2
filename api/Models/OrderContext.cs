using api.models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace api.Models
{
    public class OrderContext
    {

        public string ConnectionString { get; set; }

        public OrderContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        private List<Order> OrderReaderForQuerry(string command)
        {
            List<Order> list = new List<Order>();

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand();
                cmd = new MySqlCommand(command, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Order
                        {
                            Order_id = Convert.ToInt32(reader["bestilling_id"]),
                            Price = reader["pris"].ToString(),
                            IsGroupOrder = Convert.ToInt32(reader["gruppe"]),
                            Customer_id = Convert.ToInt32(reader["Kunde_kunde_id"]),
                            Employee_id = Convert.ToInt32(reader["ansatt_ansatt_id"]),
                            OrderDate = (DateTime)reader["bestillingsdato"],
                            IsAvailableFrom = (DateTime)reader["kan_hentes"],
                            MustBeDeliveredBefore = (DateTime)reader["maa_leveres_foer"]
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }

        private void AddOrderParamtersForQuerry(string command, Order Order)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = command;
                cmd.Parameters.AddWithValue("@Order.Order_id", Order.Order_id);
                cmd.Parameters.AddWithValue("@Order.Price", Order.Price);
                cmd.Parameters.AddWithValue("@Order.IsGroupOrder", Order.IsGroupOrder);
                cmd.Parameters.AddWithValue("@Order.Customer_id", Order.Customer_id);
                cmd.Parameters.AddWithValue("@Order.Employee_id", Order.Employee_id);
                cmd.Parameters.AddWithValue("@Order.OrderDate", Order.OrderDate);
                cmd.Parameters.AddWithValue("@Order.IsAvailableFrom", Order.IsAvailableFrom);
                cmd.Parameters.AddWithValue("@Order.MustBeDeliveredBefore", Order.MustBeDeliveredBefore);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<Order> GetOrders()
        {
            List<Order> list = OrderReaderForQuerry("select * from bestilling;");
            return list;
        }

        public List<Order> GetActiveOrder()
        {
            List<Order> list = OrderReaderForQuerry("select * from bestilling where maa_leveres_foer >= NOW() AND kan_hentes <= NOW();");
            return list;
        }

        public List<Order> GetLatestOrderId()
        {
            List<Order> list = OrderReaderForQuerry("SELECT * FROM bestilling ORDER BY bestilling_id  DESC LIMIT 0, 1");
            return list;
        }
        public List<Order> GetOrderById(int id)
        {
            List<Order> list = OrderReaderForQuerry("select * from bestilling where bestilling_id =" + id.ToString() + ";");
            return list;
        }
        public List<Order> GetOrdersForEmployee(int id)
        {
            List<Order> list = OrderReaderForQuerry("select * from bestilling where ansatt_ansatt_id =" + id.ToString() + ";");
            return list;
        }
        public List<int> getOrderByUserId(OrderByUser order)
        {
            List<int> list = new List<int>();
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select bestilling.bestilling_id from bestilling inner join kunde on kunde.kunde_id = bestilling.kunde_kunde_id where kunde_id=@id;";
                cmd.Parameters.AddWithValue("@id", order.Id);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(

                            Convert.ToInt32(reader[0])
                        );
                    }
                }
                conn.Close();
            }
            return list;
        }

        public void postOrder(Order Order)
        {
            AddOrderParamtersForQuerry(
                "insert into bestilling(bestilling_id, pris, gruppe,kunde_kunde_id,ansatt_ansatt_id,bestillingsdato,kan_hentes,maa_leveres_foer) values(@Order.Order_id, @Order.Price, @Order.IsGroupOrder,@Order.Customer_id,@Order.Employee_id,@Order.OrderDate,@Order.IsAvailableFrom,@Order.MustBeDeliveredBefore);",
                Order
            );
        }


        public void UpdateOrder(int id, Order Order)
        {
            AddOrderParamtersForQuerry(
                "update bestilling set pris=@Order.Price, gruppe=@Order.IsGroupOrder, kunde_kunde_id=@Order.Customer_id,ansatt_ansatt_id=@Order.Employee_id,bestillingsdato=@Order.OrderDate,kan_hentes=@Order.IsAvailableFrom,maa_leveres_foer=@Order.MustBeDeliveredBefore where bestilling_id=" + id.ToString() + ";",
                Order
            );
        }

        public void deleteOrder(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from bestilling where bestilling_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

    }
}