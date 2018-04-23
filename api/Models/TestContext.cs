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

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
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

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
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

        public List<Test> GetTest(int id)
        {
            List<Test> list = new List<Test>();
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Test where id = @id;";
                 cmd.Parameters.AddWithValue("@id", id);
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

        public void deleteTest(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from Test where id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void UpdateTest(int id, Test test)
        {
             using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update Test set name=@test.Name, email=@test.Email, Phone=@test.phone where id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@test.Name", test.Name);
                cmd.Parameters.AddWithValue("@test.Email", test.Email);
                cmd.Parameters.AddWithValue("@test.Phone", test.Phone);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public Boolean Authenticate(Creds cred)
        {
            List<Creds> UserList = new List<Creds>();
              using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Users where username=@cred.Username union select * from Users where  password=@cred.Password";
                cmd.Parameters.AddWithValue("@cred.Username", cred.Username);
                cmd.Parameters.AddWithValue("@cred.Password", cred.Password);

                using(var read = cmd.ExecuteReader())
                {
                    while(read.Read())
                    {
                        UserList.Add(new Creds
                        {
                            Username = read["Username"].ToString(),
                            Password = read["Password"].ToString(),
                        });
                    }
                }
                conn.Close();
                if(UserList.Count > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }    
}