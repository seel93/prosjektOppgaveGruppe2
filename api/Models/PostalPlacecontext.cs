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

        private List<PostalPlace> PostalPlaceReaderForQuerry(string command)
        {
            List<PostalPlace> list = new List<PostalPlace>();

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd;
                cmd = new MySqlCommand(command, conn);
                
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

        private void AddPostalPlaceForQuerry(string command, PostalPlace PostalPlace)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = command;
                cmd.Parameters.AddWithValue("@PostalPlace.PostalPlace", PostalPlace.PostPlace);
                cmd.Parameters.AddWithValue("@PostalPlace.PostalNumber", PostalPlace.PostalNumber);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<PostalPlace> GetPostalPlace()
        {
            List<PostalPlace> list = PostalPlaceReaderForQuerry("select * from poststed;");
            return list;
        }

        public List<PostalPlace> GetPostalPlace(int id)
        {
            List<PostalPlace> list = PostalPlaceReaderForQuerry("select * from poststed where postnr =" + id.ToString() + ";");
            return list;
        }
        public void postPostalPlace(PostalPlace PostalPlace)
        {
            AddPostalPlaceForQuerry(
                "insert into poststed(poststed, postnr) values(@PostalPlace.PostalPlace, @PostalPlace.PostalNumber);",
                PostalPlace
            );
        }
        public void UpdatePostalPlace(int id, PostalPlace PostalPlace)
        {
            AddPostalPlaceForQuerry(
                "update poststed set poststed=@PostalPlace.PostalPlace where postnr=" + id.ToString() + ";",
                PostalPlace
            );
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


        
    }    
}