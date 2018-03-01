using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class TestContext
    {
        public string ConnectionString {get; set;}

        public TestContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<Test> GetTest()
        {
            List<Test> list = new List<Test>();

            using(MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;Database=testDb;user=root;password=password123;SslMode=none"))
            //server=localhost;
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand();
                var command = "select * from Test;";
                cmd = new MySqlCommand(command, conn);
                //cmd.ExecuteNonQuery();
                
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Test
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Email = reader["Email"].ToString(),
                            Phone = Convert.ToInt32(reader["Phone"]),
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }
    }    
}