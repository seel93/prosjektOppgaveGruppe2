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
            //new MySqlConnection("server=localhost;port=3306;Database=testDb;user=root;password=password123;SslMode=none"))
            //GetConnection()) 
            //server=mysql.stud.iie.ntnu.no;port=3306;Database=stud-svendah;user=stud-svendah;password=hemmelig;SslMode=none"
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

        public void postTest(Test test)
        {
            if (test == null)
            {
                throw new ArgumentNullException(nameof(test));
            }

            using (MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;Database=testDb;user=root;password=password123;SslMode=none"))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "insert into Test(Name, Email, Phone) values(@test.Name, @test.Email, @test.Phone);";
                cmd.Parameters.AddWithValue("@test.Name", test.Name);
                cmd.Parameters.AddWithValue("@test.Email", test.Email);
                cmd.Parameters.AddWithValue("@test.Phone", test.Phone);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }
    }    
}