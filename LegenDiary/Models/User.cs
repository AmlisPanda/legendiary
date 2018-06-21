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

                    if (UserExists(cn))
                        return new Response(false, "Un utilisateur avec cette adresse mail existe déjà.");

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandText = @"INSERT INTO [APPUSER] (AppUser_Login, Email, Encrypted_Password, Subscription_Date) 
                                        VALUES (@login, @email, @pw, @date)";
                    cmd.Parameters.Add("@login", System.Data.SqlDbType.NVarChar).Value = this.Login;
                    cmd.Parameters.Add("@email", System.Data.SqlDbType.NVarChar).Value = this.Email;
                    cmd.Parameters.Add("@pw", System.Data.SqlDbType.NVarChar).Value = this.EncryptedPassword;

                    this.SubscriptionDate = DateTime.Now;
                    cmd.Parameters.Add("@date", System.Data.SqlDbType.NVarChar).Value = this.SubscriptionDate;

                    if (cmd.ExecuteNonQuery() > 0)
                    {
                        success = true;
                        message = "Ton compte a bien été créé, tu peux maintenant te connecter !";
                    }
                       
                    else
                        message = "Le compte n'a pas été créé, ré-essaie plus tard.";

                }
                catch (Exception e)
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

        private bool UserExists(SqlConnection cn)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cmd.CommandText = @"SELECT COUNT(AppUser_ID) FROM APPUSER WHERE EMAIL LIKE @email";
            cmd.Parameters.Add("@email", System.Data.SqlDbType.NVarChar).Value = this.Email;

            if ((int)cmd.ExecuteScalar() > 0)
            {
                return true;
            }
            else
                return false;

        }

        public LoginResponse Authenticate(IConfiguration config)
        {
            bool success = false;
            string message = string.Empty;
            int userId = 0;
            LoginResponse res = new LoginResponse(success, message);

            using (SqlConnection cn = new SqlConnection(config.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    userId = FindUser(cn);

                    if (userId == 0)
                    {
                        res.Message = "L'adresse mail ou le mot de passe est incorrect.";
                        return res;
                    }

                    res.Success = true;

                }

                catch (Exception e)
                {
                    // TODO : écrire des logs
                    res.Message = "Une erreur est survenue lors de l'enregistrement, ré-essaie plus tard.";
                }
                finally
                {
                    cn.Close();
                }
            }

            res.UserId = userId;

            return res;
        }

        private int FindUser(SqlConnection cn)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cmd.CommandText = @"SELECT AppUser_ID FROM APPUSER WHERE EMAIL LIKE @email AND ENCRYPTED_PASSWORD = @pw";
            cmd.Parameters.Add("@email", System.Data.SqlDbType.NVarChar).Value = this.Email;
            cmd.Parameters.Add("@pw", System.Data.SqlDbType.NVarChar).Value = this.EncryptedPassword;

            int userId = (int)cmd.ExecuteScalar();

            return userId;
        }
    }
}
