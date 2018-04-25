using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic; 

namespace api.Models
{
    public class BikeContext
    {
        
        public string ConnectionString {get; set;}

        public BikeContext(string connectionString)
        {
            this.ConnectionString =  connectionString;
        }

        private MySqlConnection GetConnection(){
            return new MySqlConnection(ConnectionString);
        }

        public List<Bike> GetBike()
        {
            List<Bike> list = new List<Bike>();

            using(MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd;
                var command = "select * from Utstyr;";
                cmd = new MySqlCommand(command, conn);
                //cmd.ExecuteNonQuery();
                
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Bike
                        {
                            Bike_id = Convert.ToInt32(reader["utstyr_id"]),
                            Type = reader["Type"].ToString(),
                            DailyPrice = Convert.ToInt32(reader["dagspris"]),
                            HourPrice = Convert.ToInt32(reader["timespris"]),
                            EquipmentCode = reader["utstyrskode"].ToString(),
                            LastSeenOnPlace = Convert.ToInt32(reader["var_sist_paa_sted"]),
                            BelongsToPlace = Convert.ToInt32(reader["tilhoerer_sted"]),
                            WheelSize = reader["hjulstoerrelse"].ToString(),
                            Frame = reader["ramme"].ToString(),
                            STATUS = reader["STATUS"].ToString()
                        });
                    }
                }
                conn.Close();
            }
            return list;
        }

        public void postBike(Bike Bike)
        {
            if (Bike == null)
            {
                throw new ArgumentNullException(nameof(Bike));
            }

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "insert into Utstyr(utstyr_id, Type, dagspris,timepris,utstyrkode,var_sist_paa_sted, tilhoerer_sted, hjulstoerrelse, ramme, status_idstatus) values(@Bike.Bike_id, @Bike.Type, @Bike.DailyPrice, @Bike.HourPrice, @Bike.EquipmentCode, @Bike.LastSeenOnPlace, @Bike.BelongsToPlace, @Bike.WheelSize,@Bike.Frame, @Bike.STATUS);";
                cmd.Parameters.AddWithValue("@Bike.Bike_id", Bike.Bike_id);
                cmd.Parameters.AddWithValue("@Bike.Type", Bike.Type);
                cmd.Parameters.AddWithValue("@Bike.DailyPrice", Bike.DailyPrice);
                cmd.Parameters.AddWithValue("@Bike.HourPrice", Bike.HourPrice);
                cmd.Parameters.AddWithValue("@Bike.EquipmentCode", Bike.EquipmentCode);
                cmd.Parameters.AddWithValue("@Bike.LastSeenOnPlace", Bike.LastSeenOnPlace);
                cmd.Parameters.AddWithValue("@Bike.BelongsToPlace", Bike.BelongsToPlace);
                cmd.Parameters.AddWithValue("@Bike.WheelSize", Bike.WheelSize);
                cmd.Parameters.AddWithValue("@Bike.Frame", Bike.Frame);
                cmd.Parameters.AddWithValue("@Bike.STATUS", Bike.STATUS);
                
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<Bike> GetBike(int id)
        {
            List<Bike> list = new List<Bike>();
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Utstyr where utstyr_id = @id;";
                cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        list.Add(new Bike
                        {
                            Bike_id = Convert.ToInt32(reader["utstyr_id"]),
                            Type = reader["Type"].ToString(),
                            DailyPrice = Convert.ToInt32(reader["dagspris"]),
                            HourPrice = Convert.ToInt32(reader["timespris"]),
                            EquipmentCode = reader["utstyrskode"].ToString(),
                            LastSeenOnPlace = Convert.ToInt32(reader["var_sist_paa_sted"]),
                            BelongsToPlace = Convert.ToInt32(reader["tilhoerer_sted"]),
                            WheelSize = reader["hjulstoerrelse"].ToString(),
                            Frame = reader["ramme"].ToString(),
                            STATUS = reader["STATUS"].ToString()
                        });
                    }
                }
                 conn.Close();
            }
            return list;
        }

        public void deleteBike(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete from Utstyr where utstyr_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }
        
        public void UpdateBike(int id, Bike Bike)
        {
             using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update Utstyr set Type=@Bike.Type, dagspris=@Bike.DailyPrice, timepris=@Bike.HourPrice, utstyrskode=@Bike.EquipmentCode,var_sist_paa_sted=@Bike.LastSeenOnPlace, tilhoerer_sted=@Bike.BelongsToPlace, hjulstoerrelse=@Bike.WheelSize, ramme=@Bike.Frame, status_idstatus=@Bike.STATUS where utstyr_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@Bike.Type", Bike.Type);
                cmd.Parameters.AddWithValue("@Bike.DailyPrice", Bike.DailyPrice);
                cmd.Parameters.AddWithValue("@Bike.HourPrice", Bike.HourPrice);
                cmd.Parameters.AddWithValue("@Bike.EquipmentCode", Bike.EquipmentCode);
                cmd.Parameters.AddWithValue("@Bike.LastSeenOnPlace", Bike.LastSeenOnPlace);
                cmd.Parameters.AddWithValue("@Bike.BelongsToPlace", Bike.BelongsToPlace);
                cmd.Parameters.AddWithValue("@Bike.WheelSize", Bike.WheelSize);
                cmd.Parameters.AddWithValue("@Bike.Frame", Bike.Frame);
                cmd.Parameters.AddWithValue("@Bike.STATUS", Bike.STATUS);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }


//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//


        public void UpdateBikeStatus(int id, string STATUS)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "update Utstyr set status_idstatus=@Bike.STATUS where utstyr_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@Bike.STATUS", STATUS);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public string GetBikeStatus(int id)
        {
            string result="";

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select status from Utstyr left join status ON utstyr.status_idstatus=idstatus where utstyr_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        result = reader["status"].ToString();
                    }
                }
                conn.Close();
            }
            return result;
        }


        public int GetBikeOriginalLocation(int id)
        {
            int result = -1;

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select tilhoerer_sted from Utstyr where utstyr_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        result = Convert.ToInt32(reader["tilhoerer_sted"]);
                    }
                }
                conn.Close();
            }
            return result;
        }

        public int GetBikeLastSeenLocation(int id)
        {
            int result = -1;

            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select var_sist_paa_sted from Utstyr where utstyr_id=@id";
                cmd.Parameters.AddWithValue("@id", id);
                using(var reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        result = Convert.ToInt32(reader["var_sist_paa_sted"]);
                    }
                }
                conn.Close();
            }
            return result;
        }
    }    
}