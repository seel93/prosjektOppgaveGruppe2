using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using api.Models;

namespace api
{
    public class EmployeeContext
    {

        public string ConnectionString { get; set; }

        public EmployeeContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        private List<Employee> EmployeeReaderForQuerry(string command)
        {
            List<Employee> list = new List<Employee>();
            try
            {

                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand();
                    cmd = new MySqlCommand(command, conn);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Employee
                            {
                                Employee_id = Convert.ToInt32(reader["ansatt_id"]),
                                Position = reader["Jobb"].ToString(),
                                IsFulltime = Convert.ToInt32(reader["fulltid"]),
                                Salary = Convert.ToInt32(reader["loenn"]),
                                Location = Convert.ToInt32(reader["steder_sted_id"]),
                                Password = reader["ansatt_password"].ToString()
                            });
                        }
                    }
                    conn.Close();
                }
            }
            catch (MySqlException e)
            {
                throw e;
            }
            return list;
        }

        private void AddEmployeeParametersForQuerry(string command, Employee Employee)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = command;
                    cmd.Parameters.AddWithValue("@Employee.Employee_id", Employee.Employee_id);
                    cmd.Parameters.AddWithValue("@Employee.Position", Employee.Position);
                    cmd.Parameters.AddWithValue("@Employee.IsFulltime", Employee.IsFulltime);
                    cmd.Parameters.AddWithValue("@Employee.Salary", Employee.Salary);
                    cmd.Parameters.AddWithValue("@Employee.Location", Employee.Location);
                    cmd.Parameters.AddWithValue("@Employee.Password", Employee.Password);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (MySqlException e)
            {
                throw e;
            }
        }

        public List<Employee> GetEmployee()
        {
            List<Employee> list = EmployeeReaderForQuerry("select * from ansatt;");
            return list;
        }

        public List<Employee> GetEmployeeById(int id)
        {
            List<Employee> list = EmployeeReaderForQuerry("select * from ansatt where ansatt_id =" + id.ToString() + ";");
            return list;
        }
        public void postEmployee(Employee Employee)
        {
            AddEmployeeParametersForQuerry(
                "insert into ansatt(ansatt_id, Jobb, fulltid,loenn,ansatt_password,steder_sted_id) values(@Employee.Employee_id, @Employee.Position, @Employee.IsFulltime,@Employee.Salary,@Employee.Password,@Employee.Location);",
                Employee
            );
        }

        public void UpdateEmployee(int id, Employee Employee)
        {
            AddEmployeeParametersForQuerry(
                "update ansatt set Jobb=@Employee.Position, fulltid=@Employee.IsFulltime, loenn=@Employee.Salary, ansatt_password=@Employee.Password ,steder_sted_id=@Employee.Location  where ansatt_id=" + id.ToString() + ";",
                Employee
            );
        }

        public void deleteEmployee(int id)
        {
            try
            {

                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "delete from ansatt where ansatt_id=@id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (MySqlException e)
            {
                throw e;
            }
        }

    }
}