using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class CredContext
    {
        public string ConnectionString {get; set;}

        public CredContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
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
                            //IsEmployee = read["employee"]
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