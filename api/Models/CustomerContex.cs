using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace api.Models
{
    public class CustomerContext
    {

        public string ConnectionString { get; set; }

        public CustomerContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        private List<Customer> CustomerReaderForQuerry(string command)
        {
            List<Customer> list = new List<Customer>();
            try
            {

                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand();
                    cmd = new MySqlCommand(command, conn);
                    //cmd.ExecuteNonQuery();

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Customer
                            {
                                Customer_id = Convert.ToInt32(reader["kunde_id"]),
                                FirstName = reader["fnavn"].ToString(),
                                LastName = reader["enavn"].ToString(),
                                Phone = reader["mob_nr"].ToString(),
                                Email = reader["epost"].ToString(),
                                Location = Convert.ToInt32(reader["steder_sted_id"]),
                                Password = reader["kunde_password"].ToString()
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

        private void AddCustomerParamtersForQuerry(string command, Customer Customer)
        {
            try
            {

                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = command;
                    cmd.Parameters.AddWithValue("@Customer.Customer_id", Customer.Customer_id);
                    cmd.Parameters.AddWithValue("@Customer.FirstName", Customer.FirstName);
                    cmd.Parameters.AddWithValue("@Customer.LastName", Customer.LastName);
                    cmd.Parameters.AddWithValue("@Customer.Phone", Customer.Phone);
                    cmd.Parameters.AddWithValue("@Customer.Email", Customer.Email);
                    cmd.Parameters.AddWithValue("@Customer.Password", Customer.Password);
                    cmd.Parameters.AddWithValue("@Customer.Location", Customer.Location);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (MySqlException e)
            {
                throw e;
            }
        }

        public List<Customer> GetCustomer()
        {
            List<Customer> list = CustomerReaderForQuerry("select * from kunde;");
            return list;
        }

        public List<Customer> GetCustomerById(int id)
        {
            List<Customer> list = CustomerReaderForQuerry("select * from kunde where kunde_id =" + id.ToString() + ";");
            return list;
        }
        public void postCustomer(Customer Customer)
        {
            AddCustomerParamtersForQuerry(
                "insert into kunde(kunde_id, fnavn, enavn,mob_nr,epost, kunde_password, steder_sted_id) values(@Customer.Customer_id, @Customer.FirstName, @Customer.LastName,@Customer.Phone,@Customer.Email, @Customer.Password, @Customer.Location);",
                Customer
            );
        }

        public void UpdateCustomer(int id, Customer Customer)
        {
            AddCustomerParamtersForQuerry(
                "update kunde set fnavn=@Customer.FirstName, enavn=@Customer.LastName, mob_nr=@Customer.Phone, epost=@Customer.Email, kunde_password=@Customer.password,steder_sted_id=@Customer.Location where kunde_id=" + id.ToString() + ";",
                Customer
            );
        }

        public void deleteCustomer(int id)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "delete from kunde where kunde_id=@id";
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