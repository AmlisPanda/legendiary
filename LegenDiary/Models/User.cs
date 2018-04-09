using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace LegenDiary.Models
{
    [DataContract]
    public class User
    {
        [DataMember]
        public string Login { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string Password { get; set; }

        public string EncryptedPassword { get; set; }

        public DateTime SubscriptionDate { get; private set; }


        public Response Save(IConfiguration config)
        {
            bool success = false;
            string message = string.Empty;

            using (SqlConnection cn = new SqlConnection(config.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandText = @"INSERT INTO [APPUSER] (AppUserLogin, Email, EncryptedPassword, SubscriptionDate) 
                                        VALUES (@login, @email, @pw, @date)
                                        ";
                    cmd.Parameters.Add("@login", System.Data.SqlDbType.NVarChar).Value = this.Login;
                    cmd.Parameters.Add("@email", System.Data.SqlDbType.NVarChar).Value = this.Email;
                    cmd.Parameters.Add("@pw", System.Data.SqlDbType.NVarChar).Value = this.EncryptedPassword;

                    this.SubscriptionDate = new DateTime();
                    cmd.Parameters.Add("@date", System.Data.SqlDbType.NVarChar).Value = this.SubscriptionDate;

                    if (cmd.ExecuteNonQuery() > 0)
                        success = true;
                    else
                        message = "Le compte n'a pas été créé, ré-essaie plus tard.";

                }
                catch (Exception)
                {
                    // TODO : écrire des logs
                    message = "Une erreur est survenue lors de l'enregistrement, ré-essaie plus tard.";
                }
                finally
                {
                    cn.Close();
                }
            }


            return new Response(success, message);
        }
    }
}
