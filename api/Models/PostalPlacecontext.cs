using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class PostalPlaceContext
    {
        
        public string ConnectionString {get; set;}

        public PostalPlaceContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<PostalPlace> GetPostalPlace()
        {
            List<PostalPlace> list = new List<PostalPlace>();

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd;
                var command = "select * from poststed;";
                cmd = new MySqlCommand(command, conn);
                //cmd.ExecuteNonQuery();
                
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new PostalPlace
                        {
                            PostPlace = reader["poststed"].ToString(),
                            PostalNumber = Convert.ToInt32(reader["postnr"])
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }

        public void postPostalPlace(PostalPlace PostalPlace)
        {
            if (PostalPlace == null)
            {
                throw new ArgumentNullException(nameof(PostalPlace));
            }

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "insert into poststed(poststed, postnr) values(@PostalPlace.PostalPlace, @PostalPlace.PostalNumber);";
                cmd.Parameters.AddWithValue("@PostalPlace.PostalPlace", PostalPlace.PostPlace);
                cmd.Parameters.AddWithValue("@PostalPlace.PostalNumber", PostalPlace.PostalNumber);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<PostalPlace> GetPostalPlace(int id)
        {
            List<PostalPlace> list = new List<PostalPlace>();
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from poststed where postnr = @id;";
                 cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new PostalPlace
                        {
                            PostPlace = reader["poststed"].ToString(),
                            PostalNumber = Convert.ToInt32(reader["postnr"])
                        });
                    }
                }
                 conn.Close();
            }
            return list;
        }

        public void deletePostalPlace(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from poststed where postnr=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void UpdatePostalPlace(int id, PostalPlace PostalPlace)
        {
             using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update poststed set poststed=@PostalPlace.PostalPlace where postnr=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@PostalPlace.PostalPlace", PostalPlace.PostPlace);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        
    }    
}