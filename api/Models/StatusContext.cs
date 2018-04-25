using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class StatusContext
    {
        
        public string ConnectionString {get; set;}

        public StatusContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<Status> GetStatus()
        {
            List<Status> list = new List<Status>();

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd;
                var command = "select * from status;";
                cmd = new MySqlCommand(command, conn);
                //cmd.ExecuteNonQuery();
                
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Status
                        {
                            Status_id = Convert.ToInt32(reader["idstatus"]),
                            Current_Status = reader["status"].ToString()
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }

        public void postStatus(Status Status)
        {
            if (Status == null)
            {
                throw new ArgumentNullException(nameof(Status));
            }

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "insert into status(idstatus, status) values(@Status.Status_id,@Status.Status);";
                cmd.Parameters.AddWithValue("@Status.Status_id", Status.Status_id);
                cmd.Parameters.AddWithValue("@Status.Status", Status.Current_Status);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<Status> GetStatus(int id)
        {
            List<Status> list = new List<Status>();
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from status where idstatus = @id;";
                 cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Status
                        {
                            Status_id = Convert.ToInt32(reader["idstatus"]),
                            Current_Status = reader["status"].ToString()
                        });
                    }
                }
                 conn.Close();
            }
            return list;
        }

        public void deleteStatus(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from status where idstatus=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void UpdateStatus(int id, Status Status)
        {
             using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update status set status=@Status.Status where idstatus=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@Status.Status", Status.Current_Status);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        
    }    
}