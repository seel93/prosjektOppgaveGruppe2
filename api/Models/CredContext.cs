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
            if(cred.IsEmployee)
            {
                AuthenticateEmployee(cred);
            }
            else
            {
                List<Creds> UserList = new List<Creds>();
                  using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "select * from kunde where epost=@cred.Username and kunde_password=@cred.Password";
                    cmd.Parameters.AddWithValue("@cred.Username", cred.Username);
                    cmd.Parameters.AddWithValue("@cred.Password", cred.Password);

                    using(var read = cmd.ExecuteReader())
                    {
                        while(read.Read())
                        {
                            UserList.Add(new Creds
                            {
                                Username = read["epost"].ToString(),
                                Password = read["kunde_password"].ToString(),
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
            return false;
        }

        public Boolean AuthenticateEmployee(Creds cred)
        {
            List<Creds> UserList = new List<Creds>();
                  using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "select * from ansatt where ansatt_id=@cred.Username and ansatt_password=@cred.Password";
                    cmd.Parameters.AddWithValue("@cred.Username", Int32.Parse(cred.Username));
                    cmd.Parameters.AddWithValue("@cred.Password", cred.Password);

                    using(var read = cmd.ExecuteReader())
                    {
                        while(read.Read())
                        {
                            UserList.Add(new Creds
                            {
                                Username = read["ansatt_id"].ToString(),
                                Password = read["ansatt_password"].ToString(),
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