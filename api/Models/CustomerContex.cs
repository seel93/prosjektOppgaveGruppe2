using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class CustomerContext
    {
        
        public string ConnectionString {get; set;}

        public CustomerContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<Customer> GetCustomer()
        {
            List<Customer> list = new List<Customer>();

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand();
                var command = "select * from Kunde;";
                cmd = new MySqlCommand(command, conn);
                //cmd.ExecuteNonQuery();
                
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Customer
                        {
                            Customer_id = Convert.ToInt32(reader["kunde_id"]),
                            FirstName = reader["fnavn"].ToString(),
                            LastName = reader["enavn"].ToString(),
                            Phone = reader["mob_nr"].ToString(),
                            Email = reader["e-post"].ToString(),
                            Location = Convert.ToInt32(reader["steder_sted_id"])
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }

        public void postCustomer(Customer Customer)
        {
            if (Customer == null)
            {
                throw new ArgumentNullException(nameof(Customer));
            }

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "insert into Kunde(kunde_id, fnavn, enavn,mob_nr,e-post,steder_sted_id) values(@Customer.Customer_id, @Customer.FirstName, @Customer.LastName,@Customer.Phone,@Customer.Email,@Customer.Location);";
                cmd.Parameters.AddWithValue("@Customer.Customer_id", Customer.Customer_id);
                cmd.Parameters.AddWithValue("@Customer.FirstName", Customer.FirstName);
                cmd.Parameters.AddWithValue("@Customer.LastName", Customer.LastName);
                cmd.Parameters.AddWithValue("@Customer.Phone", Customer.Phone);
                cmd.Parameters.AddWithValue("@Customer.Email", Customer.Email);
                cmd.Parameters.AddWithValue("@Customer.Location", Customer.Location);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<Customer> GetCustomer(int id)
        {
            List<Customer> list = new List<Customer>();
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Kunde where kunde_id = @id;";
                 cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Customer
                        {
                            Customer_id = Convert.ToInt32(reader["kunde_id"]),
                            FirstName = reader["fnavn"].ToString(),
                            LastName = reader["enavn"].ToString(),
                            LastName = reader["mob_nr"].ToString(),
                            FirstName = reader["e-post"].ToString(),
                            Customer_id = Convert.ToInt32(reader["steder_sted_id"])
                        });
                    }
                }
                 conn.Close();
            }
            return list;
        }

        public void deleteCustomer(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from Kunde where kunde_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void UpdateCustomer(int id, Customer Customer)
        {
             using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update Customer set fnavn=@Customer.FirstName, enavn=@Customer.LastName, mob_nr=@Customer.Phone, e-post=@Customer.Email,steder_sted_id=@Customer.Location where kunde_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@Customer.FirstName", Customer.FirstName);
                cmd.Parameters.AddWithValue("@Customer.LastName", Customer.LastName);
                cmd.Parameters.AddWithValue("@Customer.Phone", Customer.Phone);
                cmd.Parameters.AddWithValue("@Customer.Email", Customer.Email);
                cmd.Parameters.AddWithValue("@Customer.Location", Customer.Location);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

       
    }    
}