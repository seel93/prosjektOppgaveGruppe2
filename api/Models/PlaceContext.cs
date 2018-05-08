using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class PlaceContext
    {
        
        public string ConnectionString {get; set;}

        public PlaceContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<Place> PlaceReader(string command)
        {
            List<Place> list = new List<Place>();

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd;
                cmd = new MySqlCommand(command, conn);
                
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Place
                        {
                            Place_id = Convert.ToInt32(reader["sted_id"]),
                            Name = reader["stedsnavn"].ToString(),
                            PostalCode = Convert.ToInt32(reader["poststed_postnr"])
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }

        public List<Place> GetPlace()
        {
            List<Place> list = PlaceReader("select * from steder;");
            return list;
        }

        public List<Place> GetPlaceById(int id)
        {
            List<Place> list = PlaceReader("select * from steder where sted_id =" + id.ToString() + ";");
            return list;
        }
        public void postPlace(Place Place)
        {
            if (Place == null)
            {
                throw new ArgumentNullException(nameof(Place));
            }

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "insert into steder(sted_id, stedsnavn, poststed_postnr) values(@Place.Place_id, @Place.Name, @Place.PostalCode);";
                cmd.Parameters.AddWithValue("@Place.Place_id", Place.Place_id);
                cmd.Parameters.AddWithValue("@Place.Name", Place.Name);
                cmd.Parameters.AddWithValue("@Place.PostalCode", Place.PostalCode);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }


        public void deletePlace(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from steder where sted_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void UpdatePlace(int id, Place Place)
        {
             using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update steder set stedsnavn=@Place.Name, poststed_postnr=@Place.PostalCode where sted_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@Place.Name", Place.Name);
                cmd.Parameters.AddWithValue("@Place.PostalCode", Place.PostalCode);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        
    }    
}