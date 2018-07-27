using LegenDiary.Models.ListWidgets;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Runtime.Serialization;
using System.Text;

namespace LegenDiary.Models
{
    [DataContract]
    public partial class Widget
    {
        [DataMember]
        public int WidgetId { get; set; }
        public DateTimeOffset? WidgetDate { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Subtitle { get; set; }
        [DataMember]
        public bool? IsFavourite { get; set; }
        [DataMember]
        public string WidgetData { get; set; }
        [DataMember]
        public int WidgetTypeId { get; set; }
        [DataMember]
        public int AppuserId { get; set; }
        [DataMember]
        public int Width { get; set; }
        [DataMember]
        public int Height { get; set; }
        [DataMember]
        public int X { get; set; }
        [DataMember]
        public int Y { get; set; }


        public Appuser Appuser { get; set; }

        /// <summary>
        /// Création du widget
        /// </summary>
        /// <param name="config"></param>
        /// <returns></returns>
        public Response Save(IConfiguration config)
        {
            bool success = false;
            string message = string.Empty;

            // Création de l'image physique
            if (this.WidgetTypeId == WidgetType.Image.GetHashCode())
            {
                if (!UploadImage())
                    return new Response(false, "Image non créée");
            }
            else if (this.WidgetTypeId == WidgetType.List.GetHashCode())
            {
                
            }

                // Tailles par défaut
                if (Width == 0)
                Width = 1;
            if (Height == 0)
                Height = 1;
            // TODO: Calculer les nouvelles positions X et Y

            using (SqlConnection cn = new SqlConnection(config.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;

                    if (this.WidgetId > 0)
                        cmd.CommandText = @"UPDATE [WIDGET] SET WIDGET_DATE = @WIDGET_DATE, TITLE = @TITLE, SUBTITLE = @SUBTITLE, WIDGET_DATA = @WIDGET_DATA, WIDGET_TYPE_ID = @WIDGET_TYPE_ID, WIDTH = @WIDTH, HEIGHT = @HEIGHT
                            , X = @X, Y = @Y
                            WHERE WIDGET_ID = @WIDGET_ID";
                    else
                        cmd.CommandText = @"INSERT INTO [WIDGET] (WIDGET_DATE, [TITLE], [SUBTITLE], [WIDGET_DATA], [WIDGET_TYPE_ID], [APPUSER_ID], WIDTH, HEIGHT, X, Y) 
                                        VALUES (@WIDGET_DATE, @TITLE, @SUBTITLE, @WIDGET_DATA, @WIDGET_TYPE_ID, @APPUSER_ID, 1, 1, 
                                        (SELECT ISNULL((SELECT MAX(X) + 1 FROM [WIDGET]), 0)), (SELECT ISNULL((SELECT MAX(Y) + 1 FROM [WIDGET]), 0))) ";

                    cmd.Parameters.Add("@TITLE", System.Data.SqlDbType.NVarChar).Value = this.Title;
                    cmd.Parameters.Add("@SUBTITLE", System.Data.SqlDbType.NVarChar).Value = this.Subtitle;
                    cmd.Parameters.Add("@WIDGET_DATA", System.Data.SqlDbType.NVarChar).Value = this.WidgetData;
                    cmd.Parameters.Add("@WIDGET_TYPE_ID", System.Data.SqlDbType.Int).Value = this.WidgetTypeId;
                    cmd.Parameters.Add("@APPUSER_ID", System.Data.SqlDbType.Int).Value = this.AppuserId;
                    cmd.Parameters.Add("@WIDGET_DATE", System.Data.SqlDbType.NVarChar).Value = DateTime.Now;
                    cmd.Parameters.Add("@WIDTH", System.Data.SqlDbType.Int).Value = this.Width;
                    cmd.Parameters.Add("@HEIGHT", System.Data.SqlDbType.Int).Value = this.Height;
                    cmd.Parameters.Add("@X", System.Data.SqlDbType.Int).Value = this.X;
                    cmd.Parameters.Add("@Y", System.Data.SqlDbType.Int).Value = this.Y;
                    cmd.Parameters.Add("@WIDGET_ID", System.Data.SqlDbType.Int).Value = this.WidgetId;

                    if (cmd.ExecuteNonQuery() > 0)
                    {
                        success = true;
                        message = "Le widget a bien été créé";
                    }

                    else
                        message = "Le widget n'a pas pu être créé, recommence plus tard";

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

        /// <summary>
        /// Sauvegarde de l'image physique
        /// </summary>
        /// <returns></returns>
        private bool UploadImage()
        {
            bool uploadOK = false;
            if (!String.IsNullOrEmpty(this.WidgetData))
            {
                Byte[] byteData = Convert.FromBase64String(this.WidgetData.Split(',')[1]);

                var ts = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                string filename = $"imageWidget_{ts}.jpg";
                this.WidgetData = filename;

                FileStream file = new FileStream($"wwwroot/images/{filename}", FileMode.Create);
                file.Write(byteData, 0, byteData.Length);
                file.Close();
                file.Dispose();

                return true;
            }
            return uploadOK;
        }

        /// <summary>
        /// Suppression du widget
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="id"></param>
        internal static Response Delete(IConfiguration configuration, int id)
        {
            bool success = false;
            string message = string.Empty;

            using (SqlConnection cn = new SqlConnection(configuration.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandText = @"DELETE FROM WIDGET WHERE WIDGET_ID = @id";
                    cmd.Parameters.Add("@id", System.Data.SqlDbType.Int).Value = id;

                    int result = cmd.ExecuteNonQuery();

                    success = true;

                }
                catch (Exception e)
                {
                    // TODO : écrire des logs
                    message = "Une erreur est survenue lors de la suppression du widget, ré-essaie plus tard.";
                }
                finally
                {
                    cn.Close();
                }
            }
            return new Response(success, message);
        }

        /// <summary>
        /// Récupération des widgets de l'utilisateur
        /// </summary>
        /// <param name="config"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static WidgetsResponse GetUserWidgets(IConfiguration config, int userId, string date)
        {
            bool success = false;
            string message = string.Empty;

            List<Widget> widgetsList = new List<Widget>();
            Widget widget;

            using (SqlConnection cn = new SqlConnection(config.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandText = @"SELECT WIDGET_DATE, [TITLE], [SUBTITLE], [WIDGET_DATA], [WIDGET_TYPE_ID], [WIDGET_ID], ISNULL(WIDTH, 1), ISNULL(HEIGHT, 1), ISNULL(X, 0), ISNULL(Y, 0) 
                    FROM WIDGET WHERE AppUser_Id = @userId AND CAST(WIDGET_DATE AS DATE) = @date";
                    cmd.Parameters.Add("@userId", System.Data.SqlDbType.Int).Value = userId;
                    cmd.Parameters.Add(new SqlParameter("@date", date));

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int wid = reader.GetInt32(5);
                        widget = new Widget()
                        {
                            WidgetDate = reader.GetDateTimeOffset(0),
                            Title = reader.GetString(1),
                            Subtitle = reader.GetString(2),
                            WidgetData = reader.GetString(3),
                            WidgetTypeId = reader.GetInt32(4),
                            WidgetId = wid,
                                Width = reader.GetInt32(6),
                                Height = reader.GetInt32(7),
                                X = reader.GetInt32(8),
                                Y = reader.GetInt32(9)
                          
                        };
                        widgetsList.Add(widget);
                    }

                    success = true;

              }
                finally
                {
                    cn.Close();
                }
            }
            return new WidgetsResponse(success, message) { WidgetsList = widgetsList };

        }

        /// <summary>
        /// Enregistrement des positions dans le layout des widgets
        /// </summary>
        /// <param name="config"></param>
        /// <param name="layout"></param>
        /// <returns></returns>
        public static Response SaveLayout(IConfiguration config, WidgetPosition[] positions)
        {
            bool success = false;
            string message = string.Empty;
            SqlCommand cmd;
            //WidgetPosition[] positions = layout.Positions;
            WidgetPosition position;

            if (positions == null || positions.Length == 0)
            {
                message = "Aucun layout à modifier";
                return new Response(success, message);
            }

            // Création des requêtes
            StringBuilder sbQuery = new StringBuilder();
            for (int i = 0; i < positions.Length; i++)
            {
                position = positions[i];
                sbQuery.AppendLine($"UPDATE [WIDGET] SET WIDTH = {position.Width}, HEIGHT = {position.Height}, X = {position.X}, Y = {position.Y} WHERE WIDGET_ID = {position.WidgetId};");
            }

            using (SqlConnection cn = new SqlConnection(config.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandText = sbQuery.ToString();

                    int result = cmd.ExecuteNonQuery();

                    success = true;

                    cmd.Dispose();

                }
                catch (Exception e)
                {
                    // TODO : écrire des logs
                    message = "Une erreur est survenue lors de la suppression du widget, ré-essaie plus tard.";
                }
                finally
                {
                    cn.Close();
                }
            }
            return new Response(success, message);
        }
        
        /// <summary>
        /// Récupération des items d'un widget de type liste
        /// </summary>
        /// <param name="config"></param>
        /// <param name="widgetId"></param>
        /// <returns></returns>
        public static ListItemsResponse GetListWidgetItems(IConfiguration config, int widgetId)
        {
            bool success = false;
            string message = string.Empty;

            List<ListItem> itemsList = new List<ListItem>();
            ListItem item;

            using (SqlConnection cn = new SqlConnection(config.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandText = @"SELECT LISTITEM_ID, LABEL, ITEM_ORDER, NOTE, DONE FROM [LISTITEM] WHERE WIDGET_ID = @wid";
                    cmd.Parameters.Add("@wid", System.Data.SqlDbType.Int).Value = widgetId;

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        //int wid = reader.GetInt32(5);
                        item = new ListItem()
                        {
                            ListItemId = reader.GetInt32(0),
                            Label = reader.GetString(1),
                            Order = reader.GetInt32(2),
                            Note = reader.GetByte(3),
                            Done = reader.GetBoolean(4)

                        };
                        itemsList.Add(item);
                    }

                    success = true;

                }
                catch (Exception e)
                {
                    // TODO : écrire des logs
                    //message = "Une erreur est survenue lors de la récupération des widgets, ré-essaie plus tard.";
                    message = String.Concat(e.Message, Environment.NewLine, e.StackTrace);
                }
                finally
                {
                    cn.Close();
                }
            }
            return new ListItemsResponse(success, message) { Items = itemsList };
        }
    }
}
