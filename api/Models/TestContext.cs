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
            GetTest();
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<Test> GetTest()
        {
            List<Test> list = new List<Test>();

            using(MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from Test", conn);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Test()
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Email = reader["Email"].ToString(),
                            Phone = Convert.ToInt32(reader["Phone"]),
                        });
                    }
                }
            }
            return list;
        }
    }    
}